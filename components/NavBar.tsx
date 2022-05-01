import Link from "next/link";
import React, { FC } from "react";
import { useSignOut, useUser } from "../hooks/user";

export const NavBar: FC = () => {
  const user = useUser();
  const signOut = useSignOut();

  return (
    <nav className="p-4 text-sm">
      <ul className="flex justify-between items-center">
        <li className="font-extrabold text-lg">
          <Link href="/">Next Shop</Link>
        </li>
        {user ? (
          <>
            <li className="space-x-4">
              <span>{user.name}</span>
              <button onClick={signOut}>Sign Out</button>
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
