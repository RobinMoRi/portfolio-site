<script setup lang="ts">
import Card from "primevue/card";
import Tag from "primevue/tag";
import { ref } from "vue";

const techSkills = ref([
  { icon: "fa-brands fa-python", name: "Python" },
  { icon: "fa-brands fa-js", name: "Javascript/Typescript" },
  { icon: "fa-brands fa-react", name: "React" },
  { icon: "fa-brands fa-vuejs", name: "Vue" },
  { icon: "fa-solid fa-code", name: "Django/DRF" },
  { icon: "fa-brands fa-git-alt", name: "Git" },
  { icon: "fa-solid fa-screwdriver-wrench", name: "Esbuild" },
  { icon: "fa-solid fa-database", name: "PostgreSQL" },
  { icon: "fa-brands fa-docker", name: "Docker" },
  { icon: "fa-solid fa-chart-simple", name: "Scikit-Learn" },
  { icon: "fa-solid fa-code", name: "Celery" },
  { icon: "fa-brands fa-node-js", name: "Nodejs" },
]);

const softSkills = ref([
  { icon: "fa-solid fa-chart-simple", name: "Analytical" },
  { icon: "fa-solid fa-circle-nodes", name: "Adaptable" },
  { icon: "fa-solid fa-people-group", name: "Team player" },
  { icon: "fa-solid fa-brain", name: "Problem solver" },
  { icon: "fa-solid fa-book", name: "Curious about learning" },
]);
</script>
<template>
  <div id="skills" class="grid w-screen align-items-start p-4 surface-50">
    <div id="title-group col-12">
      <p class="name-title my-2">Skills</p>
    </div>
    <div class="grid col-12">
      <div class="col-12 md:col-6">
        <Card>
          <template #title>Technical skills</template>

          <template #content>
            <div class="flex flex-wrap gap-1">
              <Tag v-for="item in techSkills" :value="item.name">
                <template #icon>
                  <font-awesome-icon
                    :icon="item.icon"
                    slot="icon"
                    class="mr-1"
                  ></font-awesome-icon>
                </template>
              </Tag>
            </div>
          </template>
        </Card>
      </div>
      <div class="col-12 md:col-6">
        <Card>
          <template #title>Soft skills</template>
          <template #content>
            <div class="flex flex-wrap gap-1">
              <Tag v-for="item in softSkills" :value="item.name">
                <template #icon>
                  <font-awesome-icon
                    :icon="item.icon"
                    slot="icon"
                    class="mr-1"
                  ></font-awesome-icon>
                </template>
              </Tag>
            </div>
          </template>
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
