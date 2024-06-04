const express = require("express");
const gemini = require("./Controllers/Gemini");
const clod = require("./Controllers/Claude");
const Ilam = require("./Controllers/Ilama");
const app = express();
const au = require("./Database");
const axio = require("axios");
const jwtIndex = require("jsonwebtoken");
const Token = require("./Middleware/token");
const Tokenverify = require("./Middleware/verifytoken");
const bodyparser = require("body-parser");
require("dotenv").config();
const cookieparser = require("cookie-parser");
interface Logindata {
  username: string;
  productid: number;
  password: string;
}
app.use(bodyparser.json());
app.use(cookieparser());

app.get("/", (req: any, res: any) => {
  res.json("helloworld");
});
app.get("/token", Token);
app.get("/memek", (req: any, res: any) => console.log(req.route.path));
app.use("/gemini", Tokenverify, gemini);
app.use("/claude", Tokenverify, clod);
app.use("/llama", Tokenverify, Ilam);
app.get("/test", async (req: any, res: any) => {
  const result = await au.getUsername(5);
  console.log(result);
  res.status(200).json("ok");
});
app.post("/login", async (req: any, res: any) => {
  let data: Logindata;

  data = {
    username: req.body.username,
    productid: 116,
    password: req.body.password,
  };
  console.log(data.username);
  if (!data.username) res.status(402);
  const result = await axio.post(`http://penta.store:3000/user/app`, {
    username: data.username,
    productid: data.productid,
    password: data.password,
  });

  const d = result.data;
  jwtIndex.verify(
    d.accesstoken,
    process.env.ACTOKEN,
    async (e: any, dec: any) => {
      if (e) res.status(403);
      const rtoken = jwtIndex.sign({ id: dec.id }, process.env.SERVERKEY);
      const resss = await au.upsert(
        dec.id,
        data.username,
        rtoken,
        data.password
      );
      console.log(resss);

      if (resss) {
        res.cookie("refreshtoken", rtoken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json("ok");
      }
    }
  );
});

app.listen(3100, () => {
  console.log("gas");
});
