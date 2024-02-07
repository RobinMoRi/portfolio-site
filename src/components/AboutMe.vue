<script setup lang="ts">
import Image from "primevue/image";
</script>

<template>
  <div id="about-me" class="w-screen p-4 surface-0">
    <div id="title-group" class="grid">
      <p class="col-12 name-title my-2">About Me</p>
      <div class="col-12 md:col-8">
        <p class="p-text-secondary">
          With a master's degree in mechatronics and robotics from the Royal
          Institute of Technology, I come most recently from Morpheus Tribe,
          where I work as a fullstack developer.
        </p>
        <p class="p-text-secondary">
          I have over 4 years of hands-on experience working with a diverse
          range of technologies, encompassing web development, business process
          automation, data analytics, and test development.
        </p>
        <p class="p-text-secondary">
          What truly sets me apart is my unwavering passion for fullstack
          development. I am not just content with my existing knowledge; I am
          always eager to learn more and delve deeper into this ever-evolving
          field.
        </p>
        <p class="p-text-secondary">
          Outside of my professional life, I find great joy in running,
          especially over long distances. In addition to this, I have a deep
          love for hitting the gym, traveling and exploring everything related
          to food.
        </p>
      </div>
      <div
        class="mt-2 col-12 md:col-4 flex justify-content-end align-items-center"
      >
        <Image src="/robin2.svg" width="250" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.name-title {
  font-family: "Inter";
  letter-spacing: 2px;
  font-size: 54px;
}
</style>
