<script setup>
import { ref, watch, nextTick, computed } from 'vue'
import translations from '../assets/translations.json'
import registeredCompanies from '../assets/registeredCompanies.json'; // Import the companies JSON
import SimpleKeyboard from './SimpleKeyboard.vue'

// Virtual keyboard logic
const input = ref('') // Tracks the current input value from the virtual keyboard

const onChange = (inputValue) => {
  input.value = inputValue // Update the virtual keyboard's input value
  if (step.value === 1) {
    fullName.value = inputValue // Sync with the fullName field
  } else if (step.value === 2) {
    companyName.value = inputValue // Sync with the companyName field

    // Debounce the filtering of companies
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      filterCompanies(inputValue);
    }, 1500); // 1.5 seconds debounce
  } else if (step.value === 3) {
    visitPurpose.value = inputValue // Sync with the visitPurpose field
  } else if (step.value === 4) {
    contactPerson.value = inputValue // Sync with the contactPerson field
  }
}

const filterCompanies = (query) => {
  if (!query) {
    filteredCompanies.value = [];
    buttonVisible.value = false; // Hide the button if no query
    return;
  }

  filteredCompanies.value = registeredCompanies.filter((company) =>
    company.name.toLowerCase().includes(query.toLowerCase())
  );

  // Show the button if no results are found
  buttonVisible.value = filteredCompanies.value.length === 0;
};

let selectCompany = (company) => {
  companyName.value = company.name; // Autofill the input field
  input.value = company.name; // Sync the virtual keyboard input
  filteredCompanies.value = []; // Clear the suggestions
  selectedCompany.value = company; // Mark the company as selected
  buttonVisible.value = true; // Show the button when a company is selected
};

const onKeyPress = (key) => {
  console.log('Key pressed:', key)
}

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
let filteredCompanies = ref([]); // Array to store filtered companies
const selectedCompany = ref(null); // Tracks the selected company
const buttonVisible = ref(false); // Tracks whether the button should be visible

const contactPersons = ['Marko Brljak', 'Dominik Domjanić', 'Leon Žganec']

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
    input.value = '' // Clear the virtual keyboard input when moving to the next step
  } else {
    handleSignUp()
  }
}

const handleSignUp = () => {
  console.log('Full Name:', fullName.value)
  console.log('Company Name:', companyName.value)
  console.log('Visit Purpose:', visitPurpose.value)
  console.log('Contact Person:', contactPerson.value)
  console.log('GDPR Agreement:', gdprAgreement.value)
  console.log('PIN Code:', pinCode.value)
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
  pinCode.value = Math.floor(10000 + Math.random() * 90000).toString()
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

// Computed property to determine if the button should be shown
const showButton = computed(() => {
  return filteredCompanies.value.length === 0 || selectedCompany.value !== null;
});
</script>

<template>
  <div class="signup-container">
    <form @submit.prevent="nextStep">
      <div v-if="step === 1" class="form-group">
        <label class="input-label" for="fullName">{{ t.fullName }}</label>
        <div class="input-button-row">
          <input type="text" id="fullName" v-model="fullName" ref="fullNameInput" required />
          <button class="confirm-button" type="submit">{{ step < 6 ? t.next : t.finish }}</button>
        </div>
        <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="input" :lang="lang" />
      </div>
      <div v-if="step === 2" class="form-group">
        <label class="input-label" for="companyName">{{ t.companyName }}</label>
        <input type="text" id="companyName" v-model="companyName" ref="companyNameInput" readonly required />
        <div class="company-suggestions" v-if="filteredCompanies.length">
          <div class="company-card" v-for="company in filteredCompanies" :key="company.id"
            @click="selectCompany(company)">
            {{ company.name }}
          </div>
        </div>
        <button class="confirm-button" type="submit" v-if="showButton">{{ step < 6 ? t.next : t.finish }}</button>
            <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="input" :lang="lang" />
      </div>
      <div v-if="step === 3" class="form-group">
        <label class="input-label" for="visitPurpose">{{ t.visitPurpose }}</label>
        <input type="text" id="visitPurpose" v-model="visitPurpose" ref="visitPurposeInput" readonly required />
        <button class="confirm-button" type="submit">{{ step < 6 ? t.next : t.finish }}</button>
            <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="input" :lang="lang" />
      </div>
      <div v-if="step === 4" class="form-group">
        <label class="input-label" for="contactPerson">{{ t.contactPerson }}</label>
        <input type="text" id="contactPerson" v-model="contactPerson" ref="contactPersonInput" readonly required />
        <button class="confirm-button" type="submit">{{ step < 6 ? t.next : t.finish }}</button>
            <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="input" :lang="lang" />
            <ul class="dropdown" v-if="filteredContactPersons.length">
              <li v-for="person in filteredContactPersons" :key="person" @click="contactPerson = person">{{ person }}
              </li>
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
        <p><strong>{{ t.fullName }}:</strong> {{ fullName }}</p>
        <p><strong>{{ t.companyName }}:</strong> {{ companyName }}</p>
        <p><strong>{{ t.visitPurpose }}:</strong> {{ visitPurpose }}</p>
        <p><strong>{{ t.contactPerson }}:</strong> {{ contactPerson }}</p>
        <p><strong>{{ t.summaryPinCode }}</strong> {{ pinCode }}</p>
        <p>{{ t.badgePrinting }}</p>
      </div>
      <!-- <button type="submit">{{ step < 6 ? t.next : t.finish }}</button> -->
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
  padding: 1em;
  background-color: #2c3e50;
  border-radius: 10px;
  width: 100%;
  /* max-width: 1000px; */
  margin: -2rem auto;
}

.confirm-button {
  padding: 1.5rem 1.5rem;
  font-size: 1.2rem;
  color: #2c3e50;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  width: 15%;
}

.signup-container h1 {
  font-size: 2.4rem;
  margin-bottom: 1.5rem;
  color: white;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  width: 50rem;
}

.form-group .input-label {
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 0.1rem;
  color: white;
}

.form-group label {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: white;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 1rem;
  font-size: 2.5em;
  font-weight: bold;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 90%;
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
  color: #2c3e50;
}

li:hover {
  background-color: #ddd;
}

button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  color: #2c3e50;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
}

/*   */

.gdpr-agreement {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 1rem;
}

.simple-keyboard {
  position: fixed;
  bottom: 5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 35%;
  background-color: #2c3e50;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

::v-deep(.hg-button) {
  background-color: #ffffff;
  color: #2c3e50;
  font-size: 2rem;
  border: none;
  border-radius: 5px;
  padding: 1.75rem 1.5rem;
  margin: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

/* nepotrebno jer se za sad aplikacija planira koristiti samo na tabletu */
::v-deep(.hg-button:hover) {
  background-color: #2c3e50;
  color: #ffffff;
}

::v-deep(.hg-button-active) {
  background-color: #ffffff !important;
  color: #2c3e50 !important;
  transition: none;
}

.company-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 5px;
  max-height: 15em;
  max-width: 90em;
  overflow-y: auto;
}

.company-card {
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
}

.company-card:hover {
  background-color: #2c3e50;
  color: #ffffff;
}

.input-button-row {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  /* Align input and button vertically */
  gap: 1rem;
  /* Add space between the input and button */
  width: 100%;
  /* Ensure the row takes up the full width */
}

.input-button-row input {
  flex: 1;
  /* Make the input take up the remaining space */
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: black;
}

.confirm-button {
  flex-shrink: 0;
  /* Prevent the button from shrinking */
  padding: 1rem 2rem;
  font-size: 1.2rem;
  color: #2c3e50;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.confirm-button:hover {
  background-color: #ddd;
}
</style>