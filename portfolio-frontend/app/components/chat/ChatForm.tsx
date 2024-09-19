"use client";
import useChat from "@/app/hooks/useChat";
import useIpInfo from "@/app/hooks/useIpInfo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key, Loader2, LogIn, Pencil, Send } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const chatFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be min 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  message: z
    .string()
    .min(5, {
      message: "Message must be min 5 characters.",
    })
    .max(200, {
      message: "Message must be max 200 characters.",
    }),
});

const chatFormLoginSchema = z.object({
  login_id: z.string().min(2, {
    message: "Password must be min 2 characters.",
  }),
});

const ChatFormInit = () => {
  const form = useForm<z.infer<typeof chatFormSchema>>({
    resolver: zodResolver(chatFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const { ipinfo } = useIpInfo();
  const thread = useChat();

  function onSubmit(values: z.infer<typeof chatFormSchema>) {
    thread.init({
      name: values.name,
      phone: "",
      email: values.email,
      message: values.message,
      meta: JSON.stringify(ipinfo),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full mb-10">
        <div className="flex flex-col gap-4 p-2 h-full">
          <div className="flex items-center justify-center text-slate-400 p-8">
            <div className="rounded-full border-2 border-slate-600 p-4">
              <Pencil size={60} />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email address" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="Write something to me..."
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full h-14 flex gap-4">
            Send
            <Send size={16} />
          </Button>
        </div>
      </form>
    </Form>
  );
};

const ChatFormLogin = () => {
  const form = useForm<z.infer<typeof chatFormLoginSchema>>({
    resolver: zodResolver(chatFormLoginSchema),
    defaultValues: {
      login_id: "",
    },
  });

  const thread = useChat();

  function onSubmit(values: z.infer<typeof chatFormLoginSchema>) {
    thread.login(values.login_id);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-between p-2">
          <div className="flex items-center justify-center text-slate-400 p-8">
            <div className="rounded-full border-2 border-slate-600 p-4">
              <Key size={60} />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="login_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter login id" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full flex gap-4 h-14"
              disabled={thread.loading}
            >
              Login
              {!thread.loading ? (
                <LogIn size={16} />
              ) : (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

const ChatForm = () => {
  const thread = useChat();

  const logoutHandler = () => {
    thread.logout();
  };
  return (
    <>
      {thread.threadId ? (
        <div>
          <div>
            Your login id is (use this if you want to chat from another computer
            or if you are mistakenly logged out): {thread.loginId}
          </div>
          <Button onClick={logoutHandler}>Logout</Button>
        </div>
      ) : (
        <Tabs defaultValue="new" className="h-full">
          <TabsList>
            <TabsTrigger value="new">New message</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="new" className="h-full">
            <ChatFormInit />
          </TabsContent>
          <TabsContent value="login">
            <ChatFormLogin />
          </TabsContent>
        </Tabs>
      )}
    </>
  );
};

export default ChatForm;
