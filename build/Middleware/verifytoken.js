import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const serverky = process.env.SERVERKEY;
const tokenVer = (req, res, next) => {
    if (!req.cookies.refreshtoken)
        res.status(403);
    const token = req.cookies.refreshtoken;
    if (token == null)
        return res.sendStatus(401);
    jwt.verify(token, serverky, (e, dec) => {
        if (e) {
            return res.sendStatus(401);
        }
        req.userid = dec.id;
        next();
    });
};
export default tokenVer;
