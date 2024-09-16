"use client";

import { MessageSquare } from "lucide-react";
import React, { useState } from "react";
import ChatModal from "./ChatModal";

const ChatFab = () => {
  const [openedOnce, setOpenedOnce] = useState(false);
  const trigger = (
    <div
      className="z-50 w-10 h-10 p-2 bg-navbar rounded-lg"
      onClick={() => setOpenedOnce(true)}
    >
      <MessageSquare />
    </div>
  );
  const content = <div>KUSS UCHTA</div>;
  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 ${!openedOnce ? "animate-bounce" : ""}`}
    >
      <ChatModal trigger={trigger} content={content} />
    </div>
  );
};

export default ChatFab;
