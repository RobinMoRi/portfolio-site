<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import Avatar from "primevue/avatar";

function scrollToSection(id: string) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}
</script>

<template>
  <div class="sticky-toolbar">
    <Toolbar>
      <template #start>
        <Avatar class="mr-2" size="normal" shape="circle" image="robin.png" />
      </template>
      <template #end>
        <Button
          v-tooltip.bottom="{ value: 'About Me', autoHide: false }"
          text
          @click="scrollToSection('about-me')"
          class="mr-2"
          icon="pi pi-user"
          size="small"
          outlined
        />
        <Button
          v-tooltip.bottom="{ value: 'Skills', autoHide: false }"
          text
          @click="scrollToSection('skills')"
          class="mr-2"
          icon="pi pi-code"
          size="small"
          outlined
        />
        <Button
          v-tooltip.bottom="{ value: 'Resume', autoHide: false }"
          text
          @click="scrollToSection('resume')"
          class="mr-2"
          icon="pi pi-file"
          size="small"
          outlined
        />
        <Button
          v-tooltip.bottom="{ value: 'Portfolio', autoHide: false }"
          text
          @click="scrollToSection('intro-section')"
          class="mr-2"
          icon="pi pi-folder-open"
          size="small"
          outlined
        />
        <Button
          v-tooltip.bottom="{ value: 'Contacts', autoHide: false }"
          @click="scrollToSection('contacts')"
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
