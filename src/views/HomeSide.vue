<script lang="ts" setup>
import KalenderComponent from '@/components/KalenderComponent.vue';
import { useFirebaseStore } from '@/stores/FirebaseStore';
const firebaseStore = useFirebaseStore();
</script>

<template>
    <div class="container" :style="{ backgroundImage: `url(${firebaseStore.styleDocument?.backgroundImage || './src/images/hero.jpg'})` }">
        <div class="snow-container">
            <div class="snowflake" v-for="n in 150" :key="n"></div>
        </div>
        <KalenderComponent />
        <div class="gris-container">
            <img class="gris" src="../assets/marsipan_still.png" alt="marsipan gris" />
        </div>
    </div>
</template>

<style scoped>
.container {
  position: relative;
  justify-content: center;
  align-items: center;
  background: url('../images/hero.jpg') no-repeat center center;
  background-size: cover;
  height: calc(100vh - 100px);
  padding-top: 100px;
  overflow: hidden;
}

.gris-container {
  position: absolute;
  bottom: 0;
  right: 320px;
  width: 150px;
  z-index: 1;
}

.gris {
  width: 300%;
  transition: transform 0.3s ease-in-out;
}

.gris-container:hover .gris {
  content: url('../assets/marsipan_anim_ny.gif');
}

/* Snow effect with CSS - lowered z-index for navigation */
.snow-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.snowflake {
  position: absolute;
  top: -10px;
  color: white;
  font-size: 1em;
  animation: fall linear infinite;
}

/* More snowflake patterns for denser snow */
.snowflake:nth-child(1) { left: 1%; animation-duration: 6s; animation-delay: 0s; font-size: 0.8em; }
.snowflake:nth-child(2) { left: 10%; animation-duration: 8s; animation-delay: 1s; font-size: 1.2em; }
.snowflake:nth-child(3) { left: 20%; animation-duration: 10s; animation-delay: 0.5s; font-size: 0.9em; }
.snowflake:nth-child(4) { left: 30%; animation-duration: 7s; animation-delay: 1.5s; font-size: 1.1em; }
.snowflake:nth-child(5) { left: 40%; animation-duration: 9s; animation-delay: 0.2s; font-size: 0.7em; }
.snowflake:nth-child(6) { left: 50%; animation-duration: 6s; animation-delay: 1.2s; font-size: 1.3em; }
.snowflake:nth-child(7) { left: 60%; animation-duration: 11s; animation-delay: 0.8s; font-size: 0.9em; }
.snowflake:nth-child(8) { left: 70%; animation-duration: 8s; animation-delay: 0.3s; font-size: 1.0em; }
.snowflake:nth-child(9) { left: 80%; animation-duration: 9s; animation-delay: 1.8s; font-size: 0.8em; }
.snowflake:nth-child(10) { left: 90%; animation-duration: 7s; animation-delay: 0.7s; font-size: 1.2em; }

.snowflake:nth-child(11) { left: 5%; animation-duration: 12s; animation-delay: 0.1s; font-size: 0.6em; }
.snowflake:nth-child(12) { left: 15%; animation-duration: 5s; animation-delay: 0.9s; font-size: 1.4em; }
.snowflake:nth-child(13) { left: 25%; animation-duration: 9s; animation-delay: 1.3s; font-size: 0.8em; }
.snowflake:nth-child(14) { left: 35%; animation-duration: 7s; animation-delay: 0.4s; font-size: 1.1em; }
.snowflake:nth-child(15) { left: 45%; animation-duration: 11s; animation-delay: 1.7s; font-size: 0.9em; }
.snowflake:nth-child(16) { left: 55%; animation-duration: 6s; animation-delay: 0.6s; font-size: 1.0em; }
.snowflake:nth-child(17) { left: 65%; animation-duration: 10s; animation-delay: 1.1s; font-size: 0.7em; }
.snowflake:nth-child(18) { left: 75%; animation-duration: 8s; animation-delay: 0.8s; font-size: 1.3em; }
.snowflake:nth-child(19) { left: 85%; animation-duration: 9s; animation-delay: 1.4s; font-size: 0.9em; }
.snowflake:nth-child(20) { left: 95%; animation-duration: 7s; animation-delay: 0.2s; font-size: 1.1em; }

.snowflake:nth-child(21) { left: 2%; animation-duration: 10s; animation-delay: 0.5s; font-size: 1.0em; }
.snowflake:nth-child(22) { left: 12%; animation-duration: 6s; animation-delay: 1.3s; font-size: 0.8em; }
.snowflake:nth-child(23) { left: 22%; animation-duration: 8s; animation-delay: 0.9s; font-size: 1.2em; }
.snowflake:nth-child(24) { left: 32%; animation-duration: 12s; animation-delay: 0.4s; font-size: 0.7em; }
.snowflake:nth-child(25) { left: 42%; animation-duration: 9s; animation-delay: 1.6s; font-size: 1.1em; }
.snowflake:nth-child(26) { left: 52%; animation-duration: 7s; animation-delay: 0.3s; font-size: 0.9em; }
.snowflake:nth-child(27) { left: 62%; animation-duration: 11s; animation-delay: 1.0s; font-size: 1.0em; }
.snowflake:nth-child(28) { left: 72%; animation-duration: 6s; animation-delay: 0.7s; font-size: 0.8em; }
.snowflake:nth-child(29) { left: 82%; animation-duration: 10s; animation-delay: 1.2s; font-size: 1.3em; }
.snowflake:nth-child(30) { left: 92%; animation-duration: 8s; animation-delay: 0.1s; font-size: 0.9em; }

.snowflake:nth-child(31) { left: 4%; animation-duration: 7s; animation-delay: 1.4s; font-size: 1.1em; }
.snowflake:nth-child(32) { left: 14%; animation-duration: 9s; animation-delay: 0.2s; font-size: 0.7em; }
.snowflake:nth-child(33) { left: 24%; animation-duration: 12s; animation-delay: 1.1s; font-size: 1.0em; }
.snowflake:nth-child(34) { left: 34%; animation-duration: 6s; animation-delay: 0.6s; font-size: 0.8em; }
.snowflake:nth-child(35) { left: 44%; animation-duration: 10s; animation-delay: 1.5s; font-size: 1.2em; }
.snowflake:nth-child(36) { left: 54%; animation-duration: 8s; animation-delay: 0.3s; font-size: 0.9em; }
.snowflake:nth-child(37) { left: 64%; animation-duration: 11s; animation-delay: 1.0s; font-size: 1.0em; }
.snowflake:nth-child(38) { left: 74%; animation-duration: 7s; animation-delay: 0.5s; font-size: 0.8em; }
.snowflake:nth-child(39) { left: 84%; animation-duration: 9s; animation-delay: 1.3s; font-size: 1.3em; }
.snowflake:nth-child(40) { left: 94%; animation-duration: 6s; animation-delay: 0.4s; font-size: 0.9em; }

/* Random positioning for remaining snowflakes */
.snowflake:nth-child(n+21):nth-child(-n+50) { left: 3%; animation-duration: 8s; animation-delay: 0.3s; font-size: 0.8em; }
.snowflake:nth-child(n+51):nth-child(-n+80) { left: 13%; animation-duration: 6s; animation-delay: 1.6s; font-size: 1.2em; }
.snowflake:nth-child(n+81):nth-child(-n+110) { left: 23%; animation-duration: 12s; animation-delay: 0.7s; font-size: 0.6em; }
.snowflake:nth-child(n+111):nth-child(-n+140) { left: 33%; animation-duration: 9s; animation-delay: 1.9s; font-size: 1.0em; }
.snowflake:nth-child(n+141) { left: 43%; animation-duration: 7s; animation-delay: 0.5s; font-size: 0.9em; }

.snowflake::before {
  content: "❄";
  opacity: 0.7;
}

@keyframes fall {
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

/* Keep calendar content above snow but below navigation */
:deep(.kalender) {
  position: relative;
  z-index: 1;
}
</style>
