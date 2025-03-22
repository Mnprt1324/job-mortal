const express =require("express");
const router =express.Router();
const contactController=require("../controllers/contact.controllers")
router.post("/sendandsave",contactController.contactUs)

module.exports=router;