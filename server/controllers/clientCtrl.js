import ProductModel from "../models/product.model.js";
import ProductStatModel from "../models/product.stat.model.js";
import UserModel from "../models/user.model.js";
import TransactionModel from "../models/transaction.model.js";
import getCountryISO3 from 'country-iso-2-to-3';
export const getProducts = async(req,res)=>{
    try{
        const products = await ProductModel.find();
        const productsWithStats = await Promise.all(products.map(async prod=>{
            const stat = await ProductStatModel.find({
                productId:prod._id
            });
            return {
                ...prod._doc,
                stat
            }
        }))

        res.status(200).json(productsWithStats)
    }catch (e) {
        res.status(404).json({message:e.message})
    }
}
export const getCustomers = async(req,res)=>{
    try{
    const customers = await UserModel.find({role:"user"}).select("-password");
    res.status(200).json(customers)

    }catch (e) {
        res.status(404).json({message:e.message})
    }
}
export const getTransactions = async(req,res)=>{
    try{
        const {page=1, pageSize=20,sort=null,search=""} = req.query;
        const generalSort = ()=>{
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]:sortParsed.sort==='asc' ? 1:-1
            }
            return sortFormatted;
        }

        const sortFormatted = Boolean(sort) ? generalSort():{}

        const transactions = await TransactionModel.find({

        }).sort(sortFormatted)
            .skip(page*pageSize)
            .limit(pageSize)

        const total = await TransactionModel.countDocuments()


        res.status(200).json({
            transactions,
            total
        })
    }catch (e) {
        res.status(404).json({message:e.message})
    }
}
export const getGeography = async(req,res)=>{
    try{
       const users = await UserModel.find();
       const mappedLocations =  users.reduce((acc,{country})=>{
           const countryISON3 = getCountryISO3(country)
           if(!acc[countryISON3]){
               acc[countryISON3] = 0;
           }
           acc[countryISON3]++;
           return acc;
       },{});

       const formattedLocations = Object.entries(mappedLocations).map(
           ([country,count])=>{
               return {
                   id:country,
                   value:count
               }
           }
       );

       res.status(200).json(formattedLocations)
    }catch (e) {
        res.status(404).json({message:e.message})
    }
}