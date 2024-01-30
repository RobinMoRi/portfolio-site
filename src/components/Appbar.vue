<script setup lang="ts">
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';

function scrollToSection(id: string) {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
}
</script>

<template>
    <div class="sticky-toolbar">
  <Toolbar >
    <template #start>
        <Avatar class="mr-2" size="medium" shape="circle" image="robin.png" />
    </template>
    <template #end>
        <Button label="About Me" text @click="scrollToSection('intro-section')" class="mr-2" size="small"/>
        <Button label="Skills" text @click="scrollToSection('intro-section')" class="mr-2" size="small"/>
        <Button label="CV" text @click="scrollToSection('intro-section')" class="mr-2" size="small"/>
        <Button label="Portfolio" text @click="scrollToSection('intro-section')" class="mr-2" size="small"/>
        <Button label="Contacts" outlined @click="scrollToSection('contacts')" class="mr-2" size="small"/>
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