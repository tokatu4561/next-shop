import type { GetStaticProps, NextPage } from "next";
import { useQuery } from "react-query";
import { Layout } from "../../components/Layout";
import { fetchJson } from "../../lib/api";
import { ICartItem } from "../../types/cart-item";

const CartPage: NextPage = () => {
  const query = useQuery("cartItems", () => fetchJson("/api/cart"));
  const cartItems: ICartItem[] = query.data;

  return (
    <Layout title="Cart">
      <table>
        <thead>
          <tr>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems &&
            cartItems.map((item) => (
              <tr>
                <th className="px-4 py-2">{item.product.title}</th>
                <th className="px-4 py-2">{`$${item.product.price}`}</th>
                <th className="px-4 py-2">{item.quantity}</th>
                <th className="px-4 py-2">
                  {`$${item.quantity * item.product.price}`}
                </th>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            <th></th>
            <th></th>
            <th>
              $
              {cartItems &&
                cartItems.reduce(
                  (total, item) => total + item.product.price * item.quantity,
                  0
                )}
            </th>
          </tr>
        </tfoot>
      </table>
    </Layout>
  );
};

export default CartPage;
