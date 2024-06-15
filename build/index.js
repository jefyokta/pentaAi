import { __awaiter } from "tslib";
import express from "express";
import { Gemini } from "./Controllers/Gemini/index.js";
// import clod from "./Controllers/Claude";
import Claude from "./Controllers/Claude/index.js";
import Ilama from "./Controllers/Ilama/index.js";
const app = express();
import Auth from "./Database/index.js";
import axios from "axios";
import jwt from "jsonwebtoken";
import Tokenverify from "./Middleware/verifytoken.js";
import bodyparser from "body-parser";
import cookieparser from "cookie-parser";
import gate from "./Middleware/gate.js";
import dotenv from "dotenv";
dotenv.config();
app.use(bodyparser.json());
app.use(cookieparser());
app.get("/", (req, res) => {
    res.json("akmal kontol");
});
app.use("/check", Tokenverify, gate);
app.use("/gemini", Gemini);
app.use("/claude", Tokenverify, Claude);
app.use("/llama", Tokenverify, Ilama);
app.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Auth.getUsername(5);
    console.log(result);
    res.status(200).json("ok");
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const data = {
        username: (_a = req.body) === null || _a === void 0 ? void 0 : _a.username,
        productid: 116,
        password: (_b = req.body) === null || _b === void 0 ? void 0 : _b.password,
    };
    if (!data.username || !data.password) {
        return res
            .status(400)
            .json({ message: "Bad request: Missing username or password" });
    }
    try {
        const result = yield axios.post(`http://penta.store:3000/user/app`, {
            username: data.username,
            productid: data.productid,
            password: data.password,
        });
        const d = result.data;
        console.log(d);
        if (!d.accesstoken) {
            res.status(401).json(d.message);
        }
        const acctoken = process.env.ACTOKEN;
        jwt.verify(d.accesstoken, acctoken, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(403).json({ message: "Invalid access token" });
            }
            const rtoken = jwt.sign({ id: decoded.id }, process.env.SERVERKEY, { expiresIn: "1d" });
            try {
                const resss = yield Auth.upsert(decoded.id, data.username, rtoken, data.password);
                if (resss) {
                    res.cookie("refreshtoken", rtoken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 24 * 60 * 60 * 1000,
                    });
                    return res.status(200).json({ message: "ok" });
                }
                else {
                    return res
                        .status(500)
                        .json({ message: "Failed to upsert user data" });
                }
            }
            catch (error) {
                console.error("Database error:", error);
                return res.status(500).json({ message: "Internal server error" });
            }
        }));
    }
    catch (error) {
        const err = error.response.status;
        console.log(err);
        switch (err) {
            case 401:
                res
                    .status(401)
                    .json({ msg: "You need tou bought this app in penta store first" });
                break;
            case 403:
                res
                    .status(401)
                    .json({ msg: "You need tou bought this app in penta store first" });
                break;
            default:
                res
                    .status(500)
                    .json({ message: "Failed to authenticate with external service" });
                break;
        }
    }
}));
app.delete("/logout", (req, res) => {
    req.cookies.refreshtoken = "";
});
app.listen(3100, () => {
    console.log("gas");
});
