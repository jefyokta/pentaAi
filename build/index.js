"use strict";
const express = require("express");
const gemini = require("./Controllers/Gemini");
const clod = require("./Controllers/Claude");
const Ilam = require("./Controllers/Ilama");
const app = express();
app.get("/", (req, res) => {
    res.json("helloworld");
});
app.use("/gemini", gemini);
app.use("/claude", clod);
app.use("/llama", Ilam);
// app.get("/gpt", async (req: any, res: any) => {});
app.listen(3100, () => {
    console.log("gas");
});
