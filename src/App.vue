<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MainPage from './components/MainPage.vue'
</script>

<template>
  <div class="page-header">
    <p>ePrijava v0.1</p>
    <div class="clock">18:59</div> <!-- trenutno placeholder, bum nekak namestil da sistemsko vreme gledi -->
    <img alt="HAIX logo" class="logo" src="@/assets/haixLogo.png" width="125" height="125" />
  </div>

  <div class="background-wrapper">
    <div class="language-buttons">
      <button>EN</button>
      <button>HR</button>
      <button>DE</button>
      <button>FR</button>
      <button>IT</button>
    </div>
    <!-- </header> -->
    <MainPage msg="Test" />
    <!-- <RouterView /> -->
  </div>
</template>

<style scoped>

.page-header {
  display: flex;
  flex-direction: row;
  align-items: center; 
  justify-content: space-around; 
}

.background-wrapper {
  background-color: #2c3e50; 
  padding: 2rem;
  margin: 0.2vh auto; /* centriraj kontejner vertikalno i trunkicu odmakni od vrha */
  width: 96vw; /* 95% širine viewporta */
  height: 89vh; /* 95% visine viewporta */
  border-radius: 20px; /* zaobljeni vogli */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Dodaj shadow za bolju vizualnu separaciju */
  /* position: relative; */ /* Ensure the language buttons are positioned relative to the container */
}

.background-wrapper * {
  color: white; /* boja teksta v kontejneru */
}

.language-buttons {
  position: absolute;
  top: 1rem;
  left: 3rem;
  display: flex;
  gap: 0.5rem; /* Space between buttons */
}

.language-buttons button {
  background-color: #ffffff;
  color: #2c3e50;
  border: none;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
}

.language-buttons button:hover {
  background-color: #dddddd;
}

.logo {
  position: absolute; /* moral sam deti absolute jer bi drugačije vura ne bila centrirana jeba joj pas */
}

.clock {
  font-size: 2em; 
}

</style>
