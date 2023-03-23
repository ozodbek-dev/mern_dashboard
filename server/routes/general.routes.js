import {Router} from "express";
import {getUser,getDashboardStats} from "../controllers/generalCtrl.js";

const router = Router();
router.route("/user/:id").get(getUser);
router.route("/dashboard").get(getDashboardStats);

export default router;