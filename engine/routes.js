const auth = require("./middlewares/auth");
const adminAuth = require("./middlewares/adminAuth");
const express = require("express");
const router = express.Router();
const userC = require("./controllers/userController");

router.post("/signup", userC.register);
router.post("/login", userC.login);
router.get("/me", auth, userC.getUser);
router.put("/", auth, userC.updateProfile);
router.delete("/", auth, userC.deleteProfile);


// User Verification
// router.get("/verifyemail", userC.emailVerification);
// // User Forgot Password
// router.post("/forgot_password", userC.forgotPassword);
// // User Forgot Password Reset
// router.post("/forgot_password_reset", userC.forgotPasswordReset);
// // User Forgot Password Reset Check
// router.post("/forgot_password_reset_check", userC.forgotPasswordResetCheck);
// //details in user dashboard
// router.get("/mydashboard", auth, verificationAndBannedCheck, userC.getUserDashboardDetails);
// // Update and Get user details
// router.get("/userdetails", auth, verificationAndBannedCheck, userC.getUserPreferences);
// router.put("/userdetails", auth, verificationAndBannedCheck, userC.changeUserPreferences);
// // for announcement purpose
// // not implemented live for publishing the announcement, need to do manually from local system
// router.post("/createAnnoucement", userC.addAnnouncementByAdmin);
// router.put("/user:id", userC.updateUser);


module.exports = router;