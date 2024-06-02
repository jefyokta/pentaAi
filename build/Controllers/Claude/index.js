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
const routes = require("express");
const Claude = routes.Router();
const Clod = require("../../Models/Claude/index");
Claude.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(403);
    try {
        const text = req.query.chat;
        const resp = yield Clod.run(text);
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
module.exports = Claude;
