const  XLSX=require('xlsx');
const fs=require("fs");
const path=require("path")
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
        const newExpense=new Expense({
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
    const wb=XLSX.utils.book_new();
    const ws=XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb,ws,"Expense");
   const filePath = path.join(__dirname, "../temp/expense_details.xlsx");

    // Ensure temp folder exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Write file to disk
    XLSX.writeFile(wb, filePath);

    // Send file as download
    res.download(filePath, "expense_details.xlsx", (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).json({ message: "Error downloading file" });
      } else {
        // Delete the file after sending
        fs.unlinkSync(filePath);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};