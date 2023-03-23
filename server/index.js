import express from 'express'
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors  from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
// import routes
import clientRoutes from "./routes/client.routes.js";
import salesRoutes from "./routes/sales.routes.js";
import generalRoutes from "./routes/general.routes.js";
import managementRoutes from "./routes/management.routes.js";
import {
    dataAffiliateStat,
    dataOverallStat,
    dataProduct,
    dataProductStat,
    dataTransaction,
    dataUser
} from "./data/index.js";
import User from './models/user.model.js'
import Product from "./models/product.model.js";
import ProductStat from "./models/product.stat.model.js";
import TransactionModel from "./models/transaction.model.js";
import AffiliateStatModel from "./models/affiliate.stat.model.js";
import OverallStatModel from "./models/overall.stat.model.js";


//CONFIGURATION
dotenv.config();
const app = express();

// User middleware;
app.use(express.json())
app.use(helmet());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(morgan("common"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors());
//Routes
app.use('/client',clientRoutes);
app.use('/general',generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales",salesRoutes)


// Mongoose setup
 const port = process.env.PORT || 4001;

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then((res)=>{
        console.log(`mongodb host: ${res.connection.host}`)
    app.listen(port, ()=>console.log("Server Connected: " + port))
        // User.insertMany(dataUser)
        // Product.insertMany(dataProduct)
        // ProductStat.insertMany(dataProductStat)
        // TransactionModel.insertMany(dataTransaction)
        // overallStateModel.insertMany(dataOverallStat);
        // AffiliateStatModel.insertMany(dataAffiliateStat)
})
    .catch(err=>{
        console.log(`${err} did not connected to the mongodb and server`)
    })
