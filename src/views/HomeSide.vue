<script lang="ts" setup>
// import { useFirebaseStore } from '@/stores/firebaseStore'
// const firebaseStore = useFirebaseStore()
import KalenderComponent from '@/components/KalenderComponent.vue';



</script>

<template>
    <div class="container">
   

        <KalenderComponent />
    </div>
</template>

<style scoped>
.container {
  /* display: flex; */
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
  background: url('../images/hero.jpg') no-repeat center center;
  background-size: cover;
  height: 100vh;
  padding-top: 100px;
}

</style>
