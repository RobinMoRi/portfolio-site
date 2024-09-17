"use client";

import useIpInfo from "@/app/hooks/useIpInfo";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import { MessageSquare } from "lucide-react";
import React, { useEffect, useState } from "react";
import ChatForm from "./ChatForm";
import ChatModal from "./ChatModal";

const ChatFab = () => {
  const [value, setValue] = useLocalStorage("openedChatBox", "false");
  const [openedOnce, setOpenedOnce] = useState(true);
  const { ipinfo } = useIpInfo();

  useEffect(() => {
    if (value === "true") {
      setOpenedOnce(true);
    }
    if (value === "false") {
      setOpenedOnce(false);
    }
  }, [value]);

  const setOpened = () => {
    setOpenedOnce(true);
    setValue("true");
  };

  const trigger = (
    <div
      className="z-50 w-10 h-10 p-2 bg-navbar rounded-lg"
      onClick={setOpened}
    >
      <MessageSquare />
    </div>
  );
  const content = <ChatForm />;
  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 ${!openedOnce ? "animate-bounce" : ""}`}
    >
      <ChatModal trigger={trigger} content={content} />
    </div>
  );
};

export default ChatFab;
