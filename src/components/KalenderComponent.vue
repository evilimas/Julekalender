<script lang="ts" setup>
import { useFirebaseStore } from '@/stores/firebaseStore';
const firebaseStore = useFirebaseStore();
</script>
<template>
  <div class="kalender">

    <div class="dag"  v-for="(day, index) in firebaseStore.julekalender" :key="index">
      <h3>Day {{ day.day }}</h3>
      <div v-show="day.opened">
        <p>{{ day.texts }}</p>
        <img :src="day.image" alt="Bilde for dagen" v-if="day.image" />
        <div v-if="day.video">
          <video width="320" height="240" controls>
            <source :src="day.video" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>

  </div>
</template>


<style scoped>
.kalender {
  display: grid;
   grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
  margin-top: 110px;
  
}
.dag {
  /* margin: 20px; */
  border: 1px solid #ccc;
}
</style>
