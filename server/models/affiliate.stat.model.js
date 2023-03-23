import mongoose from 'mongoose'

const affiliateSchema  = new mongoose.Schema({
   userId:{
       type:mongoose.Types.ObjectId,
       ref:"User",
       affiliateSales:{
           type:[mongoose.Types.ObjectId],
           ref:"Transactions"
       }
   },

}, {timestamps:true});

export default mongoose.model("AffiliateStat", affiliateSchema);