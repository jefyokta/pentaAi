import {Router}from "express";
const Ilama = Router();
import Ilm from "../../Models/Ilama/index.js";
interface ChatResponse {
  text: string;
}

Ilama.get("/", async (req: any, res: any): Promise<any> => {
  try {
    const text = req.query.chat;
    if (!text) res.status(400).json({msg:'chat is required!'})
    const resp = await Ilm.request(text)
    console.log(resp);
    let ress: ChatResponse;
    ress = {
      text: resp,
    };
    res.json(ress);
  } catch (error) {
    console.log(error);
  }
});

export default  Ilama;
