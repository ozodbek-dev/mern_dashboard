import mongoose, {Schema, Types} from 'mongoose'

const TransactionSchema = new Schema({
    userId:String,
    cost: String,
    products : {
        type:[Types.ObjectId],
        of:Number,
    }
}, {timestamps:true})
export default mongoose.model("Transaction", TransactionSchema)