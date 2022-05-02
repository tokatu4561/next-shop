import React, { FC, ReactNode } from "react";

interface Props {
  type: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
  onClick?: () => void;
}

export const Button: FC<Props> = ({ type, children, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-green-800 text-gray-200 rounded px-4 py-2 hover:bg-green-700"
    >
      {children}
    </button>
  );
};
