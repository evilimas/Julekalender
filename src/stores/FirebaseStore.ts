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

  onAuthStateChanged(auth, (u) => {
    if (u) {
      user.value = u
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
      await setUserOffline(auth.currentUser!)
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }
  // set user status to offline

  const setUserOffline = async (user: User): Promise<void> => {
    await updateDoc(doc(db, 'usersStatus', user.uid), {
      online: false,
    })
  }

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

  return {
    user,
    errorMsg,
    signInWithGoogle,
    signInWithEmail,
    createAccount,
    signOutUser,
  }
})
