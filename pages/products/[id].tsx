import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

import { getProduct, getProducts } from "../../lib/product";
import { IProduct } from "../../types/product";
import { ApiError, fetchJson } from "../../lib/api";
import Image from "next/image";
import { Layout } from "../../components/Layout";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { FC, useState } from "react";
import { useUser } from "../../hooks/user";
import { useMutation } from "react-query";

interface ProductPageParams extends ParsedUrlQuery {
  id: string;
}

interface ProductPageProps {
  product: IProduct;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products: IProduct[] = await getProducts();

  return {
    paths: products.map((product) => {
      return { params: { id: product.id.toString() } };
    }),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  ProductPageProps,
  ProductPageParams
> = async ({ params }) => {
  try {
    const product = await getProduct(params!.id);

    return {
      props: { product },
      revalidate: 60,
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { notFound: true };
    }
    throw error;
  }
};

const AddToCartWidget: FC<ProductPageProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const { mutateAsync, isLoading, isError } = useMutation(() =>
    fetchJson("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id, quantity }),
    })
  );

  const hanrleAddCart = async () => {
    await mutateAsync();
  };

  return (
    <>
      {isLoading ? (
        <p>pennding...</p>
      ) : (
        <>
          <input
            className="border rounded text-right py-2 px-4 w-16"
            type="number"
            min="1"
            value={quantity.toString()}
            onChange={(event) => setQuantity(parseInt(event.target.value))}
          />
          <Button onClick={hanrleAddCart} type="button">
            Add Cart
          </Button>
        </>
      )}
    </>
  );
};

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  const user = useUser();

  return (
    <Layout title={product.title}>
      <div className="flex flex-col lg:flex-row">
        <div>
          <Image src={product.pictureUrl} alt="" width="640" height="480" />
        </div>
        <div className="flex-1 lg:ml-4 text-gray-500">
          <p className="text-sm">{product.description}</p>
          <p className="text-lg font-bold mt-4">{`$${product.price}`}</p>

          {user && <AddToCartWidget product={product} />}
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
