import { __awaiter } from "tslib";
import { Router } from "express";
const Gemini = Router();
import Gem from "../../Models/Gemini/index.js";
Gemini.get("/penta", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const text = req.query.chat;
        console.log(req.cookies.refreshtoken);
        if (!text)
            res.status(400).json({ msg: "chat is required!" });
        const resp = yield Gem.chat(text);
        console.log(resp);
        let ress;
        const tex = resp.text();
        ress = {
            text: tex,
        };
        res.json(ress);
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
}));
Gemini.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const text = req.query.chat;
        if (!text)
            res.status(400).json({ msg: "chat is required!" });
        const resp = yield Gem.run(text);
        console.log(resp);
        let ress;
        ress = {
            text: resp.text(),
        };
        res.json(ress);
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
}));
export { Gemini };
