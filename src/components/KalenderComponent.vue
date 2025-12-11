<script lang="ts" setup>
import { onBeforeMount, watch } from 'vue';
import { useFirebaseStore, type CalenderDay } from '@/stores/FirebaseStore';
const firebaseStore = useFirebaseStore();
const currentDay = new Date().getDate();

import ConfettiExplosion from "vue-confetti-explosion";

const mockDays = (dayObj: CalenderDay) => {
  return !(dayObj.openable);
}

const unlockLuke = (dayObj: CalenderDay) => {
  const getCurrentElement = document.getElementById(createId(dayObj.day));
  const getCurrentElementbutton = getCurrentElement?.getElementsByTagName("button")[0];
  // dayObj.openable !!!!

  if (dayObj.openable) { //<-- dette burde være dayObj.openable!!
    if (dayObj.opened == true) {
      getCurrentElementbutton!.innerHTML = "åpne";
      // buttonTxt.value = "Open";
      dayObj.opened = false;
    }
    else {
      getCurrentElementbutton!.innerHTML = "lukk";
      dayObj.opened = true;
    }
  }
  if (dayObj.openable == false) {
    console.log("not allowed!! nisse for you");
    if (dayObj.opened == true) {
      dayObj.opened = false;
    }
    else {
      dayObj.opened = true;

       setTimeout(() => {
        getCurrentElementbutton!.classList.add("hide");
      }, 50);

       setTimeout(() => {
        dayObj.opened = false;
        getCurrentElementbutton!.classList.remove("hide");
      }, 4000);
    }
  }

  console.log("openable: ", counts().openable, "opened: ", counts().opened);
}

const updateOpenables = (vari?: boolean) => {
  for (const key in firebaseStore.julekalender) {
    const item = firebaseStore.julekalender[key as keyof typeof firebaseStore.julekalender];
    if (item!.day <= currentDay) {
      item!.openable = true;
    }
    console.log(item!.openable);
    if (vari !== undefined) return item!.openable;
  }
}

const counts = () => {
  let openable = 0, opened = 0;
  for (const key in firebaseStore.julekalender) {
    const item = firebaseStore.julekalender[key as keyof typeof firebaseStore.julekalender];
    if (item!.openable) openable++;
    if (item!.opened) opened++;
  }
  return {
    openable,
    opened
  };
}

const closeAllLukes = () => {
  for (const key in firebaseStore.julekalender) {
    const item = firebaseStore.julekalender[key as keyof typeof firebaseStore.julekalender];
    if (item!.opened == true) item!.opened = false;
  }
}

const createId = (dagtall: number) => {
  return `luke_${dagtall}`;
}

// Watch for calendar data changes and update openables
watch(() => firebaseStore.julekalender, (newCalendar) => {
  if (newCalendar) {
    console.log("Calendar data loaded, updating openables...");
    updateOpenables();
  }
}, { immediate: true });

onBeforeMount(() => {
  console.log(updateOpenables(true), "ok yes updateOpenables kjører, denne er bare litt rar når det gjelder å returnere en verdi til console.log..");
})
</script>
<template>
  <div class="kalender">

    <div v-for="(day, index) in firebaseStore.julekalender" :key="index">
      <ConfettiExplosion v-if="day.opened && day.openable" :duration="1500" :particleCount="50" :stageHeight="1000" :stageWidth="1000"
          :colors="['#ff0000', '#efbf04', '#FFFFFF']" />
      <div :id="createId(day.day)" class="dag" :class="{ heightChange: (day.opened && day.openable) }">
        <ConfettiExplosion v-if="day.opened && day.openable" :duration="2000" :particleCount="200" :stageHeight="500"
          :colors="['#ff0000', '#efbf04', '#FFFFFF']" />
        <div :style="{ fontFamily: firebaseStore.styleDocument?.fontFamily }" >
          <h3 :style="{
            backgroundColor: `${firebaseStore.styleDocument?.primaryColor || 'maroon'}`,
            color: `${firebaseStore.styleDocument?.textColor || 'white'}`
          }" :class="{ smallerTitle: (day.opened && day.openable) }">
            Dag {{ day.day }}
          </h3>
          <button
            :style="{ backgroundColor: `${firebaseStore.styleDocument?.secondaryColor || '#8298FC'}`, color: `${firebaseStore.styleDocument?.secondaryTextColor || 'white'}` }"
            @click="unlockLuke(day)">
            lås opp
          </button>
          <div v-if="day.opened && day.openable">
            <p :style="{ color: `${firebaseStore.styleDocument?.messageColor || '#ffff'}` }">{{ day.texts }}</p>
            <img :src="day.image" alt="Bilde for dagen" v-if="day.image" />
            <div v-if="day.video">
              <iframe :src="day.video"></iframe>
            </div>
          </div>
        </div>
        <div class="nisse" v-show="day.opened && !day.openable">
          <img src="../assets/marsipan_nisse_anim_ny_mindre.gif" alt="Sinna nisse som faller">
        </div>
      </div>
    </div>
  </div>
  <div v-show="counts().opened > 1" class="closeAllDiv">
    <div>
      <button @click="closeAllLukes" class="closeAllButton">Lukk alle</button>
    </div>
  </div>
</template>

<style scoped>
.kalender {

  display: grid;
  max-width: 1200px;
  max-height: 60vh;
  padding: 30px;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 22px 27px;
  /* gap: 40px; */
  margin: auto;
  /* margin-top: 110px; */
  overflow-y: auto;
  scrollbar-color: rgba(0,0,0,0.3) transparent;
  scrollbar-width: thin;
}

.dag {
  /* margin: 20px; */
  border: 1px solid #ccc;
  background: linear-gradient(to bottom, rgb(203, 239, 255, 0.3), rgb(60, 66, 133, 0.5));
  text-align: center;
  border-radius: 6px 6px 20px 20px;
  overflow-wrap: break-word;
  height: auto;
  min-height: 110px;
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
}

.dag>div {
  grid-row-start: 1;
  grid-column-start: 1;
}

.dag p {
  /*background: linear-gradient(to bottom, rgb(184, 182, 175), rgb(226, 221, 205), rgb(232, 229, 220), white);*/
  /*background-clip: text;*/
  padding: 5px;
  color: silver;
  /*color: transparent;*/
}

.heightChange {
  min-height: 250px;
  max-height: 400px;
  width: 200px;
  overflow-y: auto;
  z-index: 10;
  scrollbar-width: thin;
  scrollbar-color: rgba(0,0,0,0.3) transparent;
}

.heightChange::-webkit-scrollbar {
  width: 6px;
}

.heightChange::-webkit-scrollbar-track {
  background: transparent;
}

.heightChange::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.3);
  border-radius: 3px;
}

.heightChange::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.5);
}

.dag h3 {
  background-color: maroon;
  color: white;
  padding: 10px;
  margin: 0;
}

.dag .smallerTitle {
  padding: 6px;
  font-size: .9rem;
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
  transform: scale(1.1);
  filter: hue-rotate(5deg) brightness(0.9) contrast(1.2) saturate(1.1);
}

.closeAllDiv {
  display: grid;
  max-width: 1200px;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  margin: 0 auto;
  text-align: right;
}

.closeAllButton {
  padding: 10px 30px;
  background: linear-gradient(to right bottom, white, rgb(226, 220, 209), white, rgb(247, 239, 213), rgb(181, 171, 150));
  border-radius: 6px;
  border-color: rgb(173, 162, 135);
  border-style: outset;
  margin: 5px 10px;
}

.closeAllButton:hover {
  filter: brightness(0.9) contrast(1.05) saturate(1.3) hue-rotate(-10deg);
}

.closeAllButton:active {
  filter: brightness(0.7) contrast(1.3) saturate(1.7) hue-rotate(-12deg);
}

.dag iframe {
  width: 100%;
  height: 200px;
  border: none;
  border-radius: 15px;
  margin-top: 10px;
}

.dag img {
  /* padding: 4px 0;
  height: 100px;
  width: 80px;
  border-radius: 20px;
  object-fit: cover; */
  width: 100%;
  max-width: 200px;
  height: 200px;
  border: none;
  border-radius: 15px;
  margin-top: 10px;
}

.nisse img {
  width: 100%;
  height: auto;
}

.hide {
  visibility: hidden;
}
</style>
