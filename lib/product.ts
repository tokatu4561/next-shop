import { IProduct } from "../types/product";
import { fetchJson } from "./api";

const CMS_URL = process.env.CMS_URL;

const stripProduct = (product: IProduct) => {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
  };
};

export const getProduct = async (id: string) => {
  const product = await fetchJson(`${CMS_URL}/products/${id}`);

  return stripProduct(product);
};

export const getProducts = async () => {
  const products = await fetchJson(`${CMS_URL}/products`);

  return products.map(stripProduct);
};
