import {Router} from "express";
import {getSales} from "../controllers/salesCtrl.js";

const router = Router();

router.get('/',getSales)


export default router;