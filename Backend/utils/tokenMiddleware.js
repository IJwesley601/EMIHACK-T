const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Récupérer le token du header
    if (!token) {
        return res.status(401).json({ message: "Accès refusé. Token manquant." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "votre_clé_secrète");
        req.userId = decoded.userId; // Ajouter l'ID de l'utilisateur à la requête
        next();
    } catch (error) {
        res.status(401).json({ message: "Token invalide ou expiré" });
    }
};