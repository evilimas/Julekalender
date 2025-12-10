      <script lang="ts" setup>
      import { onMounted, ref } from 'vue'
        import { useFirebaseStore } from '@/stores/FirebaseStore';
      const store = useFirebaseStore();
      import firebase from 'firebase/compat/app'

        const firebaseStore = useFirebaseStore();
        const defaultBgImage = "./src/images/hero.jpg";
        const bgImage = ref<string>(firebaseStore.styleDocument?.backgroundImage || defaultBgImage);
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
          "Bitcount Prop Single"
        ]);


        /*const loadGoogleFonts = async (fonts : string[]) => {
          const fontLink = document.createElement('link');

          const fontFamilies = fonts.map(font => `${font}:wght@400`)

          /!*fontLink.href = `https://fonts.googleapis.com/css?family=${fonts.join('&family=')}&display=swap`;*!/
          fontLink.href = `https://fonts.googleapis.com/css?family=${fontFamilies.join('&family=')}&display=swap`;

          fontLink.rel = 'stylesheet';
          document.head.appendChild(fontLink);
        }*/

        const updateBackground = async () => {
          try {
            isUpdating.value = true;
            message.value = '';
            await firebaseStore.updateStyleValue('backgroundImage', bgImage.value);
            message.value = 'Bakgrunns bilde oppdatert! ✅';
          } catch (error) {
            message.value = 'Bakgrunns bilde oppdatering feilet ❌';
            console.error(error);
          } finally {
            isUpdating.value = false;
            setTimeout(() => message.value = '', 3000);
          }
        };

        const updatePrimary = async () => {
          try {
            isUpdating.value = true;
            message.value = '';
            await firebaseStore.updateStyleValue('primaryColor', primaryColor.value);
            message.value = 'Primær farge oppdatert! ✅';
          } catch (error) {
            message.value = 'Primær farge oppdatering feilet ❌';
            console.error(error);
          } finally {
            isUpdating.value = false;
            setTimeout(() => message.value = '', 3000);
          }
        };

        const updateSecondary = async () => {
          try {
            isUpdating.value = true;
            message.value = '';
            await firebaseStore.updateStyleValue('secondaryColor', secondaryColor.value);
            message.value = 'Sekundær farge oppdatert! ✅';
          } catch (error) {
            message.value = 'Sekundær farge oppdatering feilet ❌';
            console.error(error);
          } finally {
            isUpdating.value = false;
            setTimeout(() => message.value = '', 3000);
          }
        };

        const updateText = async () => {
          try {
            isUpdating.value = true;
            message.value = '';
            await firebaseStore.updateStyleValue('textColor', textColor.value);
            message.value = 'Tekst farge oppdatert! ✅';
          } catch (error) {
            message.value = 'Tekst farge oppdatering feilet ❌';
            console.error(error);
          } finally {
            isUpdating.value = false;
            setTimeout(() => message.value = '', 3000);
          }
        };
        const updateSecondaryText = async () => {
          try {
            isUpdating.value = true;
            message.value = '';
            await firebaseStore.updateStyleValue('secondaryTextColor', secondaryTextColor.value);
            message.value = 'Tekst farge oppdatert! ✅';
          } catch (error) {
            message.value = 'Tekst farge oppdatering feilet ❌';
            console.error(error);
          } finally {
            isUpdating.value = false;
            setTimeout(() => message.value = '', 3000);
          }
        };
        const updateMessageColor = async () => {
          try {
            isUpdating.value = true;
            message.value = '';
            await firebaseStore.updateStyleValue('messageColor', messageColor.value);
            message.value = 'Tekst farge oppdatert! ✅';
          } catch (error) {
            message.value = 'Tekst farge oppdatering feilet ❌';
            console.error(error);
          } finally {
            isUpdating.value = false;
            setTimeout(() => message.value = '', 3000);
          }
        };

        const updateFont = async () => {
          try {
            isUpdating.value = true;
            message.value = '';
            await firebaseStore.updateStyleValue('fontFamily', fontFamily.value);
            message.value = 'Font oppdatert ✅';
            /*await firebaseStore.loadGoogleFonts([fontFamily.value]);*/
          } catch (error) {
            message.value = 'Font oppdatering feilet ❌';
            console.error(error);
          } finally {
            isUpdating.value = false;
            setTimeout(() => message.value = '', 3000);
          }
        }


        onMounted(() => {
         store.loadGoogleFonts(availableFonts.value);
        })
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
                <button @click="updateBackground" :disabled="isUpdating">
                  {{ isUpdating ? 'Oppdaterer...' : 'Oppdater' }}
                </button>
            </div>
            <div class="input">
                <label for="primary-color">Primær farge:</label>
                <p>Overskriftsbakgrunn (luker)</p>
                <input id="primary-color" type="color" v-model="primaryColor" :disabled="isUpdating"/>
                <button @click="updatePrimary" :disabled="isUpdating">
                  {{ isUpdating ? 'Oppdaterer...' : 'Oppdater' }}
                </button>
            </div>
            <div class="input">
                <label for="secondary-color">Sekundær farge:</label>
                <p>Knappfargebakgrunn</p>
                <input id="secondary-color" type="color" v-model="secondaryColor" :disabled="isUpdating"/>
                <button @click="updateSecondary" :disabled="isUpdating">
                  {{ isUpdating ? 'Oppdaterer...' : 'Oppdater' }}
                </button>
            </div>
            <div class="input">
                <label for="text-color">Primær tekst farge:</label>
                <p>Luketekstfarge</p>
                <input id="text-color" type="color" v-model="textColor" :disabled="isUpdating"/>
                <button @click="updateText" :disabled="isUpdating">
                  {{ isUpdating ? 'Oppdaterer...' : 'Oppdater' }}
                </button>
            </div>
            <div class="input">
                <label for="text-color">Sekundær tekst farge:</label>
                <p>Knapptekstfarge</p>
                <input id="secondary-text-color" type="color" v-model="secondaryTextColor" :disabled="isUpdating"/>
                <button @click="updateSecondaryText" :disabled="isUpdating">
                  {{ isUpdating ? 'Oppdaterer...' : 'Oppdater' }}
                </button>
            </div>
            <div class="input">
                <label for="text-color">Luke melding farge:</label>
                <p>Luke melding farge</p>
                <input id="message-text-color" type="color" v-model="messageColor" :disabled="isUpdating"/>
                <button @click="updateMessageColor" :disabled="isUpdating">
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
            <button @click="updateFont" :disabled="isUpdating">
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
