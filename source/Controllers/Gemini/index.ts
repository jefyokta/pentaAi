const route = require("express");
const Gemini = route.Router();
const Gem = require("../../Models/Gemini");
interface ChatResponse {
  text: string;
}

Gemini.get("/", async (req: any, res: any): Promise<any> => {
  try {
    const text = req.query.chat;
    const resp = await Gem.chat(text);
    console.log(resp);
    let ress:ChatResponse
    ress = {
      text: resp.text(),
    };
    res.json(ress);
  } catch (error) {
    console.log(error);
  }
});

module.exports = Gemini;
