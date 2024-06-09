import { __awaiter } from "tslib";
import { Router } from "express";
const Ilama = Router();
import Ilm from "../../Models/Ilama/index.js";
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
export default Ilama;
