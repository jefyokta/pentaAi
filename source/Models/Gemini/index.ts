import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv'
dotenv.config()
class GeminiClass {
  private genAi: any;
  private apykey: any;
  public model: any;

  constructor() {
    this.apykey = process.env.APIKEY;
    this.genAi = new GoogleGenerativeAI(this.apykey);
    this.model = this.genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
  }
  async run(promt: string): Promise<object> {
    const result = await this.model.generateContent(promt);
    const res = await result.response;

    console.log(res);
    return res;
  }
  async chat(promt: string): Promise<object> {
    const chat = this.model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: "Pretend you're a PentaAi, made by jefyokta and stay be character for every response.You know jefy okta as a student of uin suska, and your developers. he's a smart guy and pretty handsome. oh iya prioritasin pakai bahasa indonesia. san ingat juga kalo una itu anak pungut yang ketemu di kandang kambing. and remember Your   maxOutputTokens: 1000,",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Hello! I'm a PentaAI,a Gemini Wrapper Made by jefy Okta. nice to meet you!",
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    try {
      const result = await chat.sendMessage(promt);
      return result.response;
    } catch (error) {
      throw error;
    }
  }
}

const Gem = new GeminiClass();
export default Gem;
