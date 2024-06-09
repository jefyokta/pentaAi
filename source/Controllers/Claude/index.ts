import {Router} from "express";
const Claude = Router();
import Clod from "../../Models/Claude/index.js";
interface ChatResponse {
  text: string;
}

Claude.get("/", async (req: any, res: any): Promise<any> => {
  res.status(403);
  try {
    const text = req.query.chat;
    const resp = await Clod.run(text);
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

export default Claude;
