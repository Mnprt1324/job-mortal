const express=require("express");
const router=express.Router();
const { authenticate } = require("../middleware/auth");
const jobControllers=require("../controllers/job.controllers")

router.post("/createJob",authenticate,jobControllers.createJob);
router.get("/getAllJobs",jobControllers.getAlljob);
router.get("/getAllrecJob",authenticate,jobControllers.recruiterJobCreated);
router.get("/getJob/:id",authenticate,jobControllers.getJobById);
router.post("/updateJob/:id",authenticate,jobControllers.UpdateJob);
module.exports=router;