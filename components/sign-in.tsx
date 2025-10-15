import { signIn } from "@/auth";
import { BadgePlus } from "lucide-react";
import Link from "next/link";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <button type="submit">
        <span className="max-sm:hidden">Login</span>
      </button>
    </form>
  );
}
