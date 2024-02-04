<script setup lang="ts">
import { inject, onMounted, onUnmounted } from "vue";
import { GlobalState } from "@/types";
import Appbar from "@/components/Appbar.vue";
import IntroSection from "@/components/IntroSection.vue";
import Contacts from "@/components/Contacts.vue";
import AboutMe from "@/components/AboutMe.vue";
import Skills from "@/components/Skills.vue";
import Resume from "@/components/Resume.vue";
import Toast from "primevue/toast";
import Portfolio from "./components/Portfolio.vue";
import SideProjects from "./components/SideProjects.vue";

const globalState = inject("globalState") as GlobalState;

function updateWindowSize() {
  globalState.window.height = window.innerHeight;
  globalState.window.width = window.innerWidth;
}

onMounted(() => {
  updateWindowSize();
  window.addEventListener("resize", updateWindowSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWindowSize);
});
</script>

<template>
  <Toast position="bottom-left" group="bl" />
  <Appbar ref="appbarRef" />
  <main class="flex flex-column align-items-center">
    <IntroSection />
    <AboutMe />
    <Skills />
    <Resume />
    <SideProjects />
    <Portfolio />
  </main>
  <Contacts />
</template>

<style>
@font-face {
  font-family: "Inter";
  src: url("@/assets/fonts/Inter/static/Inter-ExtraLight.ttf");
}
</style>
