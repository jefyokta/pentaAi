import Groq from "groq-sdk";
import dotenv from 'dotenv'
dotenv.config()
class IlamaClass {
  private grok: any;
  constructor() {
    this.grok = new Groq({
      apiKey: process.env.GROQ_API_KEY,
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
export default illama;
