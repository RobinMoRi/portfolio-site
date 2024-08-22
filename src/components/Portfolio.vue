<script setup lang="ts">
import Card from "primevue/card";
import Button from "primevue/button";
import ProgressBar from "primevue/progressbar";
import Tag from "primevue/tag";
import { onMounted, ref, watch, inject } from "vue";
import { GlobalState } from "../types";
import { fetchRepos, fetchLanguages, Repos } from "@/discord-utils";

const globalState = inject("globalState") as GlobalState;
const windowHeight = ref(0);

const repos = ref<Repos>([]);
const loading = ref(false);
const loadingContent = ref<number[]>([]);

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
</script>

<template>
  <div
    id="portfolio"
    class="w-screen p-4"
    :style="{ height: windowHeight + 'px' }"
  >
    <div id="title-group col-12">
      <p class="name-title my-2">Portfolio</p>
    </div>
    <div v-if="!loading" class="grid gap-2 w-full h-full overflow-y-scroll p-3">
      <div v-for="repo in repos" class="sm:col-12 md:col-6 lg:col-4 xl:col-3">
        <Card class="z-4 h-full w-full">
          <template #title>
            <Button
              @click="openRepo(repo.html_url)"
              link
              v-tooltip.top="{
                value: repo.html_url,
                autoHide: false,
              }"
              >{{ repo.name }}</Button
            >
          </template>
          <template #subtitle>
            <div>
              Created:
              {{ new Date(repo.created_at).toLocaleDateString("sv-SE") }}
            </div>
          </template>
          <template #content>
            <div v-tooltip.bottom="repo.description">
              {{ repo.description }}
            </div>
          </template>
          <template #footer>
            <div class="flex flex-wrap">
              <div
                v-if="loadingContent.includes(repo.id)"
                v-for="lang in repo.languges"
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
      </div>
    </div>

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

:deep(.p-button) {
  position: static;
}
</style>
