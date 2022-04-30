import React, { ChangeEvent, FC } from "react";

interface Props {
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<Props> = (props) => {
  return (
    <>
      <input className="border rounded-sm p-2 w-80" {...props}></input>
    </>
  );
};
