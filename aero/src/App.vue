<script setup>
import HeaderSection from './components/HeaderSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <div id="estrutura-aplicacao">
    <HeaderSection />
    <main id="conteudo-principal">
      <router-view />
    </main>
    <FooterSection />
  </div>
</template>