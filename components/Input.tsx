import React, { FC } from "react";

interface Props {
  type: string;
}

export const Input: FC<Props> = ({ type }) => {
  return (
    <>
      <input className="border rounded-sm p-2 w-80" type={type}></input>
    </>
  );
};
