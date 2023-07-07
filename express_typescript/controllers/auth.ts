import { IRequestHandlers } from "./types";

const authController: IRequestHandlers = {
  login: (req, res, next) => {
    res.send({ message: "login router 탔음" });
  },
};

export default authController;
