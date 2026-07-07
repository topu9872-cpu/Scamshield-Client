"use client";
import { authClient } from "@/lib/auth-Client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NavbarPage = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth");
        },
      },
    });
  };

  const NavData = (
    <>
      <li>
        <Link
          href="/"
          className={` ${pathName === "/" ? "text-white" : "text-gray-400"} text-[15px] font-bold`}
        >
          Home
        </Link>
      </li>

   {user && (
  <li>
    <Link
      href={user.role === "admin" ? "/dashboard/admin" : "/dashboard"}
      className={`${
        pathName === (user.role === "admin"
          ? "/dashboard/admin"
          : "/dashboard")
          ? "text-white"
          : "text-gray-400"
      } text-[15px] font-bold`}
    >
      Dashboard
    </Link>
  </li>
)}
    </>
  );

  return (
    <div className="mx-auto w-11/12">
      <div className="navbar shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-black border rounded-box mt-3 w-52 p-2 shadow"
            >
              {NavData}
            </ul>
          </div>
          <Image
            src="https://i.ibb.co.com/Kj1wcBqn/Chat-GPT-Image-Jul-6-2026-09-16-20-PM.png"
            alt="Logo"
            width={70}
            height={70}
          />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{NavData}</ul>
        </div>

        <div className="navbar-end">
          {isPending ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <div>
              {user ? (
                <div className="flex gap-4 items-center">
                  <h1 className="max-w-26 hover:max-w-xs truncate transition-all duration-2000 ease-in-out cursor-pointer">
                    Hi, {user?.name || "Guest"}
                  </h1>
                  <button
                    onClick={handleLogout}
                    className="btn bg-black text-white font-bold border border-white/70"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="btn bg-black text-white font-bold border border-white/70"
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarPage;
