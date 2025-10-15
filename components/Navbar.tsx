import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { BadgePlus } from "lucide-react";
import SignIn from "./sign-in";
import SignOut from "./sign-out";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <SignOut />
              <Link href={`/user/${session?.user.name}`}>
                {session?.user.name}
              </Link>
            </>
          ) : (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>
              <SignIn />
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
