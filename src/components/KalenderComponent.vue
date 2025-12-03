<script lang="ts" setup>
import { ref } from 'vue';
import { useFirebaseStore } from '@/stores/firebaseStore';
const firebaseStore = useFirebaseStore();
const currentDay = firebaseStore.currentDate.toDate().getDate();

const unlockLuke = (dayObj: object, dayNum: number) => {
  const getCurrentElement = document.getElementsByClassName("dag")[dayNum - 1];
  const getCurrentElementbutton = getCurrentElement?.getElementsByTagName("button")[0];
  // dayObj.openable !!!!

  if (dayNum <= currentDay) { //<-- dette burde være dayObj.openable!!
    if (dayObj.opened == true) {
      getCurrentElementbutton!.innerHTML = "åpne";
      //buttonTxt.value = "Open";
      dayObj.opened = false;
    }
    else {
      getCurrentElementbutton!.innerHTML = "lukk";
      dayObj.opened = true;
    }
  } else {
    getCurrentElement!.getElementsByTagName("div")[0]!.innerHTML += `<div>Å NO YOU DONT!!</div>`;

    const myTime = setTimeout(() => {
      getCurrentElement!.getElementsByTagName("div")[0]!.innerHTML = "";
    }, 4000);
  }
}
</script>
<template>
  <div class="kalender">

    <div class="dag" v-for="(day, index) in firebaseStore.julekalender" :key="index">
      <h3>Dag {{ day.day }}</h3>

      <button @click="unlockLuke(day, day.day)">lås opp</button> <!--:disabled="day.day > currentDay"--->
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
