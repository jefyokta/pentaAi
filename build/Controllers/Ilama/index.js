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
const routeer = require("express");
const Ilama = routeer.Router();
const Ilm = require("../../Models/Ilama");
Ilama.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const text = req.query.chat;
        if (!text)
            res.status(400).json({ msg: 'chat is required!' });
        const resp = yield Ilm.request(text);
        console.log(resp);
        let ress;
        ress = {
            text: resp,
        };
        res.json(ress);
    }
    catch (error) {
        console.log(error);
    }
}));
module.exports = Ilama;
