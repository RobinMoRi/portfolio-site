<script setup lang="ts">
import Card from "primevue/card";
import Button from "primevue/button";
import ProgressBar from "primevue/progressbar";
import Tag from "primevue/tag";
import { onMounted, ref, watch, inject } from "vue";
import { GlobalState } from "../types";
import Carousel from "primevue/carousel";

const globalState = inject("globalState") as GlobalState;
const windowHeight = ref(0);

type Repo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  languages_url: string;
  languges: string[];
  created_at: string;
};

const repos = ref<Repo[]>([]);
const loading = ref(false);
const loadingContent = ref<number[]>([]);

async function getRepos() {
  loading.value = true;
  let api_token = import.meta.env.VITE_GITHUB_API_TOKEN;

  const url = "https://api.github.com/user/repos";
  const res = await fetch(url, {
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${api_token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  const data: Repo[] = await res.json();
  repos.value = data
    .filter((el) => el.name !== "RobinMoRi")
    .sort((a, b) => {
      const aDate = new Date(a.created_at).getTime();
      const bDate = new Date(b.created_at).getTime();
      return bDate - aDate;
    });
  loading.value = false;

  for (let idx in repos.value) {
    let repo = repos.value[idx];

    getLanguages(repo.languages_url).then((lang) => {
      repos.value[idx] = { ...repo, languges: Object.keys(lang) };
      loadingContent.value.push(repo.id);
    });
  }

  console.log({ data });
}

async function getLanguages(url: string): Promise<{ [key: string]: number }> {
  const res = await fetch(url, {
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  return res.json();
}

function openRepo(url: string, target = "_blank") {
  window.open(url, target);
}

onMounted(() => {
  getRepos();
});
watch(
  () => globalState.window.height,
  (newVal) => {
    console.log({ newVal });
    windowHeight.value = newVal - globalState.appbar.height;
  },
  {
    immediate: true,
  }
);

const responsiveOptions = ref([
  {
    breakpoint: "2000px",
    numVisible: 4,
    numScroll: 4,
  },

  {
    breakpoint: "1200px",
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: "575px",
    numVisible: 2,
    numScroll: 2,
  },
  {
    breakpoint: "375px",
    numVisible: 1,
    numScroll: 1,
  },
]);
</script>

<template>
  <div
    id="portfolio"
    class="w-screen p-4"
    :style="{ minHeight: windowHeight + 'px' }"
  >
    <div id="title-group col-12">
      <p class="name-title my-2">Portfolio</p>
    </div>
    <Carousel
      v-if="!loading"
      :verticalViewPortHeight="0.55 * windowHeight + 'px'"
      :numVisible="1"
      :numScroll="1"
      :value="repos"
      circular
      :autoplayInterval="3000"
      :responsiveOptions="responsiveOptions"
      :orientation="globalState.window.width < 500 ? 'vertical' : 'horizontal'"
    >
      <template #item="slotProps">
        <Card class="m-1">
          <template #title>
            <Button
              @click="openRepo(slotProps.data.html_url)"
              link
              v-tooltip.top="{
                value: slotProps.data.html_url,
                autoHide: false,
              }"
              >{{ slotProps.data.name }}</Button
            >
          </template>
          <template #subtitle>
            <div>
              Created:
              {{
                new Date(slotProps.data.created_at).toLocaleDateString("sv-SE")
              }}
            </div>
          </template>
          <template #content>
            <div>
              {{ slotProps.data.description }}
            </div>
          </template>
          <template #footer>
            <div class="flex flex-wrap">
              <div
                v-if="loadingContent.includes(slotProps.data.id)"
                v-for="lang in slotProps.data.languges"
                class="mr-1 mb-1"
              >
                <Tag :value="lang" />
              </div>

              <div v-else class="card">
                <ProgressBar
                  mode="indeterminate"
                  style="height: 6px"
                ></ProgressBar>
              </div>
            </div>
          </template>
        </Card>
      </template>
    </Carousel>

    <div v-else class="card">
      <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
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
