const Groq = require("groq-sdk");
require("dotenv").config();
class IlamaClass {
  private grok: any;
  constructor() {
    this.grok = new Groq({
      apyKey: process.env.GROQ_API_KEY,
    });
  }
  async request(req: string) {
    const res = await this.grok.chat.completions.create({
      messages: [
        {
          role: "user",
          content: req,
        },
      ],
      model: "llama3-8b-8192",
    });
    return res.choices[0].message.content;
  }
}

const illama = new IlamaClass();
module.exports = illama;
