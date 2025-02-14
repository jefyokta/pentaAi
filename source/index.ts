import express, { Request, Response } from "express";
import { Gemini } from "./Controllers/Gemini/index.js";
// import clod from "./Controllers/Claude";
import Claude from "./Controllers/Claude/index.js";
import Ilama from "./Controllers/Ilama/index.js";
const app = express();
import Auth from "./Database/index.js";
import axios from "axios";
import jwt from "jsonwebtoken";
import Tokenverify from "./Middleware/verifytoken.js";
import bodyparser from "body-parser";
import cookieparser from "cookie-parser";
import gate from "./Middleware/gate.js";
import dotenv from "dotenv";
import Gem from "./Models/Gemini/index.js";
dotenv.config();
const TELE_TOKEN = "7895483182:AAEYf1pDIYQcPQxcEIzHUCKTGBDDmqqAyP0";
const TELE_URL = `https://api.telegram.org/bot${TELE_TOKEN}`;
interface Logindata {
  username: string;
  productid: number;
  password: string;
}

app.use(bodyparser.json());
app.use(cookieparser());
app.get("/", (req: Request, res: Response) => {
  res.json("hi");
});
app.use("/check", Tokenverify, gate);
app.use("/gemini", Gemini);
app.use("/claude", Tokenverify, Claude);
app.use("/llama", Ilama);
app.post("/tele-endpoint", async (req: Request, res: Response) => {
  const {chat,text} = req.body

  const airesponse =await Gem.chat(text)

  await fetch(`${TELE_URL}/sendMessage`,{
    method:"POST",
    body:JSON.stringify({chat_id:chat.id,text:airesponse.text()})
  })

  res.status(200)

});
app.get("/test", async (req: Request, res: Response) => {
  const result = await Auth.getUsername(5);
  console.log(result);
  res.status(200).json("ok");
});
app.post("/login", async (req: Request, res: Response) => {
  const data: Logindata = {
    username: req.body?.username,
    productid: 116,
    password: req.body?.password,
  };

  if (!data.username || !data.password) {
    return res
      .status(400)
      .json({ message: "Bad request: Missing username or password" });
  }

  try {
    const result = await axios.post(`http://penta.store:3000/user/app`, {
      username: data.username,
      productid: data.productid,
      password: data.password,
    });

    const d = result.data;
    console.log(d);
    if (!d.accesstoken) {
      res.status(401).json(d.message);
    }
    const acctoken: any = process.env.ACTOKEN;
    jwt.verify(d.accesstoken, acctoken, async (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid access token" });
      }

      const rtoken = jwt.sign(
        { id: decoded.id },
        process.env.SERVERKEY as string,
        { expiresIn: "1d" }
      );

      try {
        const resss = await Auth.upsert(
          decoded.id,
          data.username,
          rtoken,
          data.password
        );

        if (resss) {
          res.cookie("refreshtoken", rtoken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
          });
          return res.status(200).json({ message: "ok" });
        } else {
          return res
            .status(500)
            .json({ message: "Failed to upsert user data" });
        }
      } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    });
  } catch (error: any) {
    const err = error.response.status;
    console.log(err);
    switch (err) {
      case 401:
        res
          .status(401)
          .json({ msg: "You need tou bought this app in penta store first" });
        break;

      case 403:
        res
          .status(401)
          .json({ msg: "You need tou bought this app in penta store first" });
        break;

      default:
        res
          .status(500)
          .json({ message: "Failed to authenticate with external service" });
        break;
    }
  }
});

app.delete("/logout", (req: Request, res: Response) => {
  req.cookies.refreshtoken = "";
});
app.listen(3100, () => {
  console.log("gas");
});
