import axios from "axios";
import { RequestHandler } from "express";

import jwt from "jsonwebtoken";

export const v1get: RequestHandler = async (req, res, next) => {
  try {
    console.log("v1get  ===== 0 ");
    const result = await axios.get("http://localhost:4013/v1");
    console.log("v1get  ===== 1 ", result.data);

    return res.json(result);
  } catch (error) {}
};

export const createToken: RequestHandler = (req, res) => {
  try {
    return res.status(200).json({
      code: 200,

      message: "토큰 발행되었어요.",

      token: jwt.sign(
        {
          id: "토큰 생성아이디",
          nick: "yuds",
        },
        process.env.JWT_SECRET || "yudsTempSecret",
        { expiresIn: 10 * 60 * 1000, issuer: "yuds" }
      ),
    });
  } catch (error) {
    console.log("JWT Token Error ", error);
    return res.status(500).json({ code: 500, message: "서버 에러" });
  }
};

export const tokenTest: RequestHandler = (req, res) => {
  res.json(res.locals.decoded);
};
