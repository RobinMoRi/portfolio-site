"use client";
import {
  createMessage,
  DiscordCreateMessageData,
  DiscordInitSessionData,
  getLoginId,
  getMessages,
  initSession,
  loginToThread,
} from "@/lib/api/discord";
import { useState } from "react";
import { useChatStore } from "../stores/chat";
import useLocalStorage from "./useLocalStorage";

const useChat = () => {
  const { setMessages, setThreadId, setLoginId, loginId, threadId, messages } =
    useChatStore();
  const [value, setValue] = useLocalStorage("thread_id", "");
  const [loading, setLoading] = useState<boolean>(false);

  const updateLoggedInState = () => {
    getMessages(value, true).then(setMessages);
    setThreadId(value);
    getLoginId(value, true).then(setLoginId);
  };

  const init = (data: DiscordInitSessionData) => {
    /**
     * Init chat session
     */
    setLoading(true);
    initSession(data, true)
      .then((res) => {
        setThreadId(res.id);
        setValue(res.id);
        getMessages(res.id, true).then(setMessages);
        getLoginId(res.id, true).then(setLoginId);
      })
      .then(() => setLoading(false));
  };

  const login = (loginId: string) => {
    /**
     * Login to thread
     */
    setLoading(true);
    loginToThread(loginId, true)
      .then((threadId) => {
        setThreadId(threadId);
        setValue(threadId);
        setLoginId(loginId);
        getMessages(threadId, true).then(setMessages);
      })
      .then(() => setLoading(false));
  };

  const logout = () => {
    /**
     * Logout from thread
     */
    setThreadId("");
    setValue("");
    setLoginId("");
    setMessages([]);
  };

  const sendMessage = async (data: DiscordCreateMessageData) => {
    /**
     * Send message to thread
     */
    setLoading(true);
    await createMessage(data, true);
    await getMessages(data.thread_id, true).then(setMessages);
    setLoading(false);
  };

  const getChatMessages = () => {
    if (threadId) {
      getMessages(threadId, true).then(setMessages);
    }
  };

  return {
    updateLoggedInState,
    init,
    login,
    logout,
    sendMessage,
    getChatMessages,
    loginId,
    threadId,
    messages,
    loading,
  };
};

export default useChat;
