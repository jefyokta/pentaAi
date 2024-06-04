"use strict";
const jwtVerify = require("jsonwebtoken");
require("dotenv").config();
const tokenVer = (req, res, next) => {
    //   console.log(req);
    if (!req.cookies.refreshtoken)
        res.status(403);
    const token = req.cookies.refreshtoken || false;
    const path = req.originalUrl;
    if (token == null)
        return res.sendStatus(401);
    jwtVerify.verify(token, process.env.SERVERKEY, (e, dec) => {
        if (e)
            return res.sendStatus(401);
        req.userid = dec.id;
        next();
    });
};
module.exports = tokenVer;
