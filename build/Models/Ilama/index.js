import { __awaiter } from "tslib";
import Groq from "groq-sdk";
import dotenv from 'dotenv';
dotenv.config();
class IlamaClass {
    constructor() {
        this.grok = new Groq({
            apiKey: process.env.GROQ_API_KEY,
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
export default illama;
