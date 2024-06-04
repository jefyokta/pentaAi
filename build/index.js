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
const express = require("express");
const gemini = require("./Controllers/Gemini");
const clod = require("./Controllers/Claude");
const Ilam = require("./Controllers/Ilama");
const app = express();
const au = require("./Database");
const axio = require("axios");
const jwtIndex = require("jsonwebtoken");
const Token = require("./Middleware/token");
const Tokenverify = require("./Middleware/verifytoken");
const bodyparser = require("body-parser");
require("dotenv").config();
const cookieparser = require("cookie-parser");
app.use(bodyparser.json());
app.use(cookieparser());
app.get("/", (req, res) => {
    res.json("helloworld");
});
app.get("/token", Token);
app.get("/memek", (req, res) => console.log(req.route.path));
app.use("/gemini", Tokenverify, gemini);
app.use("/claude", Tokenverify, clod);
app.use("/llama", Tokenverify, Ilam);
app.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield au.getUsername(5);
    console.log(result);
    res.status(200).json("ok");
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data;
    data = {
        username: req.body.username,
        productid: 116,
        password: req.body.password,
    };
    console.log(data.username);
    if (!data.username)
        res.status(402);
    const result = yield axio.post(`http://penta.store:3000/user/app`, {
        username: data.username,
        productid: data.productid,
        password: data.password,
    });
    const d = result.data;
    jwtIndex.verify(d.accesstoken, process.env.ACTOKEN, (e, dec) => __awaiter(void 0, void 0, void 0, function* () {
        if (e)
            res.status(403);
        const rtoken = jwtIndex.sign({ id: dec.id }, process.env.SERVERKEY);
        const resss = yield au.upsert(dec.id, data.username, rtoken, data.password);
        console.log(resss);
        if (resss) {
            res.cookie("refreshtoken", rtoken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json('ok');
        }
    }));
}));
app.listen(3100, () => {
    console.log("gas");
});
