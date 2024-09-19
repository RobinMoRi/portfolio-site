"use client";
import useDevice from "@/app/hooks/useDevice";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ChatModalProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
}

const ChatModalMobile = (props: ChatModalProps) => {
  const { trigger, content } = props;
  return (
    <Drawer>
      <DrawerTrigger>{trigger}</DrawerTrigger>
      <DrawerContent className="p-4 overflow-y-scroll">{content}</DrawerContent>
    </Drawer>
  );
};

const ChatModalDesktop = (props: ChatModalProps) => {
  const { trigger, content } = props;
  return (
    <Popover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent side="top" align="end">
        {content}
      </PopoverContent>
    </Popover>
  );
};

const ChatModal = (props: ChatModalProps) => {
  const { isDesktopOrLaptop } = useDevice();
  const { trigger, content } = props;

  return isDesktopOrLaptop ? (
    <ChatModalDesktop trigger={trigger} content={content} />
  ) : (
    <ChatModalMobile trigger={trigger} content={content} />
  );
};

export default ChatModal;
