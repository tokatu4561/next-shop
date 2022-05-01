import { NextApiHandler } from "next";
import { fetchJson } from "../../lib/api";

const CMS_URL = process.env.CMS_URL;

const stripCartItem = (cartItem: any) => {
  return {
    id: cartItem.id,
    product: {
      id: cartItem.product.id,
      title: cartItem.product.title,
      price: cartItem.product.price,
    },
    quantity: cartItem.quantity,
  };
};

const handleGetCart: NextApiHandler = async (req, res) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }

  try {
    const cartItems = await fetchJson(`${CMS_URL}/cart-items`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    res.status(200).json(cartItems.map(stripCartItem));
  } catch (error) {
    res.status(401).end();
  }
};

const handlePostCart: NextApiHandler = async (req, res) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }

  const { productId, quantity } = req.body;

  try {
    await fetchJson(`${CMS_URL}/cart-items`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: productId, quantity }),
    });

    res.status(200).json({});
  } catch (error) {
    res.status(401).end();
  }
};

const handleCart: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      return handleGetCart(req, res);
    case "POST":
      return handlePostCart(req, res);
    default:
      res.status(405).end();
  }
};

export default handleCart;
