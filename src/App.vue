<script setup lang="ts">
import NavComponent from './components/NavComponent.vue'
// import { useFirebaseStore } from './stores/firebaseStore'
// const firebaseStore = useFirebaseStore()
</script>

<template>
  <NavComponent />
  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
