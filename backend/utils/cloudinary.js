const cloudinary=require("cloudinary").v2;
const dotenv=require("dotenv");
dotenv.config();

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_name, 
    api_key:  process.env.CLOUDINARY_Api_key,
    api_secret:process.env.CLOUDINARY_api_secret,
});

module.exports=cloudinary