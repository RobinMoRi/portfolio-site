<script setup lang="ts">
import Card from "primevue/card";
import Button from "primevue/button";
import ProgressBar from "primevue/progressbar";
import Tag from "primevue/tag";
import { onMounted, ref, watch, inject } from "vue";
import { GlobalState } from "../types";
import Carousel from "primevue/carousel";
import { fetchRepos, fetchLanguages } from "@/discord-utils";

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
const VERTICAL_BREAKPOINT = ref<number>(500);

async function getRepos() {
  loading.value = true;

  const data = await fetchRepos();
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

    fetchLanguages(repo.languages_url).then((lang) => {
      repos.value[idx] = { ...repo, languges: Object.keys(lang) };
      loadingContent.value.push(repo.id);
    });
  }

  console.log({ data });
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
    breakpoint: "1300px",
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: "1100px",
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
      :numVisible="1"
      :numScroll="1"
      :value="repos"
      circular
      :autoplayInterval="5000"
      :responsiveOptions="responsiveOptions"
      :verticalViewPortHeight="0.7 * windowHeight + 'px'"
      :orientation="
        globalState.window.width < VERTICAL_BREAKPOINT
          ? 'vertical'
          : 'horizontal'
      "
    >
      <template #item="slotProps">
        <Card
          class="m-1"
          :style="
            globalState.window.width < VERTICAL_BREAKPOINT
              ? { height: '250px' }
              : { width: '300px' }
          "
        >
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
            <div v-tooltip.bottom="slotProps.data.description" class="clipped">
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

.clipped {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
