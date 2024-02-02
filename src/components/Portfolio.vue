<script setup lang="ts">
import Card from "primevue/card";
import Button from "primevue/button";
import ProgressBar from "primevue/progressbar";
import Tag from "primevue/tag";
import { onMounted, ref } from "vue";
import ScrollPanel from "primevue/scrollpanel";

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
  // if (process && process.env.NODE_ENV === "prod") {
  //   api_token = process.env.GITHUB_API_TOKEN;
  //   console.log("From prod");
  // }
  console.log({ api_token });
  console.log({ env: process.env.NODE_ENV });
  console.log({ gh: import.meta.env.VITE_GITHUB_API_TOKEN });

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
    const lang = await getLanguages(repo.languages_url);
    repos.value[idx] = { ...repo, languges: Object.keys(lang) };
    loadingContent.value.push(repo.id);
    // await new Promise((r) => setTimeout(r, 500)); //Mock sleep
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
</script>

<template>
  <div id="portfolio" class="w-screen p-4">
    <div id="title-group col-12">
      <p class="name-title my-2">Portfolio</p>
    </div>
    <ScrollPanel v-if="!loading" style="width: 100%; height: 600px">
      <div class="grid">
        <div v-for="repo in repos" class="col-12 md:col-4 sm:col-6">
          <Card class="h-full">
            <template #title>
              <Button
                @click="openRepo(repo.html_url)"
                link
                v-tooltip.top="{ value: repo.html_url, autoHide: false }"
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
              <div>
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
    </ScrollPanel>

    <div v-else class="card">
      <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
    </div>
  </div>
</template>

<style></style>
