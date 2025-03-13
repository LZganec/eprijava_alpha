<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MainPage from './components/MainPage.vue'
import 'flag-icons/css/flag-icons.min.css'
</script>

<template>
  <div class="page-header">
    <div class="language-buttons">
      <button><span class="fi fi-gb"></span> EN</button>
      <button><span class="fi fi-hr"></span> HR</button>
      <button><span class="fi fi-de"></span> DE</button>
      <button><span class="fi fi-fr"></span> FR</button>
      <button><span class="fi fi-it"></span> IT</button>
    </div>
    <div class="clock">18:59</div> <!-- trenutno placeholder, bum nekak namestil da sistemsko vreme gledi -->
    <img alt="HAIX logo" class="logo" src="@/assets/haixLogo.png" width="125" height="125" />
  </div>

  <div class="background-wrapper">
    
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
  justify-content: space-between; 
  /* position: relative; */
  padding: 0 2rem; /* Add padding to create more space between elements */
}

.background-wrapper {
  background-color: #2c3e50; 
  padding: 5rem;
  margin: auto;
  width: 96vw; /* 95% širine viewporta */
  height: 85vh; /* 95% visine viewporta */
  border-radius: 20px; /* zaobljeni vogli */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Dodaj shadow za bolju vizualnu separaciju */
  /* position: relative; */ /* Ensure the language buttons are positioned relative to the container */
}

.background-wrapper * {
  color: white; /* boja teksta v kontejneru */
}

.language-buttons {
  /* position: absolute; */
  top: 1rem;
  left: 3rem;
  display: flex;
  gap: 0.5rem; /* Space between buttons */
}

.language-buttons button {
  background-color: #ffffff;
  color: #2c3e50;
  border: none;
  /* padding: 1rem; */ /* Increase padding for larger buttons */
  font-size: 1.2rem; /* Increase font size */
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Space between icon and text */
}

.language-buttons button:hover {
  background-color: #dddddd;
}

.logo {
  position: relative; /* moral sam deti absolute jer bi drugačije vura ne bila centrirana jeba joj pas */
  bottom: -2rem;
  z-index: 1;
}

.clock {
  flex-grow: 1; /* Allow the clock to take up available space */
  text-align: center; /* Center the clock text */
  font-size: 2em; 
/*   margin-left: auto;  
  margin-right: auto;   */
 /*  position: absolute;
  left: 50%;
  right: 50%; */
}

</style>
