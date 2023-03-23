import {Router} from "express";
import {getProducts, getCustomers,getTransactions,getGeography} from "../controllers/clientCtrl.js";

const router = Router();

router.route("/products").get(getProducts);
router.route("/customers").get(getCustomers);
router.route("/transactions").get(getTransactions);
router.route("/geography").get(getGeography);


export default router;