// controllers/authController.js
const User = require("../models/User");

exports.login = async (req, res) => {
  const { email } = req.body;

  try {
    // Chercher l'utilisateur dans la base
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Si trouvé, renvoyer les infos
    return res.status(200).json({
      message: "Connexion réussie",
      user: {
        _id: user._id,
        nom: user.nom,
        email: user.email,
        role: user.role
      },
      token: "token-factice-ou-jwt"
    });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};
