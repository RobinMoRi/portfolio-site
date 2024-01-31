<script setup lang="ts">
import Timeline from "primevue/timeline";
import Card from "primevue/card";
import { ref } from "vue";

const workExperience = ref([
  {
    status: "Ordered",
    date: "15/10/2020 10:30",
    icon: "pi pi-shopping-cart",
    color: "#9C27B0",
  },
  {
    status: "Processing",
    date: "15/10/2020 14:00",
    icon: "pi pi-cog",
    color: "#673AB7",
  },
  {
    status: "Shipped",
    date: "15/10/2020 16:15",
    icon: "pi pi-shopping-cart",
    color: "#FF9800",
  },
  {
    status: "Delivered",
    date: "16/10/2020 10:00",
    icon: "pi pi-check",
    color: "#607D8B",
  },
]);

const education = ref([
  {
    status: "Ordered",
    start: "15/10/2020 10:30",
    end: "15/10/2020 10:30",
    icon: "pi pi-shopping-cart",
    color: "#9C27B0",
  },
  {
    status: "Processing",
    start: "15/10/2020 14:00",
    end: "15/10/2020 14:00",
    icon: "pi pi-cog",
    color: "#673AB7",
  },
]);
</script>

<template>
  <div id="skills" class="w-screen p-4">
    <div id="title-group col-12">
      <p class="name-title my-2">Resume</p>
    </div>
    <div class="grid mt-2">
      <div class="card col-12 md:col-6">
        <div class="my-4">Education</div>
        <Timeline :value="education">
          <template #opposite="slotProps">
            <small class="p-text-secondary"
              >{{ slotProps.item.start }} - {{ slotProps.item.end }}</small
            >
          </template>

          <template #content="slotProps">
            <Card class="mb-3">
              <template #title>Företagsnamn</template>
              <template #subtitle>Roll</template>
            </Card>
          </template>
        </Timeline>
      </div>
      <div class="card col-12 md:col-6">
        <div class="my-4">Work Experience</div>
        <Timeline :value="workExperience">
          <template #opposite="slotProps">
            <small class="p-text-secondary">{{ slotProps.item.date }}</small>
          </template>
          <template #content="slotProps">
            {{ slotProps.item.status }}
          </template>
        </Timeline>
      </div>
    </div>
  </div>
</template>

<style>
.name-title {
  font-family: "Inter";
  letter-spacing: 2px;
  font-size: 54px;
}
.image {
  clip-path: circle();
}
</style>
