const  xlsx=require('xlsx');
const User=require("../models/User");

const Expense=require("../models/Expense");

exports.addExpense=async(req,res)=>{
const userId=req.user.id;

try{
    const{icon,category,amount,date}=req.body;

    if(!category ||!amount ||!date){
        return res.status(400).json({
            message:"All fields are required"
        });
    }
        const newIncome=new Expense({
            userId,
            icon,
            category,
            amount,
            date:new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
}
catch(error){
    res.status(500).json({message:"Server Error"});
}
}

exports.getAllExpense=async(req,res)=>{
   const userId=req.user.id;
   
   try{
    const expense=await Expense.find({userId}).sort({date:-1});
    res.json(expense);
   }catch(error){
    res.status(500).json({
        message:"Server Error"
    });
   }
}

exports.deleteExpense=async(req,res)=>{
    const userId=req.user.id;
    try{
await Expense.findByIdAndDelete(req.params.id);
res.json({message:"Expense deleted Successfully"});
    }catch(error){
        res.status(500).json({message:"server error"});
    }
}

exports.downloadExpenseExcel=async(req,res)=>{
 const userId=req.user.id;
 try{
    const expense=await Expense.find({userId}).sort({date:-1});

    const data=expense.map((item)=>({
        Category:item.category,
        Amount:item.amount,
        Date:item.date,
    }));
    const wb=writeXLSX.utils.book_new();
    const ws=writeXLSX.utils.json_to_sheet(data);
    writeXLSX.utils.book_append_sheet(wb,ws,"Expense");
    res.download('expense_details.xlsx');

 }  catch(error){
    res.status(500).json({message:"Server Error"});
 } 
};