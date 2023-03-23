import OverallStatModel from "../models/overall.stat.model.js";


export const getSales = async  (req, res)=>{
    try {
    const overallStats = await OverallStatModel.find();
    res.status(200).json(overallStats[0])
    }
    catch (e){
        res.status(404).json({message:e.message})
    }
}