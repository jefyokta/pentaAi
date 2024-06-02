"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
class GeminiClass {
    constructor() {
        this.genAi = new GoogleGenerativeAI(process.env.APIKEY);
        this.model = this.genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
    }
    run(promt) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.generateContent(promt);
            const res = yield result.response;
            console.log(res);
            return res;
        });
    }
    chat(promt) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const result = yield chat.sendMessage(promt);
            return result.response;
        });
    }
}
const gem = new GeminiClass();
module.exports = gem;
