import { defineStore } from 'pinia'
import { ref, computed, type ComputedRef, watch } from 'vue'
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
  getDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  deleteDoc,
  updateDoc,
  setDoc,
  Firestore,
  arrayUnion,
  doc,
} from 'firebase/firestore'

export const useFirebaseStore = defineStore('firebase', () => {
  const db = getFirestore()
  const provider = new GoogleAuthProvider()
  const user = ref<User | null>(null)
  const errorMsg = ref<string | null>(null)
  const alleJulekalendere = ref<Calender[]>([])

  onAuthStateChanged(auth, (u) => {
    if (u) {
      user.value = u
      fetchAllejulekalendere()
    } else {
      user.value = null
      router.push('/')
    }
  })

  const signInWithGoogle = async (): Promise<void> => {
    try {
      await signInWithPopup(auth, provider)
      router.push('/home')
    } catch (error) {
      alert('Error signing in with Google')
      errorMsg.value = (error as Error).message || 'Error signing in with Google'
    }
  }

  const signInWithEmail = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/home')
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
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/home')
    } catch (error) {
      alert((error as Error).message)
    }
  }

  // sign out functions

  const signOutUser = async (): Promise<void> => {
    try {
      //   await setUserOffline(auth.currentUser!)
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }
  // set user status to offline

  //   const setUserOffline = async (user: User): Promise<void> => {
  //     await updateDoc(doc(db, 'usersStatus', user.uid), {
  //       online: false,
  //     })
  //   }

  //   const fetchInRealTimeAndRenderCalendarFromDB = async (): Promise<void> => {
  //     const postsRef = collection(db, "messages");

  //     const q = query(postsRef, where("createdAt", "!=", null), orderBy("createdAt", "asc"));

  //     onSnapshot(q, (snapshot) => {
  //       messages.value = [];
  //       snapshot.forEach((doc) => {
  //         messages.value.push({
  //           id: doc.id,
  //           user: doc.data().uid,
  //           displayName: doc.data().displayName,
  //           text: doc.data().messageBody,
  //           createdAt: doc.data().createdAt,
  //           profilePicture: doc.data().profilePicture,
  //         });
  //       });
  //     });
  //   };

  const createjulekalender = async (user: User): Promise<string> => {
    const gameRef = await addDoc(collection(db, 'calenders'), {
      createdBy: { uid: user.uid, displayName: user.displayName },
      calender: seedCalender(),
      calenderStarted: false,
      createdAt: serverTimestamp(),
      uid: user?.uid,
    })
    console.log('Game room created with ID:', gameRef.id)
    return gameRef.id
  }

  const fetchAllejulekalendere = async () => {
    const q = query(
      collection(db, 'calenders'),
      where('createdBy.uid', '==', user.value?.uid),
      orderBy('createdAt', 'desc'),
    )
    onSnapshot(q, (snapshot) => {
      alleJulekalendere.value = []
      snapshot.forEach((doc) => {
        alleJulekalendere.value.push(doc.data() as Calender)
      })
    })
    // const querySnapshot = await getDocs(q)
    // const calenders: Calender[] = []
    // querySnapshot.forEach((doc) => {
    //   calenders.push(doc.data() as Calender)
    // })
    // alleJulekalendere.value = calenders
  }

  const seedCalender = (): Calender => ({
    day1: { texts: 'Day 1 content', opened: false },
    day2: { texts: 'Day 2 content', opened: false },
    day3: { texts: 'Day 3 content', opened: false },
    day4: { texts: 'Day 4 content', opened: false },
    day5: { texts: 'Day 5 content', opened: false },
    day6: { texts: 'Day 6 content', opened: false },
    day7: { texts: 'Day 7 content', opened: false },
    day8: { texts: 'Day 8 content', opened: false },
    day9: { texts: 'Day 9 content', opened: false },
    day10: { texts: 'Day 10 content', opened: false },
    day11: { texts: 'Day 11 content', opened: false },
    day12: { texts: 'Day 12 content', opened: false },
    day13: { texts: 'Day 13 content', opened: false },
    day14: { texts: 'Day 14 content', opened: false },
    day15: { texts: 'Day 15 content', opened: false },
    day16: { texts: 'Day 16 content', opened: false },
    day17: { texts: 'Day 17 content', opened: false },
    day18: { texts: 'Day 18 content', opened: false },
    day19: { texts: 'Day 19 content', opened: false },
    day20: { texts: 'Day 20 content', opened: false },
    day21: { texts: 'Day 21 content', opened: false },
    day22: { texts: 'Day 22 content', opened: false },
    day23: { texts: 'Day 23 content', opened: false },
    day24: { texts: 'Day 24 content', opened: false },
  })
  const julekalender = ref<Calender>(seedCalender())

  //   const emptyCalender = (): Calender => ({
  //     day1: { texts: '', opened: false },
  //     day2: null,
  //     day3: null,
  //     day4: null,
  //     day5: null,
  //     day6: null,
  //     day7: null,
  //     day8: null,
  //     day9: null,
  //     day10: null,
  //     day11: null,
  //     day12: null,
  //     day13: null,
  //     day14: null,
  //     day15: null,
  //     day16: null,
  //     day17: null,
  //     day18: null,
  //     day19: null,
  //     day20: null,
  //     day21: null,
  //     day22: null,
  //     day23: null,
  //     day24: null,
  //   })

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

  type CalenderDay = {
    texts: string
    opened: boolean
    openable?: boolean
    image?: string
    video?: string
  }

  return {
    user,
    errorMsg,
    signInWithGoogle,
    signInWithEmail,
    createAccount,
    signOutUser,
    createjulekalender,
    alleJulekalendere,
    julekalender,
  }
})
