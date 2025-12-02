<script lang="ts" setup>
import { ref } from 'vue'
import { useFirebaseStore } from '@/stores/FirebaseStore'
const firebaseStore = useFirebaseStore()

const assignedLuker = ref([])
</script>

<template>
  <div>
    <div>Lag kalenderen din!</div>
    <div class="calenderStyle">
      <div v-for="(value, index) in firebaseStore.julekalender" :key="index" class="day">
        <div :id="`dag_${index}`">
            <textarea v-model="value.texts" placeholder="legg til tekst"></textarea>
          <input v-model="value.image" type="text" placeholder="legg til bilde" />
          <input v-model="value.video" type="text" placeholder="legg til video" />
          <br />
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
.calenderStyle .day {
  background-color: red;
  padding: 2em;
  text-align: center;
}
.day > div > div:first-child {
  font-style: italic;
}
</style>
