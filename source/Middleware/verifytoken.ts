import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()
  const serverky:any =process.env.SERVERKEY
const tokenVer = (req: any, res: any, next: any) => {


  if (!req.cookies.refreshtoken) res.status(403)
  const token = req.cookies.refreshtoken 
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, serverky, (e: any, dec: any) => {
    if (e) {
      return res.sendStatus(401);
    }
    req.userid = dec.id;
    next();
  });
};
export default tokenVer;
