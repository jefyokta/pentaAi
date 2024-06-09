import { __awaiter } from "tslib";
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
class ClaudeCLass {
    constructor() {
        this.claudekey = process.env.CLAUDEKEY;
    }
    setopt(req) {
        let opt;
        return (opt = {
            method: "POST",
            url: "https://claude-3.p.rapidapi.com/messages",
            headers: {
                "content-type": "application/json",
                "X-RapidAPI-Key": this.claudekey,
                "X-RapidAPI-Host": "claude-3.p.rapidapi.com",
            },
            data: {
                model: "claude-3-opus-20240229",
                max_tokens: 1024,
                messages: [
                    {
                        role: "user",
                        content: req,
                    },
                ],
            },
        });
    }
    run(text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const op = this.setopt(text);
                const res = yield axios.request(op);
                console.log(res.data);
                return res.data;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
const claude = new ClaudeCLass();
export default claude;
