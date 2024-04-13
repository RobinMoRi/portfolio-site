<script setup lang="ts">
import Button from "primevue/button";
import OverlayPanel from "primevue/overlaypanel";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Card from "primevue/card";
import { ref } from "vue";

const op = ref();
const toggle = (event: any) => {
  op.value.toggle(event);
};

const send = () => {
  console.log({ title: title.value, name: name.value, message: message.value });
};

const title = ref(null);
const name = ref(null);
const message = ref(null);
</script>

<template>
  <!-- <OverlayPanel ref="op" appendTo="body">
    <div class="flex flex-column gap-2">
      <div>Chat with me!</div>
      <InputText
        id="title"
        type="text"
        v-model="title"
        class="text"
        placeholder="Title"
      />
      <InputText
        id="name"
        type="text"
        v-model="name"
        class="text"
        placeholder="Name"
      />
      <Textarea
        id="message"
        class="text"
        v-model="message"
        rows="5"
        cols="30"
        :style="{ resize: 'none' }"
        placeholder="Message"
      />

      <div :style="{ width: '100%' }" class="flex justify-content-end">
        <Button
          icon="pi pi-send"
          aria-label="Chat"
          @click="send"
          :disabled="!title || !name || !message"
        />
      </div>
    </div>
  </OverlayPanel> -->
  <div>
    <Card></Card>
  </div>
  <div id="chat-bubble-wrapper" class="chat-wrapper">
    <Button
      class="chat-bubble"
      icon="pi pi-comment"
      rounded
      outlined
      aria-label="Chat"
      @click="toggle"
    />
  </div>
</template>

<style>
.text {
  width: 100%;
}
.chat-wrapper {
  position: fixed;
  bottom: 3rem;
  right: 3rem;
}
.chat-bubble {
  position: fixed;
}
</style>
