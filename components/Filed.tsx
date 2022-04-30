import React, { FC, ReactNode } from "react";
import { Input } from "./Input";

interface Props {
  label: string;
  children: ReactNode;
}

export const Field: FC<Props> = ({ label, children }) => {
  return (
    <>
      <label className="block my-2">
        <span className="block text-sm text-gray-600">{label}</span>
        {children}
      </label>
    </>
  );
};
