import Link from "next/link";
import React, { FC, ReactNode } from "react";

export const NavBar: FC = () => {
  const user = { name: "Alice" };

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
              <button>Sign Out</button>
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
