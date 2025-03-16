<script setup>
import { ref, watch, nextTick } from 'vue'

const step = ref(1)
const fullName = ref('')
const companyName = ref('')
const visitPurpose = ref('')
const contactPerson = ref('')
const gdprAgreement = ref(false)
const pinCode = ref('')
const filteredContactPersons = ref([])

const contactPersons = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown']

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
</script>

<template>
  <div class="signup-container">
    <!-- <h1>Sign Up</h1> -->
    <form @submit.prevent="nextStep">
      <div v-if="step === 1" class="form-group">
        <label for="fullName">Full Name</label>
        <input type="text" id="fullName" v-model="fullName" ref="fullNameInput" required />
      </div>
      <div v-if="step === 2" class="form-group">
        <label for="companyName">Company Name</label>
        <input type="text" id="companyName" v-model="companyName" ref="companyNameInput" required />
      </div>
      <div v-if="step === 3" class="form-group">
        <label for="visitPurpose">Purpose of Visit</label>
        <input type="text" id="visitPurpose" v-model="visitPurpose" ref="visitPurposeInput" required />
      </div>
      <div v-if="step === 4" class="form-group">
        <label for="contactPerson">Contact Person</label>
        <input type="text" id="contactPerson" v-model="contactPerson" ref="contactPersonInput" required />
        <ul class="dropdown" v-if="filteredContactPersons.length">
          <li v-for="person in filteredContactPersons" :key="person" @click="contactPerson = person">{{ person }}</li>
        </ul>
      </div>
      <div v-if="step === 5" class="form-group">
        <label for="gdprAgreement">GDPR Agreement</label>
        <textarea id="gdprAgreement" readonly>
          Sample GDPR rules: 
          1. Your data will be stored securely.
          2. Your data will not be shared with third parties.
          3. You have the right to access and delete your data.
        </textarea>
        <div>
          <input type="checkbox" id="gdprAgreementCheckbox" v-model="gdprAgreement" ref="gdprAgreementInput" required />
          <label for="gdprAgreementCheckbox">I agree to the GDPR rules</label>
        </div>
      </div>
      <div v-if="step === 6" class="form-group summary">
        <h2>Summary</h2>
        <p><strong>Full Name:</strong> {{ fullName }}</p>
        <p><strong>Company Name:</strong> {{ companyName }}</p>
        <p><strong>Purpose of Visit:</strong> {{ visitPurpose }}</p>
        <p><strong>Contact Person:</strong> {{ contactPerson }}</p>
        <p><strong>PIN Code:</strong> {{ pinCode }}</p>
        <p>Your badge is being printed...</p>
      </div>
      <button type="submit">{{ step < 6 ? 'Next' : 'Finish' }}</button>
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
  background-color: #2c3e50; /* Same background color as the main page */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px; /* Increase the max-width for wider fields */
  margin: 2rem auto;
}

.signup-container h1 {
  font-size: 2.4rem;
  margin-bottom: 1.5rem;
  color: white; /* Ensure the text color is visible on the dark background */
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
}

.form-group label {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: white; /* Ensure the label color is visible on the dark background */
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%; /* Make the input fields take up the full width */
  color: black; /* Set the text color inside the fill-in fields to black */
}

textarea {
  height: 600px; /* Increase the height of the GDPR agreement textarea */
  width: 500px;
}

.summary {
  padding: 2rem; /* Increase padding for the summary section */
  background-color: #1a252f;
  border-radius: 10px;
  color: white;
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
  color: black; /* Set the text color inside the dropdown list to black */
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
</style>