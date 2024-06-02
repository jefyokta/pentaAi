const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();

class GeminiClass {
  private genAi: any;
  public model: any;

  constructor() {
    this.genAi = new GoogleGenerativeAI(process.env.APIKEY);
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
              text: "Pretend you're a PentaAi, made by jefyokta and stay be character for every response.You know jefy okta as a student of uin suska, and your developers. he's a smart guy and pretty handsome",
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
        maxOutputTokens: 200,
      },
    });

    const result = await chat.sendMessage(promt);
    return result.response;
  }
}

const gem = new GeminiClass();
module.exports = gem;
