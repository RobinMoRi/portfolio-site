<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import Avatar from "primevue/avatar";

function scrollToDivWithOffset(id: string) {
  const element = document.getElementById(id);
  const offset = getNavbarHeight();
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

function getNavbarHeight() {
  const navbar = document.getElementById("appbar");
  if (navbar) {
    return navbar.offsetHeight;
  } else {
    console.error("Navbar not found.");
    return 0;
  }
}
</script>

<template>
  <div class="sticky-toolbar" id="appbar">
    <Toolbar>
      <template #start>
        <Avatar class="mr-2" size="normal" shape="circle" image="robin.png" />
      </template>
      <template #end>
        <Button
          v-tooltip.bottom="{ value: 'About Me', autoHide: false }"
          text
          @click="scrollToDivWithOffset('about-me')"
          class="mr-2"
          icon="pi pi-user"
          size="small"
          outlined
        />
        <Button
          v-tooltip.bottom="{ value: 'Skills', autoHide: false }"
          text
          @click="scrollToDivWithOffset('skills')"
          class="mr-2"
          icon="pi pi-code"
          size="small"
          outlined
        />
        <Button
          v-tooltip.bottom="{ value: 'Resume', autoHide: false }"
          text
          @click="scrollToDivWithOffset('resume')"
          class="mr-2"
          icon="pi pi-file"
          size="small"
          outlined
        />
        <Button
          v-tooltip.bottom="{ value: 'Portfolio', autoHide: false }"
          text
          @click="scrollToDivWithOffset('portfolio')"
          class="mr-2"
          icon="pi pi-folder-open"
          size="small"
          outlined
        />
        <Button
          v-tooltip.bottom="{ value: 'Contacts', autoHide: false }"
          @click="scrollToDivWithOffset('contacts')"
          class="mr-2"
          icon="pi pi-id-card"
          size="small"
        />
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
