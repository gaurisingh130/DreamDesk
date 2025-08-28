import express from "express";
import { register, updateProfile  ,login, logout} from "../controller/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload ,  register);
router.route("/login").post(login);
router.route("/profile/update").post(singleUpload ,  isAuthenticated,updateProfile);
router.route("/logout").get(logout);

export default router;