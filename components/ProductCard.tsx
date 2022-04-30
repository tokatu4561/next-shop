import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { IProduct } from "../types/product";

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  return (
    <div className="p-4 border w-80 shadow hover:shadow-xl">
      <Link href={`/products/${product.id}`}>
        <a>
          <Image src={product.pictureUrl} alt="" width="320" height="240" />

          <div className="flex justify-between">
            <h2 className="text-lg font-bold">{product.title}</h2>
            <span>{`$${product.price}`}</span>
          </div>
        </a>
      </Link>
    </div>
  );
};
