<script lang="ts" setup>
import { ref, watch } from 'vue'

import { useFirebaseStore } from '@/stores/FirebaseStore'
const firebaseStore = useFirebaseStore()

const email = ref<string>('')
const password = ref<string>('')
const name = ref<string>('')
const loginPage = ref<boolean>(true)
const error = ref<string | null>(null)

watch(
  () => firebaseStore.errorMsg,
  (newError) => {
    error.value = newError
  },
)
</script>

<template>
  <div class="login-view">
    <h1>Julekalender</h1>
    <section id="logged-out-view" v-if="loginPage">
      <h2>For å starte opne kalenderen, vennligst logg inn.</h2>
      <div class="container google">
        <div class="google-login">
          <button
            @click="firebaseStore.signInWithGoogle"
            id="sign-in-with-google"
            class="provider-btn"
          >
            <img src="/src/images/google.png" alt="google icon" /> Logg inn med Google
          </button>
        </div>
      </div>
      <div class="container">
        Eller med Epost
        <form action="" @submit.prevent>
          <input v-model="email" id="email-input" type="email" placeholder="Epost" required />
          <input
            v-model="password"
            type="password"
            id="password-input"
            placeholder="Passord"
            required
          />
          <button
            @click="firebaseStore.signInWithEmail(email, password)"
            @keypress.enter="firebaseStore.signInWithEmail(email, password)"
            id="sign-in-btn"
            class="primary-btn"
          >
            Logg inn
          </button>
          <p class="error-message" v-if="error">{{ error }}</p>
        </form>
        <div>
          <h3>Har du ikke konto? <a @click="loginPage = false">Registrer deg her</a></h3>
        </div>
      </div>
    </section>
    <section id="logged-out-view" v-if="!loginPage">
      <h2>Opprett en konto</h2>
      <div class="container">
        <form action="" @submit.prevent>
          <input v-model="name" id="create-name-input" type="text" placeholder="Navn" required />
          <input
            v-model="email"
            id="create-email-input"
            type="email"
            placeholder="Email"
            required
          />
          <input
            v-model="password"
            type="password"
            id="create-password-input"
            placeholder="Passord"
            min="6"
            required
          />
          <button
            @click="firebaseStore.createAccount(email, password, name)"
            id="create-account-btn"
            class="primary-btn"
          >
            Opprett konto
          </button>
        </form>
        <div>
          <h3>Har du allerede en konto? <a @click="loginPage = true">Logg inn her</a></h3>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.login-view{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: rgb(168, 8, 8);
  color: #ffffff;
}
h1{
  font-size: 4em;
  margin-bottom: 0.5em;
  background: linear-gradient(135deg, #6c61ff 0%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
h2{
  color: white;
}
h3 a{
  color: rgb(62, 243, 219);
}
h3 a:hover{
  text-decoration: underline;
}
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: rgb(116, 7, 7);
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  gap: 10px;
}
input {
  width: 200px;
  padding: 10px;
  margin: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.google-login {
  display: flex;
  
}
.google-login button:hover img {
  transform: scale(1.1);
  cursor: pointer;
}
.google-login button{
  cursor: pointer;
}

a {
  cursor: pointer;
}
img {
  width: 20px;
  height: 20px;
  align-self: center;
}
.google-login button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  padding: 10px;
  border-radius: 4px;
  border: none;
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  gap: 10px;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.error-message {
  color: red;
  font-weight: 600;
}
.primary-btn {
  background-color: rgb(62, 243, 219);
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  color: #000000;
  cursor: pointer;
}
.primary-btn:hover {
  background-color: #00cccc;
}
</style>
