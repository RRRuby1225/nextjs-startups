import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import NavbarAuth from "./NavbarAuth";
import { Skeleton } from "@/components/ui/skeleton"; // 暂时保留基础 Skeleton

const Navbar = () => {
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex-between">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        {/* 认证部分是动态的，保持 Suspense 包裹 */}
        <Suspense fallback={<Skeleton className="h-8 w-32" />}>
          <NavbarAuth />
        </Suspense>
      </nav>
    </header>
  );
};

export default Navbar;
