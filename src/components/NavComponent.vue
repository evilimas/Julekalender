<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { useFirebaseStore } from '@/stores/FirebaseStore'
const firebaseStore = useFirebaseStore()
const router = useRouter()
const route = useRoute()

</script>
<template>
  <nav class="navbar" v-if="route.path == '/home'">
    
    <div class="left-side">
      <button v-if="firebaseStore.isAdmin" @click="router.push('/lagkalender')">Lag Kalender <img src="@/images/calendar.png" alt="calender icon"  class="button-img"/></button>
      <button v-if="firebaseStore.isAdmin" @click="router.push('/styling')">Endre Styling <img src="@/images/pencil.png" alt="color palette icon" class="button-img"></button>
    </div>

    <div class="right-side">
      <img src="@/images/default-avatar.jpeg" alt="User Avatar" />
      <p>{{ firebaseStore.user?.displayName ? firebaseStore.user?.displayName : firebaseStore.user?.email }}</p>
      <button @click="firebaseStore.signOutUser()">Logg ut <img src="@/images/no.png" alt="logout icon" class="button-img"/></button>
    </div>
  </nav>
  <nav
    class="navbar"
    v-else-if="route.path !== '/login' && route.path !== '/register' && route.path !== '/'">
    <button v-if="route.path !== '/kalender/:kalenderId'" @click="router.push('/home')">
      Tilbake <img src="@/images/back.png" alt="tilbake icon" class="button-img"/>
    </button>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  gap: 10px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #222;
  color: #fff;
  padding: 0.8em;
  border-bottom: 2px solid #444;
}
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #222;
  color: #fff;
  padding: 0.8em;
  border-bottom: 2px solid #444;
  z-index: 1000;
}
img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
button{
  cursor: pointer;
  background-color: #444;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border-radius: 4px;
}
button:hover {
  background-color: #666;
}
p {
  margin: 0;
  align-self: center;
}
.left-side {
  display: flex;
  gap: 10px;
  flex: 1;
}
.right-side {
  display: flex;
  gap: 10px;
  align-items: center;
}
.button-img {
  width: 22px;
  height: 22px;
  margin-left: 5px;
  vertical-align: middle;
  border-radius: 0;
}
</style>
