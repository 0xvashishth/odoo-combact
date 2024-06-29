const auth = require("./middlewares/auth");
const adminAuth = require("./middlewares/adminAuth");
const express = require("express");
const router = express.Router();
const userC = require("./controllers/userController");
const furnitureC = require("./controllers/furnitureController");
const bookingC = require("./controllers/bookingController");

// User Routes
router.post("/user/signup", userC.register);
router.post("/user/login", userC.login);
router.get("/user/me", auth, userC.getUser);
router.put("/user/", auth, userC.updateProfile);
router.delete("/user/", auth, userC.deleteProfile);


// Furniture Routes
router.post("/furniture/", adminAuth, furnitureC.addFurniture);
router.put("/furniture/", adminAuth, furnitureC.updateFurniture);
router.delete("/furniture/", adminAuth, furnitureC.deleteFurniture);
router.get("/furniture/:id", furnitureC.getFurniture);
router.get("/furniture", furnitureC.getAllFurniture);

// Booking Routes
router.post("/booking", auth, bookingC.bookFurniture);

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