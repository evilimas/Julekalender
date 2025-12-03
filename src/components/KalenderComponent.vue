<script lang="ts" setup>
import { useFirebaseStore } from '@/stores/firebaseStore';
const firebaseStore = useFirebaseStore();
const currentDay = firebaseStore.currentDate.toDate().getDate();
// const checkDate = (day) =>
// if(day > currentDay){
  
// }
</script>
<template>
  <div class="kalender">

    <div class="dag" v-for="(day, index) in firebaseStore.julekalender" :key="index" >
      <h3>Dag {{ day.day }}</h3>
    
      <button v-show="!day.opened" @click="day.opened = true" :disabled="day.day > currentDay">Open</button>
      <button v-show="day.opened" @click="day.opened = false">Close</button>
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
  max-width: 1000px;
   grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
  margin: 0 auto;
  margin-top: 110px;
  
}
.dag {
  /* margin: 20px; */
  border: 1px solid #ccc;
}
</style>
