const routes = require("express");
const Claude = routes.Router();
const Clod = require("../../Models/Claude/index");
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

module.exports = Claude;
