<script setup lang="ts">
import Button from "primevue/button";

const props = defineProps({
  links: Array<String>,
});

function openLink(url: string) {
  window.open(url);
}
</script>
<template>
  <div class="container">
    <div class="image">
      <slot name="image"></slot>
    </div>
    <div class="overlay">
      <div class="flex icon gap-2">
        <Button
          v-for="item in props.links"
          v-tooltip.bottom="{ value: item, autoHide: false }"
          title="User Profile"
          severity="secondary"
          @click="openLink(String(item))"
        >
          <i class="pi pi-link"></i>
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 100%;
  /* max-width: 400px; */
}

.image {
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.3s ease;
  background-color: rgba(185, 185, 185, 0.159);
}

.container:hover .overlay {
  opacity: 1;
}

.icon {
  color: white;
  font-size: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.fa-user:hover {
  color: #eee;
}
</style>
