import { useToast } from "@/hooks/use-toast";

const useClipboard = () => {
  const { toast } = useToast();
  const copyToClipboard = async (text: string, description: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Clipboard",
        description: description,
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
