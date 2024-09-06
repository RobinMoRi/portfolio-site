import { useToast } from "@/hooks/use-toast";
import React from "react";

const useClipboard = () => {
  const { toast } = useToast();
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Clipboard",
        description: "Number copied to clipboard",
        variant: "success",
      });
    } catch (err) {
      toast({
        title: "Clipboard",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };
  return { copyToClipboard };
};

export default useClipboard;
