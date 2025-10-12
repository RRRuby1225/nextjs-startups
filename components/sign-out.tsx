import { signOut } from "@/auth";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">
        <span className="max-sm:hidden">Sign Out</span>
      </button>
    </form>
  );
}
