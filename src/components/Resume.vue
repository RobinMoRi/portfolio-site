<script setup lang="ts">
import Timeline from "primevue/timeline";
import Card from "primevue/card";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { ref } from "vue";
import Tag from "primevue/tag";

type Experience = {
  institute: string;
  title: string;
  description: string[];
  start: string;
  end: string;
  skills?: string[];
};

const currentExperience = ref<Experience | null>(null);

const workExperience = ref<Experience[]>([
  {
    institute: "Morpheus Tribe",
    title: "Fullstack Developer",
    description: [
      "In my current role, I am deeply involved in fullstack development for an automation solution designed to streamline search and recruitment processes. Working within a small team reminiscent of a startup environment, I hold a wide range of responsibilities. I collaborate closely with the solution's end-users and maintain a primary focus on optimizing, streamlining, and advancing the solution, both on the backend and frontend.",
    ],
    start: "Feb. 2023",
    end: "Ongoing",
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
    institute: "Capgemini",
    title: "Senior Applications Consultant",
    description: [
      "Primary roles as developer and business analyst.",
      "Experience in Telecom industry.",
      "Leading large cost-cutting project. Aim was to analyse and implement automated solutions for second line operational support.",
      "Final automated solution consist of frontend to handle incoming errands by operational support personnel. In the background, a set of 'robots' cooperate to manage orders through GUI-automation and integration of order management-, ServiceNOW-, and client-developed CRM cache REST-API's.",
    ],
    start: "Aug. 2021",
    end: "Feb. 2023",
    skills: [
      "REST API",
      "Technical Analysis",
      "Robotic Process Automation (RPA)",
      "Blueprism",
      "Oracle Siebel CRM",
      "ServiceNow",
      "Change management",
    ],
  },
  {
    institute: "KPMG",
    title: "Technical Associate",
    description: [
      "Primary roles as software developer, automation engineer and business analyst.",
      "Experience from Media, Energy, Automotive and Telecom industry.",
      "Developed a dashboard for visualizing supply chain flows (TypeScript, React, Redux, Node.js, Mapbox API, Git, Python Flask).",
      "Developed several chatbots (Google Dialogflow, JavaScript, API-integrations, building RESTful API in Django).",
      "Several projects in developing automated business processes using various tools and technologies (Python, VBA, C\#, BluePrism, UiPath).",
      "Responsible for establishing KPMGs Chat & Voice tech capabilities within the Swedish firm.",
      "test",
    ],
    start: "Feb. 2019",
    end: "Jul. 2021",
    skills: [
      "Django/DRF",
      "Python",
      "R",
      "VBA",
      "Flask",
      "Graphviz",
      "Javascript",
      "React",
      "Pandas",
      "Matplotlib",
      "Pandas",
      "UiPath",
      "Blueprism",
      "C#",
    ],
  },
  {
    institute: "Alten",
    title: "Embedded Software Engineer",
    description: [
      "Primary role as an Embedded Software Engineer.",
      "Prominent assignment include writing test scripts for the graphical user interface of truck dashboards at Scania (C\#, Git, CAN, unit-testing).",
      "Master Thesis in autonomous vehicles.",
    ],
    start: "Aug. 2018",
    end: "Fen. 2019",
    skills: ["C#", "Git", "CANoe", "Unit testing", "CAN bus", "ECUs"],
  },
]);

const education = ref<Experience[]>([
  {
    institute: "KTH (Royal Institute of Technology)",
    title: "M.Sc. in Mechatronics and Robotics Engineering",
    description: [
      "Degree program covering subjects such as embedded systems, applied mathematics and artificial intelligence.",
      "Master Thesis: Comparative study of fault-tolerant strategies for cooperative adaptive cruise control: Subject to autonomous driving in platoon.",
    ],
    start: "Aug. 2016",
    end: "Jun. 2018",
  },
  {
    institute: "KTH (Royal Institute of Technology)",
    title: "B.Sc. in Mechanical Engineering",
    description: [
      "Degree program covering subjects such as mathematics, mechanics, electronics and programming.",
      "Exchange student at Universidad de Chile, Santiago de Chile (2015).",
      "Bachelor Thesis: Heat following robot - degree project in Mechatronics.",
    ],
    start: "Aug. 2013",
    end: "Jun. 2016",
  },
]);

function downloadCV() {
  window.open(
    "https://drive.usercontent.google.com/uc?id=1PvwN_ImQx2JK-es-hp2kAd3qv87IHzLI&export=download",
    "_blank"
  );
}

function selectExperience(item: Experience) {
  currentExperience.value = item;
}

function deselectExperience() {
  currentExperience.value = null;
}
</script>

<template>
  <div id="resume" class="w-screen p-4 surface-0">
    <div id="title-group col-12">
      <p class="name-title my-2">Resume</p>
      <p class="my-2 text-md text-200">
        Click on the cards to find out more about my roles.
      </p>
    </div>
    <div class="col-12">
      <Button
        label="Download CV"
        size="small"
        icon="pi pi-download"
        @click="downloadCV"
        outlined
      />
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
              <Card
                class="surface-100 p-2"
                style="cursor: pointer"
                @click="selectExperience(slotProps.item)"
              >
                <template #subtitle>{{ slotProps.item.institute }}</template>
                <template #content>{{ slotProps.item.title }}</template>
              </Card>
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
            <div class="flex flex-wrap gap-1 mt-1 justify-content-start">
              <Tag v-for="item in slotProps.item.skills" class="mb-2">
                {{ item }}
              </Tag>
            </div>
          </template>
          <template #opposite="slotProps">
            <div class="mb-3">
              <Card
                class="surface-100 p-2"
                style="cursor: pointer"
                @click="selectExperience(slotProps.item)"
              >
                <template #subtitle>{{ slotProps.item.institute }}</template>
                <template #content>{{ slotProps.item.title }}</template>
                <template #footer> </template>
              </Card>
            </div>
          </template>
        </Timeline>
      </div>
    </div>
  </div>
  <div class="card flex justify-content-center">
    <Dialog
      :visible="currentExperience !== null"
      modal
      :closable="false"
      @update:visible="deselectExperience"
      dismissableMask
      class="mx-4 w-screen md:w-6"
    >
      <template #header>
        <div class="flex flex-column gap-1">
          <div class="text-md text-200">{{ currentExperience?.institute }}</div>
          <div class="text-xs">{{ currentExperience?.title }}</div>
        </div>
      </template>
      <div>
        <li v-for="item in currentExperience?.description" class="mb-2 text-xs">
          {{ item }}
        </li>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
.name-title {
  font-family: "Inter";
  letter-spacing: 2px;
  font-size: 54px;
}
</style>
