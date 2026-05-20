const { signUp, login, getCurrentUser ,logout } = require("../controller/userController");
const express = require("express");
const authMiddleWare = require("../middleWare/userAuth");
const AuthRouter = express.Router();


AuthRouter.route("/signup").post(signUp);
AuthRouter.route("/login").post(login);
AuthRouter.route("/me").get(authMiddleWare,getCurrentUser);
AuthRouter.route("/logout").post(logout);


module.exports = AuthRouter;
