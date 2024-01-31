<script setup lang="ts">
import Appbar from "@/components/Appbar.vue";
import IntroSection from "@/components/IntroSection.vue";
import Contacts from "@/components/Contacts.vue";
import AboutMe from "@/components/AboutMe.vue";
import Skills from "@/components/Skills.vue";
import Resume from "@/components/Resume.vue";
import Toast from "primevue/toast";
</script>

<template>
  <Toast position="bottom-left" group="bl" />
  <Appbar ref="appbarRef" />
  <main class="flex flex-column align-items-center">
    <IntroSection />
    <AboutMe />
    <Skills />
    <Resume />
  </main>
  <Contacts />
</template>

<style>
@font-face {
  font-family: "Inter";
  src: url("@/assets/fonts/Inter/static/Inter-ExtraLight.ttf");
}
</style>
