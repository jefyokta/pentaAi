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
const axios = require("axios");
require("dotenv").config();
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
module.exports = claude;
