<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MainPage from './components/MainPage.vue'
</script>

<template>
  <div class="page-header">
    <p>ePrijava</p>
    <div class="clock">18:59</div> <!-- Add a placeholder for the clock -->
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
  align-items: center; /* Center items vertically */
  justify-content: space-around; /* Distribute space between items */
}
.background-wrapper {
  background-color: #2c3e50; /* Promijeni ovo u željenu boju pozadine */
  padding: 2rem;
  margin: 0.2vh auto; /* Centriraj kontejner vertikalno s 2.5% margine */
  width: 96vw; /* 95% širine viewporta */
  height: 89vh; /* 95% visine viewporta */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Opcionalno: Dodaj shadow za bolju vizualnu separaciju */
  border-radius: 20px; /* Opcionalno: Dodaj zaobljene kutove */
}

.background-wrapper * {
  color: white; /* Promijeni ovo u željenu boju teksta */
}



.logo {
  position: absolute;
  /* width: 10em;
  height: 7.5em; */
  /* margin-right: 0;  *//* Remove any right margin */
}

.clock {
  /* flex-grow: 1;  */ /* Allow the clock to take up available space */
  /* text-align: center; */ /* Center the clock text */
  font-size: 2em; /* Increase the font size */
  /* padding: 1rem; */ /* Add padding around the clock */
  /* margin-left: auto; */ /* Push the clock to the center */
  /* margin-right: auto; */ /* Push the clock to the center */;
}

/* nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
} */

/* nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
} */

/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
