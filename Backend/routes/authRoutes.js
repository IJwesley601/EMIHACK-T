const express = require("express");
const router = express.Router();
const { forgotPassword, resetPassword } = require("../controllers/userController");
const authController = require("../controllers/authController");

// Réinitialisaion du mot de passe
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

//Authentification
router.post("/login", authController.login);

module.exports = router;
