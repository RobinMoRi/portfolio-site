"use client";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
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

const ChatForm = () => {
  const form = useForm<z.infer<typeof chatFormSchema>>({
    resolver: zodResolver(chatFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof chatFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
        <Button type="submit" className="w-full flex gap-4">
          Send
          <Send size={16} />
        </Button>
      </form>
    </Form>
  );
};

export default ChatForm;
