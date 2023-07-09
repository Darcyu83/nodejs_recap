import { RequestHandler } from "express";

import jwt from "jsonwebtoken";

export const verifyToken: RequestHandler = (req, res, next) => {
  console.log("JWT_SECRET", process.env.JWT_SECRET);
  console.log("req.header.authorization", req.headers.authorization);

  if (!req.headers.authorization)
    return res
      .status(401)
      .json({ code: 401, message: "인가되지 않은 접근입니다.(토큰정보 없음)" });

  if (!process.env.JWT_SECRET)
    return res.status(401).json({
      code: 401,
      message: "시스템 에러입니다. 관리자에게 문의하세요.",
    });

  try {
    res.locals.decoded = jwt.verify(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Iu2GoO2BsCDsg53shLHslYTsnbTrlJQiLCJuaWNrIjoieXVkcyIsImlhdCI6MTY4ODg4NDAyNCwiZXhwIjoxNjg5NDg0MDI0LCJpc3MiOiJ5dWRzIn0.JKKcj1aXT5xdXH_JA59oyRF5mwQO6oW0bSEZAS4_8u8",
      process.env.JWT_SECRET
    );

    return next();
  } catch (error) {
    if (!(error instanceof Error)) return next(error);
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰이 만기되었습다. 재로그인 바랍니다.",
      });
    }

    return res
      .status(401)
      .json({ code: 401, message: "유효하지 않은 토큰입니다." });
  }
};
