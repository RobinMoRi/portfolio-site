<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";

const toast = useToast();

function openUrl(url: string, target = "_blank") {
  window.open(url, target);
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.add({
      severity: "success",
      summary: "Clipboard",
      detail: "Number copied to clipboard",
      life: 3000,
      group: "bl",
    });
  } catch (err) {
    toast.add({
      severity: "error",
      summary: "Clipboard",
      detail: "Could not copy to clipboard",
      life: 3000,
      group: "bl",
    });
  }
}
</script>

<template>
  <div id="contacts">
    <Toolbar style="border: none">
      <template #start>
        <div>
          <div
            class="grid gap-4 justify-content-center align-items-center ml-4"
          >
            <Button
              rounded
              v-tooltip.top="{ value: 'Linkedin', autoHide: false }"
              size="small"
              icon="pi pi-linkedin"
              @click="openUrl('https://www.linkedin.com/in/romori/')"
              outlined
            />
            <Button
              rounded
              v-tooltip.top="{ value: 'Github', autoHide: false }"
              size="small"
              icon="pi pi-github"
              @click="openUrl('https://github.com/RobinMoRi')"
              outlined
            />
            <Button
              rounded
              v-tooltip.top="{ value: 'Email', autoHide: false }"
              size="small"
              icon="pi pi-envelope"
              @click="openUrl('mailto:robin.moreno.rinding@gmail.com')"
              outlined
            />
            <Button
              rounded
              v-tooltip.top="{ value: 'Copy number', autoHide: false }"
              size="small"
              icon="pi pi-phone"
              @click="copyToClipboard('+46737514695')"
              outlined
            />
          </div>
        </div>
      </template>
      <template #end>
        <div class="text-xs text-200 mr-1">
          This page is built by Robin Moreno Rinding using Vue3, PrimeVue,
          PrimeFlex. Portfolio is integrated with
        </div>
        <a
          class="text-xs text-200 mr-1"
          href="https://docs.github.com/en/rest?apiVersion=2022-11-28"
          target="_blank"
        >
          Github API.</a
        >
        <div class="text-xs text-200 mr-1">
          Illustrations are done in Figma.
        </div>
      </template>
    </Toolbar>
  </div>
</template>
