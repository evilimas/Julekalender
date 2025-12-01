<script lang="ts" setup>
import { useFirebaseStore } from '@/stores/firebaseStore'
const firebaseStore = useFirebaseStore()
</script>

<template>
  <div class="container">
    <button @click="firebaseStore.createjulekalender(firebaseStore.user)">
      Create Julekalender
    </button>

    <div v-for="(kalender, index) in firebaseStore.alleJulekalendere" :key="index">
      <p>Kalender {{ index + 1 }}:</p>
      <!-- <pre>{{ kalender }}</pre> -->
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
