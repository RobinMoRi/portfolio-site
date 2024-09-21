<script setup lang="ts">
import Card from "primevue/card";
import Image from "@/components/Image.vue";
</script>

<template>
  <div id="side-projects" class="w-screen p-4 surface-50">
    <div id="title-group" class="grid">
      <p class="col-12 name-title my-2">Side Projects</p>
      <div class="col-12 md:col-4">
        <Card style="overflow: hidden">
          <template #header>
            <Image
              :links="[
                'https://gitlab.com/gobuddy1/gobuddy/',
                'https://gitlab.com/gobuddy1/gobuddy-native/',
              ]"
            >
              <template #image>
                <img src="/gobuddy.png" height="200px" />
              </template>
            </Image>
          </template>
          <template #title>Gobuddy - location based gaming</template>
          <template #subtitle>Nov. 2020 - Aug. 2021</template>
          <template #content>
            <div class="flex flex-column gap-2">
              <div class="text-400 text-xs">
                From Nov 2020 to Aug 2021, at an Antler startup, I developed an
                MVP to enhance employee well-being, using React, Typescript, and
                Mapbox. I also created a backend with Node.js, Express, MongoDB,
                and real-time features via Socket.IO, including an admin
                interface for quizzes and a map-based gameplay interface.
              </div>
            </div>
          </template>
        </Card>
      </div>
      <div class="col-12 md:col-4">
        <Card style="overflow: hidden">
          <template #header>
            <Image :links="['https://sverigesradio.se/artikel/6841422']">
              <template #image>
                <img
                  src="https://static-cdn.sr.se/images/406/dea90595-d029-4cdd-a213-ff393ba1d895.jpg?preset=1024x576&format=webp"
                  height="200px"
                />
              </template>
            </Image>
          </template>
          <template #title>Fire Inspector UAV</template>
          <template #subtitle>Jan. 2017 - Dec. 2017</template>
          <template #content
            ><div class="flex flex-column gap-2">
              <div class="text-400 text-xs">
                From Jan. 2017 to December 2017, I worked on a UAV project at
                KTH aimed at assisting firefighters. This drone, designed to
                endure high temperatures and equipped with advanced sensors for
                indoor navigation, was part of our course in advanced
                mechatronics. Our efforts led to me being interviewed by
                Sveriges Radio, highlighting the project's innovative approach
                to improving firefighting strategies.
              </div>
            </div></template
          >
        </Card>
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
