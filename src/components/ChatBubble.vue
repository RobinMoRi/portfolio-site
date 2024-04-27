<script setup lang="ts">
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import TextArea from "primevue/textarea";
import Avatar from "primevue/avatar";
import { inject, onMounted } from "vue";

import { ChatSession, GlobalState } from "@/types";
import {
  startNewThread,
  addBotToThread,
  createThreadMessage,
  getThreadMessages,
  GetThreadMessageResponse,
} from "@/discord-utils";

import Card from "primevue/card";
// import Message from "primevue/message";
import Message from "@/components/Message.vue";
import { ref } from "vue";

const globalState = inject("globalState") as GlobalState;

/**
 * TODO: Fix custom message component
 */

const open = ref();

const threadMessages = ref<GetThreadMessageResponse[]>([]);

// TODO: Only add relevant fields..
const data = ref({
  title: "",
  name: "",
  message: "",
});

const intro = ref({
  title: "",
  name: "",
  message: "",
});

onMounted(() => {
  // Clear interval...

  setInterval(setThreadMessages, 15000);
  setThreadMessages();
});

const setThreadMessages = async () => {
  if (globalState.chatSession && globalState.chatSession.sessionId) {
    const messages = await getThreadMessages(globalState.chatSession.sessionId);
    messages.sort((a, b) => {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    });

    const filtered = messages.filter(
      (msg) => msg.embeds.length === 0 && msg.content !== ""
    );
    threadMessages.value = filtered;
  }
};

const toggle = () => {
  open.value = !open.value;
};

const scrollToBottom = () => {
  const card = document.getElementById("chat-card");
  if (!card) {
    return;
  }
  const cardContents = card.getElementsByClassName("p-card-content");
  const cardHeaders = card.getElementsByClassName("p-card-header");
  console.log(cardContents);
  if (cardContents.length == 0) {
    return;
  }

  let cardHeaderHeight = 0;
  if (cardHeaders.length > 0) {
    cardHeaderHeight = cardHeaders[0].getBoundingClientRect().height;
  }

  const cardContent = cardContents[0];
  cardContent.scrollTop = cardContent.scrollHeight - cardHeaderHeight - 50;
};

const sendIntro = async () => {
  const thread = await startNewThread(
    `${intro.value.name} - ${intro.value.title}`
  );

  const session: ChatSession = {
    title: intro.value.title,
    sessionId: thread.id,
    name: intro.value.name,
  };

  await addBotToThread(thread.id);

  // IP-info etc
  const ip = localStorage.getItem("IP_ADDRESS") || "No IP info available";
  await createThreadMessage(
    thread.id,
    `\`\`\`\n${JSON.stringify(JSON.parse(ip))}\n\`\`\``,
    true
  );

  await createThreadMessage(thread.id, intro.value.message);

  globalState.chatSession = session;
  localStorage.setItem("chat_session", JSON.stringify(session));
};

const send = async () => {
  if (data.value.message.length < 3) {
    return;
  }

  const msg = await createThreadMessage(
    globalState.chatSession.sessionId,
    data.value.message
  );

  threadMessages.value.push(msg);
  data.value = {
    title: "",
    name: "",
    message: "",
  };
  scrollToBottom();
};
</script>

<template>
  <div v-if="open" class="chat-card">
    <Card
      v-if="globalState.chatSession.sessionId"
      id="chat-card"
      class="surface-50 p-0"
      style="border: 1px solid var(--gray-900)"
    >
      <template #header>
        <div class="ml-4">
          <p>{{ globalState.chatSession.title }}</p>
          <p class="text-color-secondary text-xs">
            Chat between {{ globalState.chatSession.name }} and Robin
          </p>
        </div>
      </template>
      <template #content>
        <div class="flex flex-column gap-2 m-4 card-content-messages">
          <Message
            v-for="message in threadMessages"
            :user="message.author.bot"
            :timestamp="new Date(message.timestamp)"
            :class="`${
              message.author.bot ? 'align-self-end' : 'align-self-start'
            }`"
          >
            <template #text>
              <div class="text-sm" style="word-break: break-word">
                {{ message.content }}
              </div>
            </template>
            <template #avatar>
              <Avatar image="/robin.svg" shape="circle" />
            </template>
          </Message>
        </div>
      </template>
      <template #footer>
        <div class="grid mx-4 my-2 justify-content-between">
          <div class="col-10 flex flex-column align-items-center">
            <InputText
              v-model="data.message"
              v-on:keyup.enter="send"
              type="text"
              class="surface-100 w-full mb-2"
              placeholder="Write something"
            />
            <div class="text-xs text-200">
              Powered with
              <a
                href="https://discord.com/developers/docs/reference"
                target="_blank"
                class="text-xs text-200"
                >Discord API</a
              >
            </div>
          </div>
          <div class="col-2">
            <Button
              icon="pi pi-send"
              outlined
              aria-label="Chat"
              @click="send"
            />
          </div>
        </div>
      </template>
    </Card>
    <Card
      v-else
      id="chat-card"
      class="surface-50 p-0"
      style="border: 1px solid var(--gray-900)"
    >
      <template #header>
        <p class="ml-4">Chat with me!</p>
      </template>
      <template #content>
        <div class="flex flex-column gap-2 m-4 card-content-messages">
          <InputText
            placeholder="Subject"
            v-model="intro.title"
            type="text"
            class="surface-100 w-full"
          />
          <InputText
            placeholder="Name"
            v-model="intro.name"
            type="text"
            class="surface-100 w-full"
          />
          <TextArea
            placeholder="Message"
            v-model="intro.message"
            type="text"
            class="surface-100 w-full"
          />
        </div>
      </template>
      <template #footer>
        <div class="grid mx-4 my-4 justify-content-center">
          <Button icon="pi pi-send" label="Send" outlined @click="sendIntro" />
        </div>
      </template>
    </Card>
  </div>
  <div class="chat-button">
    <Button
      class="chat-bubble"
      :icon="open ? 'pi pi-times' : 'pi pi-comment'"
      rounded
      aria-label="Chat"
      @click="toggle"
    />
  </div>
</template>

<style>
.text {
  width: 100%;
}
.chat-card {
  position: fixed;
  bottom: 5rem;
  right: 2rem;
}
.chat-button {
  position: fixed;
  bottom: 4rem;
  right: 4rem;
}
.chat-bubble {
  position: fixed;
}
.chat-card .p-card-body {
  padding: 0;
  gap: 0;
}
.chat-card .p-card-content {
  position: relative;
  height: 20rem;
  width: 20rem;
  overflow-y: scroll;
  background-color: var(--surface-ground);
}
.chat-card .p-message {
  margin: 0;
}
.chat-card .p-message-wrapper .p-message-text {
  height: auto;
}
.card-content-messages {
  max-height: 20rem;
  padding-bottom: 2rem;
}
</style>
