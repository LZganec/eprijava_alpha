<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MainPage from './components/MainPage.vue'
</script>

<template>
  <div class="page-header">
    <img alt="HAIX logo" class="logo" src="@/assets/haixLogo.png" width="125" height="125" />
    <p>dede</p>
  </div>

  <div class="background-wrapper">
    <!-- </header> -->
    <MainPage msg="Ovo je main page." />
    <!-- <RouterView /> -->
  </div>
</template>

<style scoped>
.background-wrapper {
  background-color: #f0f0f0; /* Change this to your desired background color */
  padding: 2rem;
  margin: 2.5vh auto; /* Center the container vertically with a 2.5% margin */
  width: 95vw; /* 95% of the viewport width */
  height: 95vh; /* 95% of the viewport height */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow for better visual separation */
  border-radius: 8px; /* Optional: Add rounded corners */
  overflow: auto; /* Optional: Add scroll if content overflows */
}

.page-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: -2rem;
}

.logo {
  /* display: block;
  margin: 0 auto 2rem; */
}

nav {
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
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
