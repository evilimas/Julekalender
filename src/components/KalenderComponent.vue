<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useFirebaseStore, type CalenderDay } from '@/stores/FirebaseStore';
const firebaseStore = useFirebaseStore();
const currentDay = firebaseStore.currentDate.toDate().getDate();
import firebase from 'firebase/compat/app';

const unlockLuke = (dayObj: CalenderDay, dayNum: number) => {
  const getCurrentElement = document.getElementById(`luke_${dayNum}`);
  const getCurrentElementbutton = getCurrentElement?.getElementsByTagName("button")[0];
  // dayObj.openable !!!!

  updateOpenables();

  if (dayObj.openable == true) { //<-- dette burde være dayObj.openable!!
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
  }
}

const updateOpenables = () => {
  for (const key in firebaseStore.julekalender){
    const item = firebaseStore.julekalender[key as keyof typeof firebaseStore.julekalender];
    if (item.day <= currentDay) item.openable = true;
    console.log(item.openable);
  }
}

const closeAllLukes = () => {
  let i = 0;
  for (const key in firebaseStore.julekalender){
    const item = firebaseStore.julekalender[key as keyof typeof firebaseStore.julekalender];
    if (item.opened == true) item.opened = false;
  }
}

const createId = (dagtall: number) => {
  return `luke_${dagtall}`;
}

/*onMounted(() => {
  updateOpenables();
})*/
</script>
<template>
  <div>
    <button @click="closeAllLukes" style="padding: 30px;">Lukk alle</button>
  </div>
  <div class="kalender">

    <div v-for="(day, index) in firebaseStore.julekalender" :key="index">
      <div :id="createId(day.day)" class="dag" :class="{ heightChange: day.opened }">
        <h3>Dag {{ day.day }}</h3>
        <button @click="unlockLuke(day, day.day)">lås opp</button> <!--:disabled="day.day > currentDay"--->
        <div v-show="day.opened">
          <p>{{ day.texts }}</p>
          <img :src="day.image" alt="Bilde for dagen" v-if="day.image" />
          <div v-if="day.video">
            <iframe :src="day.video"></iframe>
          </div>
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
  /* margin-top: 110px; */
}

.dag {
  /* margin: 20px; */
  border: 1px solid #ccc;
  background: linear-gradient(to bottom, rgb(203, 239, 255, 0.3), rgb(60, 66, 133, 0.5));
  text-align: center;
  border-radius: 0 0 20px 20px;
  overflow-wrap: break-word;
  max-height: 240px;
  overflow-y: scroll;
}

.dag p {
  background: linear-gradient(to bottom, rgb(184, 182, 175), rgb(226, 221, 205), rgb(232, 229, 220), white);
  background-clip: text;
  color: transparent;
}

.heightChange {
  height: 240px;
}

.dag h3 {
  background-color: maroon;
  color: white;
  padding: 10px;
  margin: 0;
}

.dag button {
  margin: 10px 0;
  padding: 5px 10px;
  color: white;
  background-color: #8298FC;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}

.dag button:hover {
  filter: hue-rotate(150deg) saturate(0.5) brightness(1.1);
}

.dag iframe,
.dag img {
  padding: 4px 0;
  height: 140px;
  width: 120px;
  border-radius: 20px;
  object-fit: cover;
}
</style>
