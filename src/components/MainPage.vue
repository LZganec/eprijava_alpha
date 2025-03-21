<script setup>
import { ref, computed } from 'vue'
import translations from '../assets/translations.json'
import SignUp from './SignUp.vue'
import LogIn from './LogIn.vue'
import LogOut from './LogOut.vue'
// import SimpleKeyboard from './SimpleKeyboard.vue'

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

const currentView = ref(0) // 0: buttons, 1: SignUp, 2: LogIn, 3: LogOut

const buttonLabels = computed(() => {
  return translations[props.lang] || translations['en']
})

const viewTitles = computed(() => {
  return {
    0: props.msg,
    1: buttonLabels.value.signUp,
    2: buttonLabels.value.signIn,
    3: buttonLabels.value.logOut
  }
})

const showView = (view) => {
  currentView.value = view
}

// Virtual keyboard logic
// const input = ref('')

// const onInputChange = (event) => {
//   input.value = event.target.value
// }

// const onChange = (inputValue) => {
//   input.value = inputValue
//   console.log('Input changed:', inputValue)
// }

// const onKeyPress = (key) => {
//   console.log('Key pressed:', key)
// }
</script>

<template>
  <div class="greetings">
    <h1 class="blue">{{ viewTitles[currentView] }}</h1>
    <div class="button-container" v-if="currentView === 0">
      <button @click="showView(1)">{{ buttonLabels.signUp }}</button>
      <button @click="showView(2)">{{ buttonLabels.signIn }}</button>
      <button @click="showView(3)">{{ buttonLabels.logOut }}</button>
    </div>
    <SignUp v-else-if="currentView === 1" :lang="lang" />
    <LogIn v-else-if="currentView === 2" />
    <LogOut v-else-if="currentView === 3" />
  </div>
  <div id="app">
    <!-- <input :value="input" class="input" @input="onInputChange" placeholder="Tap on the virtual keyboard to start" />
    <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="input" /> -->
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
  color: white;
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
  gap: 7.5rem;
  margin-top: 7rem;
}

.button-container button {
  padding: 2rem 2rem;
  font-size: 2rem;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  background-color: #ffffff;
  color: #2c3e50;
  width: 25rem;
}

.button-container button:hover {
  background-color: #ffffff;
}

.simple-keyboard {
  max-width: 850px;
}
</style>
