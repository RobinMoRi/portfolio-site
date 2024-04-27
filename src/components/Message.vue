<script setup lang="ts">
import { formatDistanceStrict } from "date-fns";
defineProps({
  user: Boolean,
  timestamp: {
    type: Date,
    required: true,
  },
});
</script>

<template>
  <div
    class="message-wrapper flex flex-column"
    :style="
      user
        ? 'background-color: var(--green-600)'
        : 'background-color: var(--blue-500)'
    "
  >
    <div class="flex flex-row align-items-center justify-content-between">
      <div :class="`text-wrapper ${user ? 'flex-order-0' : 'flex-order-1'}`">
        <slot name="text"></slot>
      </div>
      <div :class="`avatar-wrapper ${user ? 'flex-order-1' : 'flex-order-0'}`">
        <slot name="avatar"></slot>
        <slot name="time"></slot>
      </div>
    </div>
    <div
      :class="`text-xs mt-1 ${
        user
          ? 'text-green-300 align-self-end'
          : 'text-blue-200 align-self-start'
      }`"
    >
      {{ formatDistanceStrict(timestamp, new Date()) }}
    </div>
  </div>
</template>

<style scoped>
.message-wrapper {
  text-wrap: wrap;
  max-width: 66.6667%;
  border-radius: 0.5rem;
  padding: 0.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
</style>
