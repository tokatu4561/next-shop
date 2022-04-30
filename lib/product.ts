import { IProduct } from "../types/product";
import { fetchJson } from "./api";

const CMS_URL = process.env.CMS_URL;

const stripProduct = (product: any) => {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    pictureUrl: CMS_URL + product.picture.url,
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
