const jwt=require("jsonwebtoken");

module.exports.authenticate= (req,res,next)=>{
const token=req.cookies.token;
if(!token) return res.status(401).json({message:"Access denied"});
 try {
    const decode=jwt.verify(token,process.env.JWT_SECRET);
    req.user=decode;
    next();
 } catch (error) {
    return res.status(400).json({message:"Invalid token"})
 }
}