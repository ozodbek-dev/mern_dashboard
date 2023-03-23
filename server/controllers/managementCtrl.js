import UserModel from "../models/user.model.js";
import mongoose from "mongoose";
import TransactionModel from "../models/transaction.model.js";
export const getAdmins = async(req,res)=>{
    try {
        const admins = await UserModel.find({role:"admin"}).select('-password')
        res.status(200).json(admins)
    }catch (e){
        res.status(404).json(e.message)
    }
}
export const getUserPerformance = async (req, res) => {
    try {
        const { id } = req.params;

        const userWithStats = await UserModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "affiliatestats",
                    localField: "_id",
                    foreignField: "userId",
                    as: "affiliateStats",
                },
            },
            { $unwind: "$affiliateStats" },
        ]);
        const saleTransactions = await Promise.all(
            userWithStats[0].affiliateSales.map((id) => {
                return TransactionModel.findById(id);
            })
        );
        const filteredSaleTransactions = saleTransactions.filter(
            (transaction) => transaction !== null
        );

        res
            .status(200)
            .json({ user: userWithStats[0], sales: filteredSaleTransactions });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};