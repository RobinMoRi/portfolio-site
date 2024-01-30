<script setup lang="ts">
import Appbar from './components/Appbar.vue';
import IntroSection from './components/IntroSection.vue';
import Contacts from './components/Contacts.vue';
import Toast from 'primevue/toast';

</script>

<template>
  <Toast position="bottom-left" group="bl" />
    <Appbar />
    <IntroSection />
    <Contacts />
  
</template>

<style>
@font-face {
    font-family: "Inter";
    src: url('@/assets/fonts/Inter/static/Inter-ExtraLight.ttf');
}
</style>