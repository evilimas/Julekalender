import { defineStore } from 'pinia'
import { ref, computed, type ComputedRef } from 'vue'
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
} from 'firebase/firestore'

type CalenderDay = {
  day: number
  texts: string
  opened: boolean
  openable?: boolean
  image?: string
  video?: string
}

type Calender = {
  day1: CalenderDay
  day2: CalenderDay
  day3: CalenderDay
  day4: CalenderDay
  day5: CalenderDay
  day6: CalenderDay
  day7: CalenderDay
  day8: CalenderDay
  day9: CalenderDay
  day10: CalenderDay
  day11: CalenderDay
  day12: CalenderDay
  day13: CalenderDay
  day14: CalenderDay
  day15: CalenderDay
  day16: CalenderDay
  day17: CalenderDay
  day18: CalenderDay
  day19: CalenderDay
  day20: CalenderDay
  day21: CalenderDay
  day22: CalenderDay
  day23: CalenderDay
  day24: CalenderDay
}

type CalenderDocument = {
  id: string
  calender: Calender
  createdBy: { uid: string; displayName: string }
  calenderStarted: boolean
  createdAt: Timestamp | null
  uid: string
}

const seedCalender = (): Calender => ({
  day1: { day: 1, texts: 'Day 1 content', opened: false },
  day2: { day: 2, texts: 'Day 2 content', opened: false },
  day3: { day: 3, texts: 'Day 3 content', opened: false },
  day4: { day: 4, texts: 'Day 4 content', opened: false },
  day5: { day: 5, texts: 'Day 5 content', opened: false },
  day6: { day: 6, texts: 'Day 6 content', opened: false },
  day7: { day: 7, texts: 'Day 7 content', opened: false },
  day8: { day: 8, texts: 'Day 8 content', opened: false },
  day9: { day: 9, texts: 'Day 9 content', opened: false },
  day10: { day: 10, texts: 'Day 10 content', opened: false },
  day11: { day: 11, texts: 'Day 11 content', opened: false },
  day12: { day: 12, texts: 'Day 12 content', opened: false },
  day13: { day: 13, texts: 'Day 13 content', opened: false },
  day14: { day: 14, texts: 'Day 14 content', opened: false },
  day15: { day: 15, texts: 'Day 15 content', opened: false },
  day16: { day: 16, texts: 'Day 16 content', opened: false },
  day17: { day: 17, texts: 'Day 17 content', opened: false },
  day18: { day: 18, texts: 'Day 18 content', opened: false },
  day19: { day: 19, texts: 'Day 19 content', opened: false },
  day20: { day: 20, texts: 'Day 20 content', opened: false },
  day21: { day: 21, texts: 'Day 21 content', opened: false },
  day22: { day: 22, texts: 'Day 22 content', opened: false },
  day23: { day: 23, texts: 'Day 23 content', opened: false },
  day24: { day: 24, texts: 'Day 24 content', opened: false },
})

export const useFirebaseStore = defineStore('firebase', () => {
  const db = getFirestore()
  const provider = new GoogleAuthProvider()
  const user = ref<User | null>(null)
  const errorMsg = ref<string | null>(null)
  const julekalender = ref<Calender | null>(null)

  const isAdmin = ref(false)

  const currentDate = Timestamp.fromDate(new Date())

  onAuthStateChanged(auth, async (u) => {
    if (u) {
      user.value = u

      // set getIdTokenResult(true) to force update token
      const idTokenResult = await u.getIdTokenResult(true)
      await fetchMainJulekalender()
      isAdmin.value = idTokenResult.claims.admin === true
    } else {
      user.value = null
      isAdmin.value = false
      await router.push('/')
    }
  })
  //  sign in functions

  const signInWithGoogle = async (): Promise<void> => {
    try {
      await signInWithPopup(auth, provider)
      await router.push('/home')
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
      calender: seedCalender(),
      calenderStarted: false,
      createdAt: serverTimestamp(),
      uid: user?.uid,
    })
    return calendarRef.id
  }

  //  Fetch main julekalender

  const fetchMainJulekalender = async () => {
    const q = query(collection(db, 'calenders'), where('uid', '==', 'IMn8V8npRmOFcRzAeRONMrYmFf92'))
    return onSnapshot(q, (snapshot) => {
      const firstDoc = snapshot.docs[0]
      if (firstDoc) {
        const data = firstDoc.data() as CalenderDocument
        julekalender.value = data.calender
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
  }
})
