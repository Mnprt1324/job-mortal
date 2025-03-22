const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controllers");
const upload = require("../middleware/multer");
const { authenticate } = require("../middleware/auth");

router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.loginUser);
router.post("/logout", userControllers.logoutUser);
router.post("/password/forget",userControllers.forgetUserPassword);
router.post("/password/verify",userControllers.verifyPass);
router.post("/password/update",userControllers.updateUserPass)
router.post("/profile/update",upload.single("profileImage"),authenticate,userControllers.updateUserProfile);
//extra
// router.get("/auth",userControllers.auth);

module.exports = router;
// ,upload.single("image")