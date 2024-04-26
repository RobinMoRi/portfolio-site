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
import ChatBubble from "@/components/ChatBubble.vue";

const globalState = inject("globalState") as GlobalState;

function updateWindowSize() {
  globalState.window.height = window.innerHeight;
  globalState.window.width = window.innerWidth;
}

function getIpAddress() {
  fetch("https://api.ipify.org?format=json")
    .then((res) => res.json())
    .then(({ ip }) => {
      console.log(ip);
      localStorage.setItem("IP_ADDRESS", ip);
    });
}

function onScroll() {
  const scrollHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollY = Math.round(window.scrollY);
  const percentageScroll = Math.round(
    ((windowHeight + scrollY) / scrollHeight) * 100
  );

  globalState.scroll.scrollPositionPercentage =
    scrollY === 0 ? scrollY : percentageScroll;
  globalState.scroll.scrollY = scrollY;

  console.log({ perc: globalState.scroll.scrollPositionPercentage });
}

onMounted(() => {
  updateWindowSize();
  window.addEventListener("resize", updateWindowSize);
  window.addEventListener("scroll", onScroll);
  getIpAddress();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWindowSize);
  window.addEventListener("scroll", onScroll);
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
  <ChatBubble />
</template>

<style>
@font-face {
  font-family: "Inter";
  src: url("@/assets/fonts/Inter/static/Inter-ExtraLight.ttf");
}
</style>
