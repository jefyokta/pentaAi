const axi = require("axios");
const auth = require("../Database");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const accesstoken = process.env.ACTOKEN;
const tokenverify = async (req: any, res: any): Promise<any> => {
  console.log("omke")
  const token = req.cookies.refreshtoken;
  const red = req.query.redirect;
  if (!token) return res.sendStatus(401);
  try {
    const [result] = await auth.getRefreshtoken(token);
    if (!result) return res.sendStatus(403);
    let payload: object;
    payload = {
      username: result.data.username,
    };
    const acctoken = jwt.sign(payload, accesstoken, {
      expiresIn: "30s",
    });
    return res
      .cookies("accesstoken", acctoken)
      .redirect(process.env.SERVERHOST + "/" + red);
  } catch (error) {
    return res.sendStatus(500);
  }
};
module.exports = tokenverify;
