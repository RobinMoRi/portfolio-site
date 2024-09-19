"use client";
import useChat from "@/app/hooks/useChat";
import useClipboard from "@/app/hooks/useClipboard";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, Loader2, SendHorizontal } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ChatCard from "./ChatCard";

const chatSchema = z.object({
  message: z
    .string()
    .min(2, {
      message: "Message must be min 5 characters.",
    })
    .max(200, {
      message: "Message must be max 200 characters.",
    }),
});

const ChatMessagesContainer = () => {
  const thread = useChat();

  useEffect(() => {
    const el = document.getElementById("last-message-card");
    if (el) {
      el.scrollIntoView(false);
    }
  }, [thread.messages]);

  return (
    <div className="h-full overflow-y-scroll my-2 flex flex-col gap-2">
      {thread.messages.map((message, index) => {
        return (
          <ChatCard
            key={message.id}
            message={message}
            isLast={thread.messages.length - 1 === index}
          />
        );
      })}
    </div>
  );
};

const Chat = () => {
  const thread = useChat();
  const { copyToClipboard } = useClipboard();
  const form = useForm<z.infer<typeof chatSchema>>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      message: "",
    },
  });

  const logoutHandler = () => {
    thread.logout();
  };

  const handleCopyLoginId = () => {
    copyToClipboard(thread.loginId, "Login ID copied to clipboard");
  };

  const onSubmit = (values: z.infer<typeof chatSchema>) => {
    thread
      .sendMessage({
        message: values.message,
        thread_id: thread.threadId,
        meta: false,
      })
      .then(() => {
        form.resetField("message");
      });
  };

  //@ts-expect-error: screw type
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      form.handleSubmit(onSubmit);
    }
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex justify-between items-center">
        <div className="flex text-xs gap-2">
          <div className="flex flex-col items-start">
            <div className="text-xs text-slate-600 text-left">Login ID</div>
            {thread.loginId}
          </div>
          <Button variant="link" className="p-0" onClick={handleCopyLoginId}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={logoutHandler} size="sm">
          Logout
        </Button>
      </div>
      <ChatMessagesContainer />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-12"
        >
          <FormField
            disabled={thread.loading}
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="col-span-11">
                <FormControl>
                  <Input
                    onKeyDown={handleKeyDown}
                    placeholder="Write something to me"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button type="submit" className="p-0 col-span-1" variant="link">
            {!thread.loading ? (
              <SendHorizontal className="h-4 w-4" />
            ) : (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Chat;

//1x1QjGTVHml
