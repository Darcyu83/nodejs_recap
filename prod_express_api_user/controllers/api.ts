import axios, { AxiosError } from "axios";
import { RequestHandler } from "express";

export const test: RequestHandler = async (req, res, next) => {
  try {
    console.log("api/test  ===== 0 ");
    const result = await axios.get("http://localhost:4013/v1");
    console.log("api/test  ===== 1 ", result);
    return res.json(result.data);
  } catch (error) {}
};

export const getToken: RequestHandler = async (req, res, next) => {
  console.log("세션 테스트  ===== 0 ");
  try {
    console.log("세션 테스트 1 ");
    if (!req.session.jwt) {
      // 세션에 토큰이 없으면 토큰 발급 진행
      console.log("세션 테스트 2 ");
      const tokenResult: {
        data: { code: number; token: string; message: string };
      } = await axios.post("http://localhost:4013/v1/token");

      console.log("세션 테스트 tokenResult ", tokenResult);
      if (tokenResult.data.code === 200) {
        // 토큰발급 성공
        req.session.jwt = tokenResult.data.token;
      } else {
        return res.json(tokenResult.data);
      }

      console.log("세션 테스트 확인 요청 get   ");
      const result = await axios.get("http://localhost:4013/v1/test", {
        headers: { Authorization: req.session.jwt },
      });

      console.log("세션 테스트 확인 result  ", result);
      return res.json(result.data);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 419) {
        // 토큰 만기시
        return res.json(error.response.data);
      }
    } else {
      return next(error);
    }
  }
};
