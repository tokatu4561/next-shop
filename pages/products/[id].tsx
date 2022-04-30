import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import Link from "next/link";
import { getProduct, getProducts } from "../../lib/product";
import { IProduct } from "../../types/product";
import { ApiError } from "../../lib/api";
import Image from "next/image";
import { Layout } from "../../components/Layout";

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

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  return (
    <Layout title={product.title}>
      <div className="flex flex-col lg:flex-row">
        <div>
          <Image src={product.pictureUrl} alt="" width="640" height="480" />
        </div>
        <div className="flex-1 lg:ml-4 text-gray-500">
          <p className="text-sm">{product.description}</p>
          <p className="text-lg font-bold mt-4">{`$${product.price}`}</p>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
