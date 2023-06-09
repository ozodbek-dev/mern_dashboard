import mongoose from 'mongoose'

const ProductStatSchema  = new mongoose.Schema({
    productId:String,
    yearlySalesTotal:Number,
    yearlySalesSoldUnits:Number,
    year:Number,
    monthlyData:[
        {
            month:String,
            totalSales:Number,
            totalUnits:Number,
        }
    ],
    dailyData:[{
        date:String,
        totalSales:Number,
        totalUnits:Number,
    }]

}, {timestamps:true});

export default mongoose.model("ProductStat", ProductStatSchema);