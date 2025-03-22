const express =require("express");
const router =express.Router();
const applicationControllers=require("../controllers/application.controllers");
const { authenticate } = require("../middleware/auth");

router.post("/apply/:id", authenticate,applicationControllers.applyJob)
router.get("/getAppliedJob",authenticate,applicationControllers.getAppliedJobs)
router.get("/:id/applicants", authenticate,applicationControllers.getApplicants)
router.post("/status/:id/applicants", authenticate,applicationControllers.updateStatus)
 
module.exports=router;