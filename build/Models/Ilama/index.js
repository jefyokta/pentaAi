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
const Groq = require("groq-sdk");
require("dotenv").config();
class IlamaClass {
    constructor() {
        this.grok = new Groq({
            apyKey: process.env.GROQ_API_KEY,
        });
    }
    request(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.grok.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: req,
                    },
                ],
                model: "llama3-8b-8192",
            });
            return res.choices[0].message.content;
        });
    }
}
const illama = new IlamaClass();
module.exports = illama;
