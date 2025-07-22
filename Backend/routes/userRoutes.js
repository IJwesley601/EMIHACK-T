const express = require("express");
const router = express.Router();
const {
   getAllUsers,
   getUserById,
   createUser,
   updateUser,
   deleteUser,
   updateLastLogin,
} = require("../controllers/userController");
const authMiddleware = require("../utils/tokenMiddleware");

// Routes utilisateurs
router.get("/", authMiddleware.verifyToken, getAllUsers);

router.get("/:id", getUserById);
router.post("/ajouter", createUser);
router.put("/update/:id", authMiddleware.verifyToken, updateUser);
router.delete("/:id", deleteUser);
router.patch("/:id/login", updateLastLogin);

module.exports = router;
