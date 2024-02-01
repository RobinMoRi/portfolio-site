<script setup lang="ts">
import Timeline from "primevue/timeline";
import Card from "primevue/card";
import FlipCard from "@/components/FlipCard.vue";
import { ref } from "vue";
import Tag from "primevue/tag";

const workExperience = ref([
  {
    company: "Morpheus Tribe",
    title: "Fullstack Developer",
    description: [
      "Degree program covering subjects such as embedded systems, applied mathematics and artificial intelligence.",
      "Master Thesis: Comparative study of fault-tolerant strategies for cooperative adaptive cruise control: Subject to autonomous driving in platoon.",
    ],
    start: "Aug. 2016",
    end: "Jun. 2018",
    icon: "pi pi-shopping-cart",
    skills: [
      "Typescript",
      "Javscript",
      "React",
      "Esbuild",
      "Python",
      "Django/DRF",
      "Scikit-Learn",
      "PostgreSQL",
      "Docker",
      "Docker Compose",
      "Celery",
    ],
  },
  {
    company: "Capgemini",
    title: "Senior Applications Consultant",
    description: [
      "Degree program covering subjects such as mathematics, mechanics, electronics and programming.",
      "Exchange student at Universidad de Chile, Santiago de Chile (2015).",
      "Bachelor Thesis: Heat following robot - degree project in Mechatronics.",
    ],
    start: "Aug. 2013",
    end: "Jun. 2016",
    icon: "pi pi-cog",
    skills: ["javascript", "react", "typescript"],
  },
  {
    company: "KPMG",
    title: "Technical Associate",
    description: [
      "Degree program covering subjects such as embedded systems, applied mathematics and artificial intelligence.",
      "Master Thesis: Comparative study of fault-tolerant strategies for cooperative adaptive cruise control: Subject to autonomous driving in platoon.",
    ],
    start: "Aug. 2016",
    end: "Jun. 2018",
    icon: "pi pi-shopping-cart",
    skills: ["javascript", "react", "typescript"],
  },
  {
    company: "Alten",
    title: "Embedded Software Engineer",
    description: [
      "Degree program covering subjects such as mathematics, mechanics, electronics and programming.",
      "Exchange student at Universidad de Chile, Santiago de Chile (2015).",
      "Bachelor Thesis: Heat following robot - degree project in Mechatronics.",
    ],
    start: "Aug. 2013",
    end: "Jun. 2016",
    icon: "pi pi-cog",
    skills: ["javascript", "react", "typescript"],
  },
]);

const education = ref([
  {
    school: "KTH (Royal Institute of Technology)",
    title: "M.Sc. in Mechatronics and Robotics Engineering",
    description: [
      "Degree program covering subjects such as embedded systems, applied mathematics and artificial intelligence.",
      "Master Thesis: Comparative study of fault-tolerant strategies for cooperative adaptive cruise control: Subject to autonomous driving in platoon.",
    ],
    start: "Aug. 2016",
    end: "Jun. 2018",
    icon: "pi pi-shopping-cart",
  },
  {
    school: "KTH (Royal Institute of Technology)",
    title: "B.Sc. in Mechanical Engineering",
    description: [
      "Degree program covering subjects such as mathematics, mechanics, electronics and programming.",
      "Exchange student at Universidad de Chile, Santiago de Chile (2015).",
      "Bachelor Thesis: Heat following robot - degree project in Mechatronics.",
    ],
    start: "Aug. 2013",
    end: "Jun. 2016",
    icon: "pi pi-cog",
  },
]);
</script>

<template>
  <div id="resume" class="w-screen p-4 surface-0">
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
                  <Card class="h-full surface-100">
                    <template #subtitle>{{ slotProps.item.school }}</template>
                    <template #content>{{ slotProps.item.title }}</template>
                  </Card>
                </template>
                <template #back>
                  <Card class="h-full surface-100">
                    <template #content>
                      <div class="p-card-content">
                        <li
                          v-for="item in slotProps.item.description"
                          class="mb-2"
                        >
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
            <small class="p-text-secondary"
              >{{ slotProps.item.start }} - {{ slotProps.item.end }}</small
            >
          </template>
          <template #opposite="slotProps">
            <div class="mb-3">
              <FlipCard>
                <template #front>
                  <Card class="h-full surface-100">
                    <template #subtitle>{{ slotProps.item.company }}</template>
                    <template #content>{{ slotProps.item.title }}</template>
                    <template #footer>
                      <div
                        class="flex flex-wrap gap-1 mt-1 justify-content-center"
                      >
                        <Tag v-for="item in slotProps.item.skills" class="mb-2">
                          {{ item }}
                        </Tag>
                      </div>
                    </template>
                  </Card>
                </template>
                <template #back>
                  <Card class="h-full w-full surface-100">
                    <template #content>
                      <div class="p-card-content">
                        <li
                          v-for="item in slotProps.item.description"
                          class="mb-2"
                        >
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
  width: 100%;
  max-height: 150px;
  overflow-y: scroll;
  font-size: 12px;
  text-align: start;
}
</style>
