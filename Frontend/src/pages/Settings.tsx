import React, { useEffect, useState } from "react";
import {
  User,
  Bell,
  Lock,
  Database,
  RefreshCw,
  Save,
} from "lucide-react";
import axios from "axios";

const Settings = () => {
  const [user, setUser] = useState<any | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [alertThreshold, setAlertThreshold] = useState("medium");
  const [dataRefreshInterval, setDataRefreshInterval] = useState("30");
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      nom: "API Disease.sh",
      key: "dsh_k29fj39f93jf93jf9j3f9j3f",
      createdAt: "2023-10-15",
    },
    {
      id: 2,
      nom: "API Nextstrain",
      key: "nxt_39fj39fj39fj39fj39fj39fj",
      createdAt: "2023-11-02",
    },
  ]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleAlertThresholdChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAlertThreshold(event.target.value);
  };

  const handleDataRefreshIntervalChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDataRefreshInterval(event.target.value);
  };
  // Appel à l'API pour mettre à jour le profil

  const [userId, setUserId] = useState(user?._id);

  const fetchUserById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/${userId}`
      );

      console.log(response.data);

      setNom(response.data.nom);
      setEmail(response.data.email);
      setRole(response.data.role);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchUserById();
  }, []);

  const handleProfileSave = async () => {
    try {
      // Données à envoyer pour la mise à jour du profil
      const updatedData = {
        nom,
        email,
        role,
      };

      const response = await axios.put(
        `http://localhost:3000/api/users/update/${user?._id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchUserById();
      setUser(response.data.user);
      console.log(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Afficher un message de succès
      setSnackbarMessage("Profil mis à jour avec succès");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
      setSnackbarMessage("Erreur lors de la mise à jour du profil");
      setSnackbarOpen(true);
    }
  };

  const handlePasswordSave = () => {
    if (newPassword !== confirmPassword) {
      setSnackbarMessage("Les nouveaux mots de passe ne correspondent pas");
      setSnackbarOpen(true);
      return;
    }

    if (newPassword.length < 8) {
      setSnackbarMessage("Le mot de passe doit contenir au moins 8 caractères");
      setSnackbarOpen(true);
      return;
    }

    setSnackbarMessage("Mot de passe mis à jour avec succès");
    setSnackbarOpen(true);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleNotificationsSave = () => {
    setSnackbarMessage("Paramètres de notification mis à jour avec succès");
    setSnackbarOpen(true);
  };

  const handleDataSettingsSave = () => {
    setSnackbarMessage("Paramètres de données mis à jour avec succès");
    setSnackbarOpen(true);
  };

  const handleAddApiKey = () => {
    const newKey = {
      id: apiKeys.length + 1,
      nom: "Nouvelle clé API",
      key: `key_${Math.random().toString(36).substring(2, 15)}`,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setApiKeys([...apiKeys, newKey]);
    setSnackbarMessage("Nouvelle clé API générée");
    setSnackbarOpen(true);
  };

  const handleDeleteApiKey = (id: number) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id));
    setSnackbarMessage("Clé API supprimée");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Paramètres</h1>
      <p className="text-gray-600 mb-6">
        Gérez les paramètres et préférences de votre compte
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Paramètres du profil */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5" />
              <h2 className="text-xl font-semibold ml-2">
                Paramètres du profil
              </h2>
            </div>
            <hr className="mb-4" />

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-4 text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Adresse email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-4 text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rôle
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 py-2.5 px-4 text-base"
                >
                  <option value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                  <option value={role != "admin" ? "admin" : "user"}>
                    {role != "admin" ? "Admin" : "User"}
                  </option>
                </select>
              </div>
              <button
                onClick={handleProfileSave}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Enregistrer les modifications
              </button>
            </div>
          </div>

          {/* Paramètres du mot de passe */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="flex items-center mb-4">
              <Lock className="w-5 h-5" />
              <h2 className="text-xl font-semibold ml-2">
                Changer le mot de passe
              </h2>
            </div>
            <hr className="mb-4" />

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-4 text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-4 text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirmer le nouveau mot de passe
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-4 text-base"
                />
              </div>
              <button
                onClick={handlePasswordSave}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Mettre à jour le mot de passe
              </button>
            </div>
          </div>
        </div>

        {/* Paramètres de notification */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="flex items-center mb-4">
              <Bell className="w-5 h-5" />
              <h2 className="text-xl font-semibold ml-2">
                Paramètres de notification
              </h2>
            </div>
            <hr className="mb-4" />

            <div className="space-y-4">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="ml-2">Notifications par email</span>
                </label>
                <p className="text-sm text-gray-500 ml-6">
                  Recevez des alertes par email pour les mises à jour
                  importantes et les dépassements de seuil
                </p>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={pushNotifications}
                    onChange={(e) => setPushNotifications(e.target.checked)}
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="ml-2">Notifications push</span>
                </label>
                <p className="text-sm text-gray-500 ml-6">
                  Recevez des notifications push en temps réel
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Seuil d'alerte
                </label>
                <select
                  value={alertThreshold}
                  onChange={handleAlertThresholdChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-4 text-base"
                >
                  <option value="low">
                    Faible (Notifier pour tous les changements)
                  </option>
                  <option value="medium">
                    Moyen (Notifier pour les changements significatifs)
                  </option>
                  <option value="high">
                    Élevé (Notifier uniquement pour les changements critiques)
                  </option>
                </select>
              </div>
              <button
                onClick={handleNotificationsSave}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Enregistrer les paramètres de notification
              </button>
            </div>
          </div>

          {/* Paramètres des données */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="flex items-center mb-4">
              <Database className="w-5 h-5" />
              <h2 className="text-xl font-semibold ml-2">
                Paramètres des données
              </h2>
            </div>
            <hr className="mb-4" />

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Intervalle de rafraîchissement des données
                </label>
                <select
                  value={dataRefreshInterval}
                  onChange={handleDataRefreshIntervalChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 px-4 text-base"
                >
                  <option value="15">Toutes les 15 minutes</option>
                  <option value="30">Toutes les 30 minutes</option>
                  <option value="60">Toutes les heures</option>
                  <option value="360">Toutes les 6 heures</option>
                  <option value="720">Toutes les 12 heures</option>
                  <option value="1440">Toutes les 24 heures</option>
                </select>
              </div>
              <div className="flex space-x-4">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Rafraîchir les données maintenant
                </button>
                <button
                  onClick={handleDataSettingsSave}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Enregistrer les paramètres des données
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Snackbar */}
      {snackbarOpen && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md">
          {snackbarMessage}
        </div>
      )}
    </div>
  );
};

export default Settings;
