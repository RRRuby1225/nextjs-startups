import { signIn } from "@/auth";
import Link from "next/link";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Link href="/startup/create">
        <span className="max-sm:hidden">Create</span>
      </Link>
      <button type="submit">
        <span className="max-sm:hidden">Signin with GitHub</span>
      </button>
    </form>
  );
}
