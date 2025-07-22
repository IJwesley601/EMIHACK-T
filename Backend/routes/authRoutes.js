const express = require("express");
const router = express.Router();
const { forgotPassword, resetPassword, loginUser } = require("../controllers/userController");

// Réinitialisaion du mot de passe
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

//Authentification
router.post("/login", loginUser);

module.exports = router;
