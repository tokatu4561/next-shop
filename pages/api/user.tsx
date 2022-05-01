import { NextApiHandler } from "next";
import cookie from "cookie";
import { fetchJson } from "../../lib/api";

const CMS_URL = process.env.CMS_URL;

const handler: NextApiHandler = async (req, res) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    res.status(401).end();
  }

  try {
    const { user } = await fetchJson(`${CMS_URL}/user/me`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    res.status(200).json({
      id: user.id,
      name: user.username,
    });
  } catch (error) {
    res.status(401).end();
  }
};

export default handler;
