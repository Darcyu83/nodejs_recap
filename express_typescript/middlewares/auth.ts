import { IRequestHandlers } from "../controllers/types";

export const authMiddleware: IRequestHandlers = {
  isLoggedIn: (req, res, next) => {
    console.log("req.query ==== ", req.query);
    if (Object.keys(req.query).length > 1) {
      next();
    } else {
      res.redirect("/auth/login");
    }
  },
};
