import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAomMQWYZJeADhg3X7JZc4L8A-btsfkFkk',
  authDomain: 'julekaleder.firebaseapp.com',
  projectId: 'julekaleder',
  storageBucket: 'julekaleder.firebasestorage.app',
  messagingSenderId: '244396434572',
  appId: '1:244396434572:web:b942da17dd66a26eaf07a9',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
