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
const axi = require("axios");
const auth = require("../Database");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const accesstoken = process.env.ACTOKEN;
const tokenverify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("omke");
    const token = req.cookies.refreshtoken;
    const red = req.query.redirect;
    if (!token)
        return res.sendStatus(401);
    try {
        const [result] = yield auth.getRefreshtoken(token);
        if (!result)
            return res.sendStatus(403);
        let payload;
        payload = {
            username: result.data.username,
        };
        const acctoken = jwt.sign(payload, accesstoken, {
            expiresIn: "30s",
        });
        return res
            .cookies("accesstoken", acctoken)
            .redirect(process.env.SERVERHOST + "/" + red);
    }
    catch (error) {
        return res.sendStatus(500);
    }
});
module.exports = tokenverify;
