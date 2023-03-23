import User from '../models/user.model.js'
import TransactionModel from "../models/transaction.model.js";
import OverallStatModel from "../models/overall.stat.model.js";
export const getUser=async(req,res)=>{
   try {
       const {id} = req.params;
       const user = await User.findById(id);
       res.status(200).json(user);

   }catch (e){
       res.status(404).json({message:e.message})
   }
}

export const getDashboardStats = async(req, res)=>{
    try {
        //hardcoded values
        const currentMonth= "November"
        const currentYear= 2021
        const currentDay = "2021-11-15";

    //Resent Transactions;
        const transactions =await TransactionModel.find().sort({createdAt:-1}).limit(50)
    //overall Stats
    const overallStat = await OverallStatModel.find({year:currentYear})
        const {
        totalCustomers,yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory
        }=overallStat[0]

        const thisMonthStats = overallStat[0].monthlyData.find(({month})=>{
            return month===currentMonth
        })

        const todayStats = overallStat[0].dailyData.find(({date})=>{
            return date === currentDay
        })

        res.status(200).json({
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
            todayStats,
            transactions,
            thisMonthStats,
        })

    }catch (e){
        res.status(404).json({message:e.message})
    }
}