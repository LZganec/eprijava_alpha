<script setup>
import { ref, nextTick, computed } from 'vue'
import translations from '../assets/translations.json' // import prijevoda
import registeredCompanies from '../assets/registeredCompanies.json'; // import registriranih tvrtki
import SimpleKeyboard from './SimpleKeyboard.vue' // import virtualne tipkovnice - vanjski library
import visitPurposes from '../assets/visitPurposes.json' // import namjene posjeta
import contacts from '../assets/contacts.json'; // import kontakt osoba

const input = ref('') // pratimo trenutnu vrijednost inputa

const onChange = (inputValue) => {

  input.value = inputValue // apdejta trenutnu vrijednost inputa

  if (step.value === 1) {
    fullName.value = inputValue // sinkronizira s poljem fullName

  } else if (step.value === 2) {
    companyName.value = inputValue // sinkronizira s poljem companyName

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      filterCompanies(inputValue);
    }, 1000);
  } else if (step.value === 3) {
    visitPurpose.value = inputValue // sinkronizira s poljem visitPurpose

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      filterVisitPurposes(inputValue);
    }, 1000);
  } else if (step.value === 4) {
    contactPerson.value = inputValue // sinkronizira s poljem contactPerson

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      filterContactPersons(inputValue);
    }, 1000);
  }
}

const filterCompanies = (query) => {
  if (!query) {
    filteredCompanies.value = [];
    return;
  }

  filteredCompanies.value = registeredCompanies.filter((company) =>
    company.name.toLowerCase().includes(query.toLowerCase())
  );

};

const filterVisitPurposes = (query) => {
  if (!query) {
    filteredVisitPurposes.value = [];
    return;
  }

  filteredVisitPurposes.value = visitPurposes.filter((purpose) =>
    purpose[props.lang].toLowerCase().includes(query.toLowerCase())
  );

};

const filterContactPersons = (query) => {
  if (!query) {
    filteredContactPersons.value = [];
    return;
  }

  filteredContactPersons.value = contacts.filter((contact) =>
    contact.fullName.toLowerCase().includes(query.toLowerCase())
  );
};

const selectVisitPurpose = (purpose) => {
  visitPurpose.value = purpose[props.lang] // automatski popuni odabranu namjenu posjeta
  input.value = purpose[props.lang] // sinkroniziraj s virtualnom tipkovnicom
  filteredVisitPurposes.value = [] // očisti filtrirane namjene posjeta
}

const selectCompany = (company) => {
  companyName.value = company.name; // automatski popuni za odabranu tvrtku
  input.value = company.name; // sinkroniziraj odabranu tvrtku s virtualnom tipkovnicom
  filteredCompanies.value = []; // očisti filtrirane tvrtke
  selectedCompany.value = company; // označi odabranu tvrtku
};

const selectedContactPerson = ref(null); // pohrani odabranu kontakt osobu kao objekt

const selectContactPerson = (person) => {
  contactPerson.value = person.fullName; // automatski popuni polje s punim imenom
  input.value = person.fullName; // sinkroniziraj s virtualnom tipkovnicom
  filteredContactPersons.value = []; // očisti prijedloge
  selectedContactPerson.value = person; // pohrani cijeli objekt kontakt osobe
};

const gdprText = computed(() => {
  return translations[props.lang]?.gdprPoints || translations['en'].gdprPoints; // povratak na engleski ako jezik nije pronađen
});

// funkcija za obradu pritiska tipke, služi za testiranje
const onKeyPress = (key) => {
  // console.log('Key pressed:', key)
}

const props = defineProps({
  lang: {
    type: String,
    required: true,
  },
  addUser: {
    type: Function,
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
const filteredCompanies = ref([]); // array za filtrirane tvrtke
const selectedCompany = ref(null); // trenutno odabrana tvrtka
const filteredVisitPurposes = ref([])
let debounceTimeout
const fullNameInput = ref(null)
const companyNameInput = ref(null)
const visitPurposeInput = ref(null)
const contactPersonInput = ref(null)
const gdprAgreementInput = ref(null)
const skipStepTwo = ref(false)

const nextStep = async () => {
  if (step.value < 6) {
    step.value++
    if (step.value === 2 && skipStepTwo.value === true) {
      step.value++
    }
    if (step.value === 6) {
      generatePinCode()
    }
    await nextTick()
    focusInput()
    input.value = '' // počisti input virtualne tipkovnice nakon svakog koraka
  } else {
    handleSignUp()
    if (additionalVisitorBool.value === true) {
      skipStepTwo.value = true
      step.value = 1
      additionalVisitorBool.value = false
    }
    else {
      step.value = 7
    }
  }
}

const stepBack = async () => {
  if (step.value > 1) {
    step.value--
    await nextTick()
    focusInput()
    input.value = '' // počisti input virtualne tipkovnice nakon svakog koraka
  }
}

let additionalVisitorBool = ref(false);
const setAdditionalVisitor = (bool) => {
  additionalVisitorBool.value = bool;
  console.log('Additional visitor:', additionalVisitorBool.value)
  nextStep();
}

const handleSignUp = () => {
  const newUser = {
    fullName: fullName.value,
    companyName: companyName.value,
    visitPurpose: visitPurpose.value,
    contactPerson: contactPerson.value,
    gdprAgreement: gdprAgreement.value,
    pinCode: pinCode.value,
  }

  // Add the new user to the list
  props.addUser(newUser)

  console.log('New user registered:', newUser)

  // Reset the form for the next user
  step.value = 1
  fullName.value = ''
  // companyName.value = ''
  visitPurpose.value = ''
  contactPerson.value = ''
  gdprAgreement.value = false
  pinCode.value = ''
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

const t = computed(() => translations[props.lang] || translations['en'])

</script>

<template>
  <div class="signup-container">
    <form @submit.prevent="nextStep">
      <!-- Step 1: Full Name -->
      <div v-if="step === 1" class="form-group">
        <label class="input-label" for="fullName">{{ t.fullName }}</label>
        <div class="input-button-row">
          <input type="text" id="fullName" v-model="fullName" ref="fullNameInput" readonly required />
          <button class="confirm-button" type="submit">{{ step < 6 ? t.next : t.finish }}</button>
        </div>
        <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="input" :lang="lang" />
      </div>

      <!-- Step 2: Company Name -->
      <div v-if="step === 2" class="form-group">
        <label class="input-label" for="companyName">{{ t.companyName }}</label>
        <div class="input-button-row">
          <button class="back-button" @click="stepBack">{{ t.back }}</button>
          <input type="text" id="companyName" v-model="companyName" ref="companyNameInput" readonly required />
          <button class="confirm-button" type="submit">{{ step < 6 ? t.next : t.finish }}</button>
        </div>
        <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="input" :lang="lang" />
        <div class="company-suggestions" v-if="filteredCompanies.length">
          <div class="company-card" v-for="company in filteredCompanies" :key="company.id"
            @click="selectCompany(company)">
            {{ company.name }}
          </div>
        </div>
      </div>

      <!-- Step 3: Purpose of Visit -->
      <div v-if="step === 3" class="form-group">
        <label class="input-label" for="visitPurpose">{{ t.visitPurpose }}</label>
        <div class="input-button-row">
          <button class="back-button" @click="stepBack">{{ t.back }}</button>
          <input type="text" id="visitPurpose" v-model="visitPurpose" ref="visitPurposeInput" readonly required />
          <button class="confirm-button" type="submit">{{ step < 6 ? t.next : t.finish }}</button>
        </div>
        <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="input" :lang="lang" />
        <div class="visit-purpose-suggestions" v-if="filteredVisitPurposes.length">
          <div class="visit-purpose-card" v-for="purpose in filteredVisitPurposes" :key="purpose.id"
            @click="selectVisitPurpose(purpose)">
            {{ purpose[props.lang] }}
          </div>
        </div>
      </div>

      <!-- Step 4: Contact Person -->
      <div v-if="step === 4" class="form-group">
        <label class="input-label" for="contactPerson">{{ t.contactPerson }}</label>
        <div class="input-button-row">
          <button class="back-button" @click="stepBack">{{ t.back }}</button>
          <input type="text" id="contactPerson" v-model="contactPerson" ref="contactPersonInput" readonly required />
          <button class="confirm-button" type="submit">
            {{ step < 6 ? t.next : t.finish }} </button>
        </div>
        <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="input" :lang="lang" />
        <div class="contact-person-suggestions" v-if="filteredContactPersons.length">
          <div class="contact-person-card" v-for="person in filteredContactPersons" :key="person.id"
            @click="selectContactPerson(person)">
            {{ person.fullName }}
          </div>
        </div>
      </div>

      <!-- Step 5: GDPR Agreement -->
      <div v-if="step === 5" class="form-group">
        <label for="gdprAgreement">{{ t.gdprAgreement }}</label>
        <ul id="gdprAgreement">
          <li v-for="(rule, index) in gdprText" :key="index">{{ rule }}</li>
        </ul>
        <div class="gdpr-agreement">
          <input type="checkbox" id="gdprAgreementCheckbox" v-model="gdprAgreement" ref="gdprAgreementInput" readonly
            required />
          <label id="gdprAgreementCheckboxNote">{{ t.agreeToGdpr }}</label>
        </div>
        <button class="confirm-button" type="submit">{{ step < 6 ? t.next : t.finish }}</button>
      </div>

      <!-- Step 6: Summary -->
      <div v-if="step === 6" class="form-group summary">
        <h2>{{ t.summary }}</h2>
        <p><strong>{{ t.fullName }}:</strong> {{ fullName }}</p>
        <p><strong>{{ t.companyName }}:</strong> {{ companyName }}</p>
        <p><strong>{{ t.visitPurpose }}:</strong> {{ visitPurpose }}</p>
        <p><strong>{{ t.contactPerson }}:</strong> {{ contactPerson }}</p>
        <p v-if="selectedContactPerson">
          <strong>Email:</strong> {{ selectedContactPerson.email }}
        </p>
        <p v-if="selectedContactPerson">
          <strong>Phone:</strong> {{ selectedContactPerson.phone }}
        </p>
        <p id="pince"><strong>{{ t.summaryPinCode }}</strong> {{ pinCode }}</p>
        <p>{{ t.badgePrinting }}</p>
      </div>
    </form>
    <div v-if="step === 6" class="additional-visitor-group">
      <h2>{{ t.additionalVisitor }}</h2>
      <p>{{ t.additionalVisitorPrompt }}</p>
      <div class="avg-buttons">
        <button @click="setAdditionalVisitor(true)">{{ t.yes }}</button>
        <button @click="nextStep">{{ t.no }}</button>
      </div>
    </div>
    <div v-if="step === 7" class="thank-you">
      <h2>{{ t.thankYou }}</h2>
      <p>{{ t.thankYouMessage }}</p>
    </div>
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
  margin: -2rem auto;
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
  width: 60rem;
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

#pince {
  font-weight: 900;
}

.form-group h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  margin-top: -0.75em;
  color: white;
}

textarea {
  height: 450px;
  width: 100%;
}

.summary {
  margin-top: 0;
  padding-top: 0;
  background-color: #1a252f;
  border-radius: 10px;
  color: white;
  width: 30em;
  height: 16em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
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

.gdpr-agreement {
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 5rem;
  width: 50em;
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
  margin-top: 0;
  background-color: #2c3e50;
  padding: 1rem;
  border-radius: 5px;
  max-height: 20em;
  max-width: 100%;
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
  align-items: end;
  gap: 1rem;
  width: 100%;
}

.input-button-row input {
  flex: 1;
  padding: 0.5rem;
  font-size: 2rem;
  font-weight: bold;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  color: black;
}

.confirm-button .back-button {
  flex-shrink: 0;
  padding: 0.9rem 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  background-color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 7em;
  min-width: 7em;
  max-width: 7em;
}

.confirm-button:hover {
  background-color: #ddd;
}

.visit-purpose-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0;
  background-color: #2c3e50;
  padding: 1rem;
  border-radius: 5px;
  max-height: 20em;
  max-width: 100%;
  overflow-y: auto;
}

.visit-purpose-card {
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

.visit-purpose-card:hover {
  background-color: #2c3e50;
  color: #ffffff;
}

.contact-person-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0;
  background-color: #2c3e50;
  padding: 1rem;
  border-radius: 5px;
  max-height: 20em;
  max-width: 100%;
  overflow-y: auto;
}

.contact-person-card {
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

.contact-person-card:hover {
  background-color: #2c3e50;
  color: #ffffff;
}

#gdprAgreement {
  list-style-type: none;
  padding: 0;
  margin: 1rem 0;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
}

#gdprAgreement li {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: #2c3e50;
}

#gdprAgreement {
  margin-top: 0;
  min-width: 69em;
  max-width: 100%;
  min-height: 30em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#gdprAgreement li {
  color: #2c3e50;
  font-weight: bold;
  font-size: 1.5em;
}

#gdprAgreementCheckbox {
  display: flex;
  align-items: center;
  height: 5rem;
}

#gdprAgreementCheckboxNote {
  font-size: 2rem;
  color: white;
  width: 200%;
  position: relative;
}

.additional-visitor-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  color: white;
}

.additional-visitor-group h2 {
  font-size: 2.5rem;
  margin-bottom: 0;
}

.additional-visitor-group p {
  font-size: 2rem;
  text-align: center;
}

.avg-buttons {
  display: flex;
  flex-direction: row;
  gap: 5em;
  margin-top: 1.5em;
}

.avg-buttons button {
  font-size: 3em;
  width: 5em;
  height: 2.5em;
}

.thank-you {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  color: white;
}

.thank-you h2 {
  font-size: 4rem;
  margin-bottom: 0;
}

.thank-you p {
  font-size: 3rem;
  text-align: center;
}
</style>