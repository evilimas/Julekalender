      <script lang="ts" setup>
        import { ref } from 'vue';
        import { useFirebaseStore } from '@/stores/FirebaseStore';

        const firebaseStore = useFirebaseStore();
        const bgImage = ref<string>(firebaseStore.styleDocument?.backgroundImage || "https://fcr.travel/wp-content/uploads/slider/cache/ade9b4727b7ec40d611a0c5a5b8fb3a6/30-3.jpg");
        const primaryColor = ref<string>(firebaseStore.styleDocument?.primaryColor || '#ffffff');
        const secondaryColor = ref<string>(firebaseStore.styleDocument?.secondaryColor || '#000000');
        const textColor = ref<string>(firebaseStore.styleDocument?.textColor || '#ffffff');
        const secondaryTextColor = ref<string>(firebaseStore.styleDocument?.secondaryTextColor || '#000000');
        const messageColor = ref<string>(firebaseStore.styleDocument?.messageColor || '#000000');
        const fontFamily = ref<string>(firebaseStore.styleDocument?.fontFamily || 'Aria');
        const isUpdating = ref<boolean>(false);
        const message = ref<string>('');
        const availableFonts = ref<string[]>([
          "Arial",
          "Times New Roman",
          "Courier New",
          "Georgia",
          "Impact",
          "Fantasy",
          "Cursive",
          "Roboto",
          "Permanent Marker",
          "Mountains of Christmas",
          "Mynerve",
          "Rubik",
        ]);


        const updateStyle = async (styleOption : string, newStyle: string, styleText:string) => {
          try {
            isUpdating.value = true;
            message.value = '';
            await firebaseStore.updateStyleValue(styleOption, newStyle);
            message.value = `${styleText} oppdatert ✅`;
          } catch (error) {
            message.value = `${styleText} oppdatering feilet ❌`;
            console.error(error);
          } finally {
            isUpdating.value = false;
            setTimeout(() => message.value = '', 3000);
          }
        }

      </script>
<template>
  <div class="container">
    <div class="content">

        <div class="header">

            <h1>Styling Side</h1>
            <p>Her kan du endre bakgrunns bilde og farger!</p>
        </div>


        <div v-if="message" class="message" :class="{ success: message.includes('✅'), error: message.includes('❌') }">
          {{ message }}
        </div>

        <div class="inputs">

            <div class="input" >
                <label for="bg-image">🖼️ Bakgrunns bilde URL:</label>
                <p>Kalenders bakgrunns bilde</p>
                <input id="bg-image" type="text" v-model="bgImage" placeholder="https://example.com/background.jpg" />
                <button @click="updateStyle('backgroundImage', bgImage, 'Bakgrunns bilde')" :disabled="isUpdating">
                  {{ isUpdating ? 'Oppdaterer...' : 'Oppdater' }}
                </button>
            </div>
            <div class="input">
                <label for="primary-color">Primær farge:</label>
                <p>Overskriftsbakgrunn (luker)</p>
                <input id="primary-color" type="color" v-model="primaryColor" :disabled="isUpdating"/>
                <button @click="updateStyle('primaryColor', primaryColor, 'Primær farge')" :disabled="isUpdating">
                  {{ isUpdating ? 'Oppdaterer...' : 'Oppdater' }}
                </button>
            </div>
            <div class="input">
                <label for="secondary-color">Sekundær farge:</label>
                <p>Knappfargebakgrunn</p>
                <input id="secondary-color" type="color" v-model="secondaryColor" :disabled="isUpdating"/>
                <button @click="updateStyle('secondaryColor', secondaryColor, 'Sekundær farge')" :disabled="isUpdating">
                  {{ isUpdating ? 'Oppdaterer...' : 'Oppdater' }}
                </button>
            </div>
            <div class="input">
                <label for="text-color">Primær tekst farge:</label>
                <p>Luketekstfarge</p>
                <input id="text-color" type="color" v-model="textColor" :disabled="isUpdating"/>
                <button @click="updateStyle('textColor', textColor, 'Primær tekst farge')" :disabled="isUpdating">
                  {{ isUpdating ? 'Oppdaterer...' : 'Oppdater' }}
                </button>
            </div>
            <div class="input">
                <label for="text-color">Sekundær tekst farge:</label>
                <p>Knapptekstfarge</p>
                <input id="secondary-text-color" type="color" v-model="secondaryTextColor" :disabled="isUpdating"/>
                <button @click="updateStyle('secondaryTextColor', secondaryTextColor, 'Sekundær tekst farge')" :disabled="isUpdating">
                  {{ isUpdating ? 'Oppdaterer...' : 'Oppdater' }}
                </button>
            </div>
            <div class="input">
                <label for="text-color">Luke melding farge:</label>
                <p>Luke melding farge</p>
                <input id="message-text-color" type="color" v-model="messageColor" :disabled="isUpdating"/>
                <button @click="updateStyle('messageColor', messageColor, 'Luke melding farge')" :disabled="isUpdating">
                  {{ isUpdating ? 'Oppdaterer...' : 'Oppdater' }}
                </button>
            </div>
          <div class="input">
            <label for="text-color">Endre font</label>
            <p>Velg skrifttype</p>
            <select id="font-family" v-model="fontFamily" :disabled="isUpdating">
              <option v-for="font in availableFonts" :key="font" :value="font">
                {{font}}
              </option>
            </select>
            <button @click="updateStyle('fontFamily', fontFamily, 'Font')" :disabled="isUpdating">
              {{ isUpdating ? 'Oppdaterer...' : 'Oppdater' }}
            </button>
          </div>
        </div>
    </div>


  </div>
</template>


<style scoped>
    .container {
  padding: 2rem;

  margin: 0 auto;
  background: url('../assets/workshop.jpg') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  padding-top: 100px;
}
.content{
    max-width: 1000px;
    margin: 0 auto;
}
.header {
  text-align: center;
  font-size: 2em;
  margin-bottom: 3rem;
  color: rgb(255, 255, 255);
}
h1{
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
.inputs {
  display: grid;
  
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}
.inputs button {
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100px;
}
.inputs button:hover {
    background-color: #45a049;
}

.input{
    display: flex;
    flex-direction: column;
   background: white;
   gap: 10px;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid #e0e0e0;
  color: rgb(70, 70, 70);
  background: rgb(199, 199, 199);
}
label {
    color: rgb(43, 43, 43);
    font-weight: bold;
}
input[type="text"] {
    padding: 0.5rem;
    border-radius: 5px;
    border: none;
    font-size: 1rem;
    border: 1px solid #c0c0c0;
    padding: 0.5rem;

}
input[type="color"] {
    width: 140px;
    height: 40px;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    border: 1px solid #afafaf;
    padding: 0.2rem;
}

.message {
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    text-align: center;
    font-weight: bold;
    transition: opacity 0.3s ease;
}

.message.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.message.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

input:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

select {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #c0c0c0;
    font-size: 1rem;
}

</style>
