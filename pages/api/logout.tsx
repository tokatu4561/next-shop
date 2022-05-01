import { NextApiHandler } from "next";
import cookie from "cookie";
import { fetchJson } from "../../lib/api";

const CMS_URL = process.env.CMS_URL;

const handler: NextApiHandler = async (req, res) => {
  res
    .status(200)
    .setHeader(
      "Set-Cookie",
      cookie.serialize("jwt", "", { path: "/api", expires: new Date(0) })
    )
    .json({});
};

export default handler;
