const route = require("express");
const Gemini = route.Router();
const Gem = require("../../Models/Gemini");
interface ChatResponse {
  text: string;
}

Gemini.get("/penta", async (req: any, res: any): Promise<any> => {
  try {
    const text = req.query.chat;
    if (!text) res.status(400).json({ msg: "chat is required!" });

    const resp = await Gem.chat(text);
    console.log(resp);
    let ress: ChatResponse;
    ress = {
      text: resp.text(),
    };
    res.json(ress);
  } catch (error) {
    console.log(error);
    res.status(500)
  }
});
Gemini.get("/", async (req: any, res: any): Promise<any> => {
  try {
    const text = req.query.chat;
    if (!text) res.status(400).json({ msg: "chat is required!" });

    const resp = await Gem.run(text);
    console.log(resp);
    let ress: ChatResponse;
    ress = {
      text: resp.text(),
    };
    res.json(ress);
  } catch (error) {
    console.log(error);
    res.status(500)
  }
});

module.exports = Gemini;
