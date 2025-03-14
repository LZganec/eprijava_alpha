<script setup>
import { ref, onMounted } from 'vue'
import MainPage from './components/MainPage.vue'
import 'flag-icons/css/flag-icons.min.css'            // za ikone zastava
import translations from './assets/translations.json' // za prijevode

let time = ref('')
let welcomeMessage = ref('')

const changeLanguage = (lang) => {
  // provjerava postoji li prijevod za zadani jezik u objektu translations
  if (translations[lang]) {
    // ako postoji, postavlja vrijednost welcomeMessage na prijevod za zadani jezik
    welcomeMessage.value = translations[lang]
  }
}

// Funkcija za ažuriranje vremena
const updateTime = () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  time.value = `${hours}:${minutes}:${seconds}`
}

// pri mountanju postavlja defaultni jezik na hrvatski
onMounted(() => {
  changeLanguage('hr')
  updateTime()
  setInterval(updateTime, 1000) // Ažurira vrijeme svake sekunde
})
</script>

<template>
  <div class="page-header">
    <div class="clock">{{ time }}</div>
    <!-- trenutno placeholder, bum nekak namestil da sistemsko vreme gledi -->
    <div class="logo">
      <!-- <img alt="HAIX icon" src="@\assets\hx_logo.png" width="50" height="50" /> -->
      <img alt="HAIX logo" src="@\assets\haix_group_blau.png" width="300" height="69" />
    </div>
  </div>

  <div class="background-wrapper">
    <MainPage :msg="welcomeMessage" />
    <!-- <RouterView /> -->
  </div>
  <div class="language-buttons">
    <button @click="() => changeLanguage('en')"><span class="fi fi-gb"></span> EN</button>
    <button @click="() => changeLanguage('hr')"><span class="fi fi-hr"></span> HR</button>
    <button @click="() => changeLanguage('de')"><span class="fi fi-de"></span> DE</button>
    <button @click="() => changeLanguage('fr')"><span class="fi fi-fr"></span> FR</button>
    <button @click="() => changeLanguage('it')"><span class="fi fi-it"></span> IT</button>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0.2rem 3rem;
  margin-top: 1rem;
}

.language-buttons {
  padding-top: 0.4em;
  display: flex;
  gap: 3rem;
  align-items: center;
  justify-content: center;
}

.language-buttons button {
  background-color: #ffffff;
  color: #2c3e50;
  border: none;
  font-size: 2.2rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.language-buttons button:hover {
  background-color: #dddddd;
}

.logo {
  position: absolute;
  right: 3em;
  top: 1px;
  z-index: 1;
}

.clock {
  text-align: center;
  font-size: 2em;
  position: relative;
}

.background-wrapper {
  background-color: #2c3e50;
  padding: 1rem;
  margin: auto;
  width: 96vw;
  height: 89vh;
  border-radius: 20px;
}

.background-wrapper * {
  color: white;
}
</style>

<style>
body * {
  overflow: hidden;
}
</style>