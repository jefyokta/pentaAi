import { Router } from "express";

const Gemini = Router();
import Gem from "../../Models/Gemini/index.js";
interface ChatResponse {
  text: string | any;
}

Gemini.get("/penta", async (req: any, res: any): Promise<any> => {
  try {
    const text = req.query.chat;
    console.log(req.cookies.refreshtoken);
    if (!text) res.status(400).json({ msg: "chat is required!" });

    const resp: any = await Gem.chat(text);
    console.log(resp);
    let ress: ChatResponse;
    const tex = resp.text();
    ress = {
      text: tex,
    };
    res.json(ress);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});
Gemini.get("/", async (req: any, res: any): Promise<any> => {
  try {
    const text = req.query.chat;
    if (!text) res.status(400).json({ msg: "chat is required!" });

    const resp: any = await Gem.run(text);
    console.log(resp);
    let ress: ChatResponse;
    ress = {
      text: resp.text(),
    };
    res.json(ress);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

export { Gemini };
