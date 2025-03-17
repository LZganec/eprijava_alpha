<script setup>
import { ref, watch, nextTick, computed } from 'vue'
import translations from '../assets/translations.json'
import registeredUsers from '../assets/registeredUsers.json'

const props = defineProps({
  lang: {
    type: String,
    required: true,
  },
})

const step = ref(1)
const fullName = ref('')
const companyName = ref('')
const visitPurpose = ref('')
const contactPerson = ref('')
const gdprAgreement = ref(false)
const pinCode = ref('')
const filteredContactPersons = ref([])

const contactPersons = ['Mike Hawk', 'Hugh Janus', 'Mike Oxmall', 'Munchma Kootchie']

const fullNameInput = ref(null)
const companyNameInput = ref(null)
const visitPurposeInput = ref(null)
const contactPersonInput = ref(null)
const gdprAgreementInput = ref(null)

const nextStep = async () => {
  if (step.value < 6) {
    step.value++
    if (step.value === 6) {
      generatePinCode()
    }
    await nextTick()
    focusInput()
  } else {
    handleSignUp()
  }
}

const handleSignUp = () => {
  // Handle the sign-up logic here
  console.log('Full Name:', fullName.value)
  console.log('Company Name:', companyName.value)
  console.log('Visit Purpose:', visitPurpose.value)
  console.log('Contact Person:', contactPerson.value)
  console.log('GDPR Agreement:', gdprAgreement.value)
  console.log('PIN Code:', pinCode.value)

  // Save user data to registeredUsers.json
  const newUser = {
    fullName: fullName.value,
    companyName: companyName.value,
    visitPurpose: visitPurpose.value,
    contactPerson: contactPerson.value,
    gdprAgreement: gdprAgreement.value,
    pinCode: pinCode.value
  }

  // Add the new user to the registeredUsers array
  registeredUsers.push(newUser)

  // Save the updated registeredUsers array to the JSON file
  // const fs = require('fs')
  // fs.writeFileSync('../assets/registeredUsers.json', JSON.stringify(registeredUsers, null, 2))
}

const focusInput = () => {
  if (step.value === 1 && fullNameInput.value) {
    fullNameInput.value.focus()
  } else if (step.value === 2 && companyNameInput.value) {
    companyNameInput.value.focus()
  } else if (step.value === 3 && visitPurposeInput.value) {
    visitPurposeInput.value.focus()
  } else if (step.value === 4 && contactPersonInput.value) {
    contactPersonInput.value.focus()
  } else if (step.value === 5 && gdprAgreementInput.value) {
    gdprAgreementInput.value.focus()
  }
}

const generatePinCode = () => {
  pinCode.value = Math.floor(1000 + Math.random() * 9000).toString()
}

// Watch the contactPerson input and debounce the filtering
let debounceTimeout
watch(contactPerson, (newVal) => {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    filteredContactPersons.value = contactPersons.filter(person =>
      person.toLowerCase().includes(newVal.toLowerCase())
    )
  }, 300) // 300ms debounce
})

const t = computed(() => translations[props.lang] || translations['en'])
</script>

<template>
  <div class="signup-container">
    <form @submit.prevent="nextStep">
      <div v-if="step === 1" class="form-group">
        <label for="fullName">{{ t.fullName }}</label>
        <input type="text" id="fullName" v-model="fullName" ref="fullNameInput" required />
      </div>
      <div v-if="step === 2" class="form-group">
        <label for="companyName">{{ t.companyName }}</label>
        <input type="text" id="companyName" v-model="companyName" ref="companyNameInput" required />
      </div>
      <div v-if="step === 3" class="form-group">
        <label for="visitPurpose">{{ t.visitPurpose }}</label>
        <input type="text" id="visitPurpose" v-model="visitPurpose" ref="visitPurposeInput" required />
      </div>
      <div v-if="step === 4" class="form-group">
        <label for="contactPerson">{{ t.contactPerson }}</label>
        <input type="text" id="contactPerson" v-model="contactPerson" ref="contactPersonInput" required />
        <ul class="dropdown" v-if="filteredContactPersons.length">
          <li v-for="person in filteredContactPersons" :key="person" @click="contactPerson = person">{{ person }}</li>
        </ul>
      </div>
      <div v-if="step === 5" class="form-group">
        <label for="gdprAgreement">{{ t.gdprAgreement }}</label>
        <ul id="gdprAgreement">
          <li v-for="(point, index) in t.gdprPoints" :key="index">{{ point }}</li>
        </ul>
        <div class="gdpr-agreement">
          <input type="checkbox" id="gdprAgreementCheckbox" v-model="gdprAgreement" ref="gdprAgreementInput" required />
          <label for="gdprAgreementCheckbox">{{ t.agreeToGdpr }}</label>
        </div>
      </div>
      <div v-if="step === 6" class="form-group summary">
        <h2>{{ t.summary }}</h2>
        <p><strong>{{ t.fullName }}</strong> {{ fullName }}</p>
        <p><strong>{{ t.companyName }}</strong> {{ companyName }}</p>
        <p><strong>{{ t.visitPurpose }}</strong> {{ visitPurpose }}</p>
        <p><strong>{{ t.contactPerson }}</strong> {{ contactPerson }}</p>
        <p><strong>{{ t.summaryPinCode }}</strong> {{ pinCode }}</p>
        <p>{{ t.badgePrinting }}</p>
      </div>
      <button type="submit">{{ step < 6 ? t.next : t.finish }}</button>
    </form>
  </div>
</template>

<style scoped>
.dropdown * {
  color: black;
}

.signup-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #2c3e50;
  border-radius: 10px;
  width: 100%;
  max-width: 1000px;
  margin: 2rem auto;
}

.signup-container h1 {
  font-size: 2.4rem;
  margin-bottom: 1.5rem;
  color: white;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 50rem;
}

.form-group label {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: white;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  color: black;
}

textarea {
  height: 450px;
  width: 100%;
}

.summary {
  padding: 2rem;
  background-color: #1a252f;
  border-radius: 10px;
  color: white;
  width: 30em;
  height: 20em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-height: 150px;
  overflow-y: auto;
}

li {
  padding: 0.5rem;
  cursor: pointer;
  color: black;
}

li:hover {
  background-color: #ddd;
}

button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  color: #fff;
  background-color: #2c3e50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover {
  background-color: #1a252f;
}

.gdpr-agreement {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 1rem;
}
</style>