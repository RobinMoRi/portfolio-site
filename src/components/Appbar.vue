<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import Menu from "primevue/menu";
import { usePrimeVue } from "primevue/config";
import { inject, onMounted, onUnmounted, ref } from "vue";
import { GlobalState } from "@/types";
import { useBreakpoints, breakpointsPrimeFlex, useStorage } from "@vueuse/core";

const PrimeVue = usePrimeVue();

// const currentTheme = ref<"dark" | "light">("dark");
const currentTheme = useStorage("theme", "dark");

const menu = ref();
const items = ref([
  {
    label: "Sections",
    items: [
      {
        label: "About Me",
        icon: "pi pi-user",
        id: "about-me",
        command: () => scrollToDivWithOffset("about-me"),
      },
      {
        label: "Skills",
        icon: "pi pi-code",
        id: "skills",
        command: () => scrollToDivWithOffset("skills"),
      },
      {
        label: "Resume",
        icon: "pi pi-file",
        id: "resume",
        command: () => scrollToDivWithOffset("resume"),
      },
      {
        label: "Side Projects",
        icon: "pi pi-briefcase",
        id: "side-projects",
        command: () => scrollToDivWithOffset("side-projects"),
      },
      {
        label: "Portfolio",
        icon: "pi pi-folder-open",
        id: "portfolio",
        command: () => scrollToDivWithOffset("portfolio"),
      },
      {
        label: "Contacts",
        icon: "pi pi-id-card",
        id: "contacts",
        command: () => scrollToDivWithOffset("contacts"),
      },
    ],
  },
]);

const toggle = (event: MouseEvent) => {
  menu.value.toggle(event);
};

const globalState = inject("globalState") as GlobalState;
let breakpoints = useBreakpoints(breakpointsPrimeFlex);

function scrollToDivWithOffset(id: string) {
  const element = document.getElementById(id);
  const offset = globalState.appbar.height;
  if (element) {
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  } else {
    console.error("Element with ID " + id + " not found.");
  }
}

function updateAppbarDimensions() {
  const appbarElement = document.getElementById("appbar");
  if (appbarElement) {
    globalState.appbar.height = appbarElement.offsetHeight;
    globalState.appbar.width = appbarElement.offsetWidth;
  }
}

function toggleTheme() {
  const switchToTheme = currentTheme.value === "dark" ? "light" : "dark";
  console.debug(`Switching from ${currentTheme.value} to ${switchToTheme}`);
  PrimeVue.changeTheme(
    `aura-${currentTheme.value}-indigo`,
    `aura-${switchToTheme}-indigo`,
    "theme-link",
    () => {
      currentTheme.value = currentTheme.value === "dark" ? "light" : "dark";
    }
  );
}

function setTheme() {
  /**
   * Set theme to light if local-storage says so (default is dark)
   */
  if (currentTheme.value === "dark") return;
  PrimeVue.changeTheme(
    `aura-dark-indigo`,
    `aura-light-indigo`,
    "theme-link",
    () => {
      currentTheme.value = "light";
    }
  );
}

onMounted(() => {
  updateAppbarDimensions();
  setTheme();
  window.addEventListener("resize", updateAppbarDimensions);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateAppbarDimensions);
});
</script>

<template>
  <div class="sticky-toolbar" id="appbar">
    <Toolbar>
      <template #start>
        <a
          @click="scrollToDivWithOffset('intro-section')"
          :style="{ cursor: 'pointer' }"
        >
          <Avatar class="mr-2" size="normal" shape="circle" image="robin.svg" />
        </a>
      </template>
      <template #end class="justify-content-end">
        <Button
          v-tooltip.bottom="{ value: 'Toggle Theme', autoHide: false }"
          @click="toggleTheme()"
          class="mr-2"
          icon="pi pi-palette"
          size="small"
          severity="secondary"
          outlined
        />
        <div class="flex" v-if="breakpoints.isGreater('md')">
          <Button
            v-for="item in items[0].items"
            v-tooltip.bottom="{ value: item.label, autoHide: false }"
            text
            @click="scrollToDivWithOffset(item.id)"
            class="mr-2"
            :icon="item.icon"
            size="small"
            outlined
          />
        </div>
        <div v-else class="flex align-items-center justify-content-end">
          <Button
            type="button"
            icon="pi pi-ellipsis-v"
            outlined
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_menu"
          />
          <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
        </div>
      </template>
    </Toolbar>
  </div>
</template>

<style>
.sticky-toolbar {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 1000; /* Adjust as needed to ensure the toolbar is above other content */
}
</style>
