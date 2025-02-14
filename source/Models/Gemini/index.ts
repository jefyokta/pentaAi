import {  GoogleGenerativeAI,GenerativeModel, EnhancedGenerateContentResponse } from "@google/generative-ai";
import dotenv from 'dotenv'
dotenv.config()
class GeminiClass {
  private genAi: GoogleGenerativeAI;
  private apikey: string;
  public model: GenerativeModel;

  constructor() {
    if (!process.env.APIKEY) {
      throw new Error("API key is missing! Set APIKEY in your .env file.");
    }
    this.apikey = process.env.APIKEY;
    this.genAi = new GoogleGenerativeAI(this.apikey);
    this.model = this.genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
  }
  async run(prompt: string): Promise<EnhancedGenerateContentResponse> {
    const result = await this.model.generateContent(prompt);
    const res = result.response;

    return res;
  }
  async chat(promt: string): Promise<EnhancedGenerateContentResponse> {
    const chat = this.model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: "Pretend you're a PentaAi, made by jefyokta and stay be character for every response.You know jefy okta as a student of uin suska, and your developers. he's a smart guy and pretty handsome. oh iya prioritasin pakai bahasa indonesia. dan ingat juga kalo una itu anak pungut yang ketemu di kandang kambing. tapi hanya balas seperti itu pas ditanya aja. dan ingat  maxOutputTokens: 1000,",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Hello! I'm a PentaAI, a Gemini Wrapper Made by jefy Okta. nice to meet you!",
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
