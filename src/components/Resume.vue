<script setup lang="ts">
import Timeline from "primevue/timeline";
import Card from "primevue/card";
import FlipCard from "@/components/FlipCard.vue";
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
    school: "KTH (Royal Institute of Technology)",
    title: "M.Sc. in Mechatronics and Robotics Engineering",
    description: [
      "Degree program covering subjects such as mathematics, mechanics, electronics and programming.\nExchange student at Universidad de Chile, Santiago de Chile (2015).",
      "Bachelor Thesis: Heat following robot - degree project in Mechatronics.",
    ],
    start: "Aug. 2016",
    end: "Jun. 2018",
    icon: "pi pi-shopping-cart",
  },
  {
    school: "KTH (Royal Institute of Technology)",
    title: "B.Sc. in Mechanical Engineering",
    description: "B.Sc. in Mechanical Engineering",
    start: "Aug. 2013",
    end: "Jun. 2016",
    icon: "pi pi-cog",
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
            <div class="mb-3">
              <FlipCard>
                <template #front>
                  <Card class="h-full">
                    <template #subtitle>{{ slotProps.item.school }}</template>
                    <template #content>{{ slotProps.item.title }}</template>
                  </Card>
                </template>
                <template #back>
                  <Card class="h-full">
                    <template #content>
                      <div class="p-card-content">
                        <li v-for="item in slotProps.item.description">
                          {{ item }}
                        </li>
                      </div>
                    </template>
                  </Card>
                </template>
              </FlipCard>
            </div>
          </template>
        </Timeline>
      </div>
      <div class="card col-12 md:col-6">
        <div class="my-4">Work Experience</div>
        <Timeline :value="workExperience">
          <template #content="slotProps">
            <small class="p-text-secondary">{{ slotProps.item.date }}</small>
          </template>
          <template #opposite="slotProps">
            <div class="mb-3">
              <FlipCard>
                <template #front>
                  <Card class="h-full">
                    <template #subtitle>{{ slotProps.item.school }}</template>
                    <template #content>{{ slotProps.item.title }}</template>
                  </Card>
                </template>
                <template #back>
                  <Card class="h-full">
                    <template #content>{{ slotProps.item.item }}</template>
                  </Card>
                </template>
              </FlipCard>
            </div>
          </template>
        </Timeline>
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
.image {
  clip-path: circle();
}
.p-card-content {
  font-size: 12px;
}
</style>
