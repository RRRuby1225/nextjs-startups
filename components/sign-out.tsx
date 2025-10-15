import { signOut } from "@/auth";
import { LogOut } from "lucide-react";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">
        <span className="max-sm:hidden">Logout</span>
        <LogOut className="size-6 sm:hidden text-red-500" />
      </button>
    </form>
  );
}
