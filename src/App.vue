<script setup>
import { ref, onMounted } from 'vue'
import MainPage from './components/MainPage.vue'
import 'flag-icons/css/flag-icons.min.css'            // za ikone zastava
import translations from './assets/translations.json' // za prijevode

let time = ref('')
let welcomeMessage = ref('')
let currentLang = ref('') // Default language is Croatian

// Funkcija za promjenu jezika
const changeLanguage = (lang) => {
  currentLang.value = lang
  // Provjerava postoji li prijevod za zadani jezik u objektu translations
  if (translations[lang]) {
    // Ako postoji, postavlja vrijednost welcomeMessage na prijevod za zadani jezik
    welcomeMessage.value = translations[lang].welcome
    console.log(`Language is now set to ${lang}.`)
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

// Postavlja zadani jezik na hrvatski prilikom montiranja komponente
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
      <img alt="HAIX logo" src="@/assets/haix_group_blau.png" width="250" height="69" />
    </div>
  </div>

  <div class="background-wrapper">
    <MainPage :msg="welcomeMessage" :lang="currentLang" />
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
  padding: 1rem 3rem;
  margin-top: 1rem;
}

.language-buttons {
  padding-top: 0.1em;
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
  top: 1.5em;
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
  height: 88vh;
  border-radius: 20px;
}

.background-wrapper * {
  color: white;
}
</style>

<style>
body {
  overflow: hidden;
}
</style>