const  XLSX=require('xlsx');
const fs=require("fs");
const path=require("path")
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
    const wb=XLSX.utils.book_new();
    const ws=XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb,ws,"Income");
   const filePath = path.join(__dirname, "../temp/income_details.xlsx");

    // Ensure temp folder exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Write file to disk
    XLSX.writeFile(wb, filePath);

    // Send file as download
    res.download(filePath, "income_details.xlsx", (err) => {
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














