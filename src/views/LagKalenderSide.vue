<script lang="ts" setup>
import { ref } from 'vue'
import { useFirebaseStore } from '@/stores/FirebaseStore'
const firebaseStore = useFirebaseStore()
</script>

<template>
  <div>
    <div>Lag kalenderen din!</div>
    <div class="calenderStyle">
      <div v-for="(value, index) in firebaseStore.julekalender" :key="index" class="day">
        <div :id="`dag_${index}`" @click="changeLuke(value, index)">
          <div>{{ value.texts }}</div>
          <input type="text" placeholder="legg til tekst" />
          <div>{{ value.image }}</div>
          <input type="text" placeholder="legg til bilde" />
          <div>{{ value.video }}</div>
          <input type="text" placeholder="legg til video" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calenderStyle {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  margin-top: 50px;
  gap: 6px;
  background-color: maroon;
  border: 1px solid #ccc;
}
.day {
  background-color: red;
  padding: 2em;
  text-align: center;
}
.day > div > div:first-child {
  font-style: italic;
}
</style>
