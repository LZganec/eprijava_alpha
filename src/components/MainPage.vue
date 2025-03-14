<script setup>
import { computed } from 'vue'
import translations from '../assets/translations.json'

const props = defineProps({
  msg: {
    type: String,
    required: true,
  },
  lang: {
    type: String,
    required: true,
  },
})
console.log(props.lang)
const buttonLabels = computed(() => {
  return translations[props.lang] || translations['en']
})

</script>

<template>
  <div class="greetings">
    <h1 class="blue">{{ msg }}</h1>
    <div class="button-container">
      <button>{{ buttonLabels.signUp }}</button>
      <button>{{ buttonLabels.signIn }}</button>
      <button>{{ buttonLabels.logOut }}</button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
  margin-top: 7.5rem;
}

.button-container button {
  padding: 3rem 5rem;
  font-size: 2rem;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  background-color: #ffffff;
  color: #2c3e50;
}

.button-container button:hover {
  background-color: #ffffff;
}
</style>
