import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useSignOut, useUser } from "../hooks/user";

export const NavBar: FC = () => {
  const user = useUser();
  const router = useRouter();
  const signOut = useSignOut();

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <nav className="p-4 text-sm">
      <ul className="flex justify-between items-center">
        <li className="font-extrabold text-lg">
          <Link href="/">Next Shop</Link>
        </li>
        {user ? (
          <>
            <li className="space-x-4">
              <Link href="/cart">Cart</Link>
              <span>{user.name}</span>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/sign-in">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
