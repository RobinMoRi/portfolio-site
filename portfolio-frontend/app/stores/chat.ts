import { create } from "zustand";

import { DiscordMessagesReponse } from "@/lib/api/discord";

export type ChatState = {
  messages: DiscordMessagesReponse;
  threadId: string;
  loginId: string;
};

export type ChatActions = {
  setMessages: (messages: DiscordMessagesReponse) => void;
  setThreadId: (threadId: string) => void;
  setLoginId: (loginId: string) => void;
};

export type ChatStore = ChatState & ChatActions;

export const defaultInitState: ChatState = {
  messages: [],
  threadId: "",
  loginId: "",
};

export const useChatStore = create<ChatStore>()((set) => ({
  messages: defaultInitState.messages,
  threadId: defaultInitState.threadId,
  loginId: defaultInitState.loginId,
  setMessages: (messages: DiscordMessagesReponse) => set({ messages }),
  setThreadId: (threadId: string) => set({ threadId }),
  setLoginId: (loginId: string) => set({ loginId }),
}));
