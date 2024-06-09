import { __awaiter } from "tslib";
import { Router } from "express";
const Claude = Router();
import Clod from "../../Models/Claude/index.js";
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
export default Claude;
