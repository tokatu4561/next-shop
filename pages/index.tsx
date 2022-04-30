import type { GetStaticProps, NextPage } from "next";
import { Layout } from "../components/Layout";
import { ProductCard } from "../components/ProductCard";
import { getProducts } from "../lib/product";
import { IProduct } from "../types/product";

interface HomePageProps {
  products: IProduct[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const products = await getProducts();

  return {
    props: { products },
    revalidate: 60,
  };
};

const Home: NextPage<HomePageProps> = ({ products }) => {
  return (
    <Layout title="Plant Products">
      <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Home;
