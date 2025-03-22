const mongoose =require("mongoose");

const companySchema=new mongoose.Schema({
  companyName:{type:String ,required:true},
  description:{type:String, },
  website:{type:String },
  location:{type:String, },
  logo:{type:String,},
  createdByUserId:{type:mongoose.Schema.Types.ObjectId, ref:"User",required:true}
},{timestamps:true});

module.exports=mongoose.model("Company",companySchema);