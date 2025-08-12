const  xlsx=require('xlsx');
const User=require("../models/User");

const Income=require("../models/Income");

exports.addIncome=async(req,res)=>{
const userId=req.user.id;

try{
    const{icon,source,amount,date}=req.body;

    if(!source ||!amount ||!date){
        return res.status(400).json({
            message:"All fields are required"
        });
    }
        const newIncome=new Income({
            userId,
            icon,
            source,
            amount,
            date:new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);
}
catch(error){
    res.status(500).json({message:"Server Error"});
}
}

exports.getAllIncome=async(req,res)=>{
   const userId=req.user.id;
   
   try{
    const income=await Income.find({userId}).sort({date:-1});
    res.json(income);
   }catch(error){
    res.status(500).json({
        message:"Server Error"
    });
   }
}

exports.deleteIncome=async(req,res)=>{
    const userId=req.user.id;
    try{
await Income.findByIdAndDelete(req.params.id);
res.json({message:"Income deleted Successfully"});
    }catch(error){
        res.status(500).json({message:"server error"});
    }
}

exports.downloadIncomeExcel=async(req,res)=>{
 const userId=req.user.id;
 try{
    const income=await Income.find({userId}).sort({date:-1});

    const data=income.map((item)=>({
        Source:item.source,
        Amount:item.amount,
        Date:item.date,
    }));
    const wb=writeXLSX.utils.book_new();
    const ws=writeXLSX.utils.json_to_sheet(data);
    writeXLSX.utils.book_append_sheet(wb,ws,"Income");
    res.download('income_details.xlsx');

 }  catch(error){
    res.status(500).json({message:"Server Error"});
 } 
};