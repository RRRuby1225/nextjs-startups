import Link from "next/link"
import { auth } from "@/auth"
import SignIn from "./sign-in";
import SignOut from "./sign-out";

const NavbarAuth = async () => {
    const session = await auth();
    
    return (
        <div className="flex items-center gap-5 text-black">
            {session && session?.user ? (
                <>
                    <Link href="/startup/create">
                        <span>Create</span>
                    </Link>
                    <SignOut />
                    <Link href={ `/user/${session?.user?.id}`}>
                        <span>{session?.user?.name}</span>
                    </Link>
                </>
            ) : (
                <SignIn />
            )}
        </div>
    );
}

export default NavbarAuth