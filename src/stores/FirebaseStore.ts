import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import router from '@/router'
import { auth } from '@/services/firebase'
import type { User } from 'firebase/auth'
import {
  onAuthStateChanged,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

import {
  getFirestore,
  Timestamp,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  onSnapshot,
  query,
  where,
  writeBatch,
  orderBy,
  updateDoc,
} from 'firebase/firestore'

export type CalenderDay = {
  day: number
  texts: string
  opened: boolean
  openable: boolean
  image?: string
  video?: string
}

type Calender = Record<string, CalenderDay>

type CalenderDocument = {
  id: string
  calender: Calender
  createdBy: { uid: string; displayName: string }
  calenderStarted: boolean
  createdAt: Timestamp | null
  uid: string
}

type StyleDocument = {
  id: string
  backgroundImage: string
  primaryColor: string
  secondaryColor: string
  textColor: string
  secondaryTextColor: string
  messageColor: string
  createdAt: Timestamp | null
  fontFamily: string
  uid: string
}

const createCalendar = () => {
  const totalDays = 24
  const startIndex = 0
  const calendar: Calender = {}

  for (let i = startIndex; i < totalDays; i++) {
    calendar[i] = {
      day: i,
      texts: `Day ${i} content`,
      opened: false,
      openable: false,
    }
  }
  return calendar
}

export const useFirebaseStore = defineStore('firebase', () => {
  const db = getFirestore()
  const provider = new GoogleAuthProvider()
  const user = ref<User | null>(null)
  const errorMsg = ref<string | null>(null)
  const julekalender = ref<Calender | null>(null)
  const isAdmin = ref<boolean>(false)
  const currentDate = Timestamp.fromDate(new Date())

  // styling refs
  const styleDocument = ref<StyleDocument | null>(null)
  // const bgImage = ref<string>('')
  // const primaryColor = ref<string>('')
  // const secondaryColor = ref<string>('')

  onAuthStateChanged(auth, async (u) => {
    if (u) {
      user.value = u
      // set getIdTokenResult(true) to force update token
      const idTokenResult = await u.getIdTokenResult(true)
      isAdmin.value = idTokenResult.claims.admin === true
      await fetchMainJulekalender()
      await updateOpenableStatus(new Date().getDate())
      await fetchStyleDocument()
      // await createStyledocument()
    } else {
      user.value = null
      isAdmin.value = false
      await router.push('/')
    }
  })
  //  sign in functions

  const signInWithGoogle = async (): Promise<void> => {
    try {
      // await createjulekalender(auth.currentUser as User)
      await signInWithPopup(auth, provider)
      await router.push('/home')
      await fetchMainJulekalender()
    } catch (error) {
      alert('Error signing in with Google')
      errorMsg.value = (error as Error).message || 'Error signing in with Google'
    }
  }

  const signInWithEmail = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      await router.push('/home')
      await fetchMainJulekalender()
    } catch (error) {
      errorMsg.value = (error as Error).message || 'Error signing in with email and password'
    }
  }

  //   create user functions

  const createAccount = async (
    email: string,
    password: string,
    displayName: string,
  ): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName })
      }
      await createjulekalender(userCredential.user)
      await signInWithEmailAndPassword(auth, email, password)
      await router.push('/home')
    } catch (error) {
      alert((error as Error).message)
    }
  }

  // sign user out functions

  const signOutUser = async (): Promise<void> => {
    try {
      await signOut(auth)
      await router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  //  Create julekalender for new user

  const createjulekalender = async (user: User): Promise<string> => {
    const calendarRef = await addDoc(collection(db, 'calenders'), {
      createdBy: { uid: user.uid, displayName: user.displayName },
      /*calender: seedCalender(),*/
      calender: createCalendar(),
      calenderStarted: false,
      createdAt: serverTimestamp(),
      uid: user?.uid,
    })
    return calendarRef.id
  }

  //  Fetch main julekalender

  const updateOpenableStatus = async (date: number) => {
    if (!user.value?.uid) return
    const currentDate = new Date()
    const currentDay = currentDate.getDate()
    if (date <= currentDay) {
      try {
        const q = query(
          collection(db, 'calenders'),
          where('uid', '==', 'IMn8V8npRmOFcRzAeRONMrYmFf92'),
        )
        const querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0]!.ref
          await updateDoc(docRef, { openable: true })
        }
      } catch (error) {
        console.error('Error updating openable status:', error)
      }
    }
  }

  const fetchMainJulekalender = async () => {
    const q = query(
      collection(db, 'calenders'),
      where('uid', '==', 'IMn8V8npRmOFcRzAeRONMrYmFf92'),
      orderBy('createdAt', 'desc'),
    )
    return onSnapshot(q, (snapshot) => {
      const firstDoc = snapshot.docs[0]
      if (firstDoc) {
        const data = firstDoc.data() as CalenderDocument
        julekalender.value = data.calender

        const days = Object.values(julekalender.value)
        let finalDays: CalenderDay[]
        if (isAdmin.value) {
          finalDays = days.sort((a, b) => a.day - b.day)
        } else {
          finalDays = days
        }

        const cal: Calender = {} as Calender
        finalDays.forEach((day) => {
          const key = `day${day.day}` as keyof Calender
          cal[key] = day
        })
        julekalender.value = cal
      }
    })
  }

  //  Update julekalender for all users

  const updateJulekalender = async (updatedCalender: Calender | null) => {
    if (!user.value?.uid) return
    try {
      const allCalendarsSnapshot = await getDocs(collection(db, 'calenders'))
      const batch = writeBatch(db)
      allCalendarsSnapshot.docs.forEach((userDoc) => {
        batch.update(userDoc.ref, { calender: updatedCalender })
      })
      await batch.commit()
      julekalender.value = updatedCalender
    } catch (error) {
      console.error('Error updating julekalender:', error)
    }
  }

  // update background and colors

  // create style document for admin user

  // const createStyledocument = async (): Promise<string> => {
  //   const styleRef = await addDoc(collection(db, 'styles'), {
  //     backgroundImage: bgImage.value,
  //     primaryColor: primaryColor.value,
  //     secondaryColor: secondaryColor.value,
  //     createdAt: serverTimestamp(),
  //     uid: auth.currentUser?.uid,
  //   })
  //   return styleRef.id
  // }

  // fetch style document

  const fetchStyleDocument = async (): Promise<void> => {
    if (!user.value?.uid) return
    const q = query(collection(db, 'styles'), where('uid', '==',"Go5HejUviHVPo4JfHVLgxB1e45G3"))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      styleDocument.value = { ...(doc?.data() as StyleDocument) }
      await loadGoogleFonts(styleDocument.value.fontFamily);
    }
  }

  // update style

  const updateStyleValue = async (styleOption: string, newValue: string): Promise<void> => {
    const q = query(collection(db, 'styles'), where('uid', '==', user.value?.uid))
    const querySnapshot = await getDocs(q)
    await updateDoc(querySnapshot.docs[0]!.ref, { [styleOption]: newValue })
    await fetchStyleDocument()
  }

  const loadGoogleFonts = async (fonts : string | string[]) => {
    const fontLink = document.createElement('link');
    const fontFamilies = Array.isArray(fonts) ? fonts.join('&family=') : fonts;

    fontLink.href = `https://fonts.googleapis.com/css?family=${fontFamilies}:wght@400&&display=swap`;

    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
  }


  return {
    user,
    errorMsg,
    signInWithGoogle,
    signInWithEmail,
    createAccount,
    signOutUser,
    createjulekalender,
    fetchMainJulekalender,
    julekalender,
    currentDate,
    isAdmin,
    updateJulekalender,
    // styling
    updateStyleValue,
    styleDocument,
    loadGoogleFonts
  }
})
