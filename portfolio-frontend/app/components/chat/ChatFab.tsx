"use client";

import { MessageSquare } from "lucide-react";
import React from "react";
import ChatModal from "./ChatModal";

const ChatFab = () => {
  const trigger = (
    <div
      className="z-50 w-10 h-10 p-2 bg-navbar rounded-lg"
      onClick={() => console.log("anik ummak")}
    >
      <MessageSquare />
    </div>
  );
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
      <ChatModal trigger={trigger} content={"anik ummak kahpe"} />
    </div>
  );
};

export default ChatFab;
