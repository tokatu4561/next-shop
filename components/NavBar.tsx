import Link from "next/link";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useUser } from "../hooks/user";
import { fetchJson } from "../lib/api";
import { IUser } from "../types/user";

export const NavBar: FC = () => {
  const user: IUser = useUser();

  const handleSignOut = async () => {
    await fetchJson("/api/logout");
    // setUser(undefined);
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
