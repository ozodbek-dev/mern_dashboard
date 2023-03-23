import mongoose, {Schema} from 'mongoose';

const overallStateSchema = new Schema({
    totalCustomers:Number,
    yearlySalesTotal : Number,
    yearlyTotalSoldUnits:Number,
    year:Number,
    monthlyData:[
        {
            month:String,
            totalSales:Number,
            totalUnits:Number
        }

    ],
    dailyData:[{
        date:String,
        totalSales:Number,
        totalUnits:Number
    }],
    salesByCategory:{
        type:Map,
        of:Number
    }
}, {timestamps:true})

export default mongoose.model("OverallStat", overallStateSchema)
