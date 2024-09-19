import { DiscordMessage } from "@/lib/api/discord";
import { formatDistance } from "date-fns";
import React from "react";

const ChatCard = ({
  message,
  isLast = false,
}: {
  message: DiscordMessage;
  isLast: boolean;
}) => {
  const isBot = message.author.bot; //The user is basically a bot
  return (
    <div id={isLast ? "last-message-card" : undefined}>
      <div
        className={`text-slate-500 text-xs mb-1 ${isBot ? "text-right" : "text-left"}`}
      >
        {formatDistance(new Date(message.timestamp), new Date(), {
          addSuffix: true,
        })}
      </div>
      <div className={`w-full flex ${isBot ? "justify-end" : "justify-start"}`}>
        <div
          className={`max-w-3/4 p-2 rounded-lg ${isBot ? "text-right bg-blue-500" : "text-left bg-green-500"}`}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
