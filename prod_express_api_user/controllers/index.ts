import axios, { AxiosError } from "axios";
import { Request, RequestHandler } from "express";
import jwt from "jsonwebtoken";

const URL = process.env.API_URL;

axios.defaults.baseURL = URL;
axios.defaults.headers.origin = process.env.ORIGIN!; //origin 헤더 추가

export const requestAPI = async (req: Request, api: string): Promise<any> => {
  try {
    if (!req.session.jwt) {
      const tokenResult: {
        data: { code: number; message: string; token: string };
      } = await axios.post(`/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });

      req.session.jwt = tokenResult.data.token;
    }

    axios.defaults.headers["Authorization"] = req.session.jwt;

    const result = await axios.get(`${api}`, {
      headers: { Authorization: req.session.jwt },
    });

    return result;
  } catch (error) {
    console.error(error);

    if (error instanceof AxiosError) {
      if (error.response?.status === 419) {
        delete req.session.jwt;
        return requestAPI(req, api);
      }
    }

    throw error;
  }
};

export const getMyPosts: RequestHandler = async (req, res, next) => {
  try {
    const result = await requestAPI(req, "/posts/my");
    res.json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
export const searchByHashtag: RequestHandler = async (req, res, next) => {
  try {
    const result = await requestAPI(
      req,
      `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`
    );

    res.json(result.data);
  } catch (error) {
    if (error instanceof AxiosError && error.code) {
      console.error(error);
      next(error);
    }
  }
};

export const test: RequestHandler = async (req, res, next) => {
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
