<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import defaultAvatar from '@/images/default-avatar.jpeg'
import { useFirebaseStore } from '@/stores/firebaseStore'
const firebaseStore = useFirebaseStore()
const router = useRouter()
const route = useRoute()

const props = defineProps<{
  userPhoto?: string
}>()
</script>
<template>
  <nav class="navbar" v-if="route.path == '/home'">
    
      <img :src="props.userPhoto || defaultAvatar" alt="User Avatar" />
      <p>{{ firebaseStore.user?.displayName ? firebaseStore.user?.displayName : firebaseStore.user?.email }}</p>
      <button @click="firebaseStore.signOutUser()">Logg ut</button>


    <button v-if="firebaseStore.isAdmin" @click="router.push('/lagkalender')">Lag Kalender</button>
  </nav>
  <nav
    class="navbar"
    v-else-if="route.path !== '/login' && route.path !== '/register' && route.path !== '/'"
  >
    <!-- <button v-if="route.path.startsWith('/yatzy-mp/')" @click="router.push('/yatzy-mp')">
      <v-icon name="bi-arrow-return-left" scale="0.7" /> Tilbake
    </button> -->
    <button v-if="route.path !== '/kalender/:kalenderId'" @click="router.push('/home')">
      Tilbake
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
</style>
