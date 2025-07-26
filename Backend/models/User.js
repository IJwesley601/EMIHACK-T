const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    verification: { type: Boolean, default: false },
    derniere_connexion: { type: Date, default: Date.now },
    date_creation: { type: Date, default: Date.now },
    resetToken:{type: String}, //? Pour stocker le token temporaire
    resetTokenExpiration: {type: Date} //? Date d'exiration du token
});

module.exports = mongoose.model("User", userSchema);
