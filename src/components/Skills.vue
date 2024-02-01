<script setup lang="ts">
import Card from "primevue/card";
import Tag from "primevue/tag";
</script>

<template>
  <div id="skills" class="grid w-screen align-items-start p-4">
    <div id="title-group col-12">
      <p class="name-title my-2">Skills</p>
    </div>
    <div class="grid col-12">
      <div class="col-12 md:col-6">
        <Card>
          <template #title>Technical skills</template>

          <template #content>
            <div class="flex flex-wrap gap-1">
              <Tag
                class="col-3"
                icon="pi pi-user"
                value="Typescript/Javascript"
              />
              <Tag icon="pi pi-user" value="Python" />
              <Tag icon="pi pi-user" value="Django/DRF" />
              <Tag icon="pi pi-user" value="Docker" />
              <Tag icon="pi pi-user" value="Celery" />
              <Tag icon="pi pi-user" value="Scikit-learn" />
              <Tag icon="pi pi-user" value="Primary" />
            </div>
          </template>
        </Card>
      </div>
      <div class="col-12 md:col-6">
        <Card>
          <template #title>Soft skills</template>
          <template #content>
            <div class="flex flex-wrap gap-1">
              <Tag icon="pi pi-user" value="Primary"></Tag>
              <Tag icon="pi pi-user" value="Primary"></Tag>
            </div>
          </template>
        </Card>
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
