//提交按钮状态：显示 Submit Your Pitch 或"submitting..."
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface Props {
  isPending: boolean;
}

export function StartupFormActions({ isPending }: Props) {
  return (
    <Button
      type="submit"
      className="startup-form_btn text-white"
      disabled={isPending}
    >
      {isPending ? "Submitting..." : "Submit Your Pitch"}
      <Send className="size-6 ml-2" />
    </Button>
  );
}
