<script setup>
  import { ref } from 'vue';
  
  const step = ref(1);
  const pinCode = ref('');

  const nextStep = () => {
    if (step.value < 2) {
      step.value++;
    } else {
      handleLogIn();
    }
  };

  // tu bude isla logika tipa ako korisnik unese pin od 4 broja,
  // onda se prikaže korak s korisnikovim podacima i da mu se printa badge
  // ako korisnik unese krivi pin, da mu se prikaže poruka da je krivo unio pin
  // i da mu se ponovno prikaže polje za unos pin-a
  // jedino ne znam dal bude kontakt osoba navek ista ili bumo dodali opciju 
  // potvrde ili ponovnog odabira kontakt osobe
  const handleLogIn = () => {
    // Handle the log-in logic here
    console.log('PIN Code:', pinCode.value);
  };

</script>

<template>
  <h1>Login</h1>
</template>
