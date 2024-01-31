<script setup lang="ts">
import Image from "primevue/image";
import Button from "primevue/button";

function scrollToSection(id: string) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}
</script>

<template>
  <div
    id="intro-section"
    class="flex flex-column align-items-center justify-content-center flex-wrap p-4 w-screen section-container"
  >
    <div class="background-container w-full">
      <div
        class="background-image w-full flex flex-column align-items-center justify-content-center"
      ></div>
      <div
        id="title-group"
        class="flex flex-column align-items-center justify-content-center"
      >
        <p class="name-title my-2">ROBIN MORENO RINDING</p>
        <p class="p-text-secondary">
          Fullstack Developer | Tech Enthusiast | Lifelong Learner
        </p>
        <div class="image mt-2">
          <Image src="/robin.png" width="250" />
        </div>
      </div>
      <div class="w-full flex justify-content-center">
        <Button
          @click="scrollToSection('about-me')"
          icon="pi pi-chevron-down"
          size="small"
          class="my-4"
          outlined
          rounded
        />
      </div>
    </div>
  </div>
</template>

<style>
.name-title {
  font-family: "Inter";
  letter-spacing: 2px;
  font-size: 64px;
}
.image {
  clip-path: circle();
}

.background-container {
  position: relative;
}
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("/code.png");
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.5; /* Adjust the opacity as needed */
  z-index: -1;
}
.section-container {
  background: rgb(129, 140, 248);
  background: linear-gradient(
    62deg,
    rgba(129, 140, 248, 0.14471726190476186) 0%,
    rgba(0, 0, 0, 0.09989933473389356) 75%
  );
}
</style>
