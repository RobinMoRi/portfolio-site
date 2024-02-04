<script setup lang="ts">
import Card from "primevue/card";
import Image from "primevue/image";
import Button from "primevue/button";
</script>

<template>
  <div id="side-projects" class="w-screen p-4 surface-50">
    <div id="title-group" class="grid">
      <p class="col-12 name-title my-2">Side Projects</p>
      <div class="col-12 md:col-6">
        <Card style="overflow: hidden">
          <template #header>
            <Image
              height="300"
              src="https://static-cdn.sr.se/images/406/dea90595-d029-4cdd-a213-ff393ba1d895.jpg?preset=1024x576&format=webp"
            />
          </template>
          <template #title>Fire inspector UAV</template>
          <template #content>Info about side project </template>
        </Card>
      </div>
      <div class="col-12 md:col-6">
        <Card style="overflow: hidden">
          <template #header>
            <div class="header-container">
              <div class="link-container">
                <Button icon="pi pi-link link-button" />
                <div class="image-container">
                  <img
                    height="200"
                    src="https://static-cdn.sr.se/images/406/dea90595-d029-4cdd-a213-ff393ba1d895.jpg?preset=1024x576&format=webp"
                  />
                </div>
              </div>
            </div>
          </template>
          <template #title>Gobuddy - location based gaming</template>
          <template #content>Info about side project </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  position: static;
}
.link-container {
  position: relative;
}
.link-button,
.image-container {
  position: absolute;
  top: 0;
  left: 0;
}
.name-title {
  font-family: "Inter";
  letter-spacing: 2px;
  font-size: 54px;
}
</style>
