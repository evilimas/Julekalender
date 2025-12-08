<script lang="ts" setup>
import { type CalenderDay, useFirebaseStore } from '@/stores/firebaseStore'
const firebaseStore = useFirebaseStore()

import { useFixLink } from "@/LinkConverter/LinkConverter.ts";

const {linkConverter} = useFixLink();

const updateKalender = () => {
  Object.values(firebaseStore.julekalender as Record<string, CalenderDay>).forEach(item => {
    if(item.video) {
      item.video = linkConverter(item.video as string);
    }
  });

  firebaseStore.updateJulekalender(firebaseStore.julekalender);
}

// const assignedLuker = ref([])
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>🎄 Lag kalenderen din! 🎄</h1>
      <p>Rediger innhold for hver dag i julekalenderen</p>
    </div>

    <div class="calendar-grid">
      <div v-for="(value, index) in firebaseStore.julekalender" :key="index" class="day-card">
        <div class="day-content">
          <div class="day-header">
            <h3>📅 Dag {{ value.day }}</h3>
          </div>

          <div class="input-group">
            <label>📝 Tekst:</label>
            <textarea
              v-model="value.texts"
              placeholder="Skriv inn tekst for denne dagen..."
              rows="3"
            ></textarea>
          </div>

          <div class="input-group">
            <label>🖼️ Bilde URL:</label>
            <input
              v-model="value.image"
              type="text"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div class="input-group">
            <label>🎥 Video URL:</label>
            <input
              v-model="value.video"
              type="text"
              placeholder="https://example.com/video.mp4"


            />
          </div>
        </div>
      </div>
    </div>

    <div class="save-section">
      <button
        class="save-btn"
        @click="updateKalender"
      >
        💾 Lagre kalender
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding-top: 100px;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  color: white;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.header p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.day-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid #e0e0e0;
}

.day-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
}

.day-header {
  text-align: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.day-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.3rem;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

textarea, input[type="text"] {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.9rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
}

textarea:focus, input[type="text"]:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.save-section {
  text-align: center;
  padding: 2rem 0;
}

.save-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.save-btn:active {
  transform: translateY(0);
}


@media (max-width: 768px) {
  .container {
    padding: 1rem;
    padding-top: 80px;
  }

  .calendar-grid {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 2rem;
  }
}
</style>
