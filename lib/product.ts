import { IProduct } from "../types/product";

const stripProduct = (product: IProduct) => {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
  };
};

export const getProduct = async (id: string) => {
  const response = await fetch(`http://localhost:1337/products/${id}`);
  const product = await response.json();

  return stripProduct(product);
};

export const getProducts = async () => {
  const response = await fetch("http://localhost:1337/products");
  const products = await response.json();

  return products.map(stripProduct);
};
