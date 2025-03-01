import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Lock, 
  Database, 
  Trash2, 
  Plus,
  RefreshCw,
  Save
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [alertThreshold, setAlertThreshold] = useState('medium');
  const [dataRefreshInterval, setDataRefreshInterval] = useState('30');
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'API Disease.sh', key: 'dsh_k29fj39f93jf93jf9j3f9j3f', createdAt: '2023-10-15' },
    { id: 2, name: 'API Nextstrain', key: 'nxt_39fj39fj39fj39fj39fj39fj', createdAt: '2023-11-02' }
  ]);
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleAlertThresholdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAlertThreshold(event.target.value);
  };

  const handleDataRefreshIntervalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDataRefreshInterval(event.target.value);
  };

  const handleProfileSave = () => {
    setSnackbarMessage('Profil mis à jour avec succès');
    setSnackbarOpen(true);
  };

  const handlePasswordSave = () => {
    if (newPassword !== confirmPassword) {
      setSnackbarMessage('Les nouveaux mots de passe ne correspondent pas');
      setSnackbarOpen(true);
      return;
    }
    
    if (newPassword.length < 8) {
      setSnackbarMessage('Le mot de passe doit contenir au moins 8 caractères');
      setSnackbarOpen(true);
      return;
    }
    
    setSnackbarMessage('Mot de passe mis à jour avec succès');
    setSnackbarOpen(true);
    
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleNotificationsSave = () => {
    setSnackbarMessage('Paramètres de notification mis à jour avec succès');
    setSnackbarOpen(true);
  };

  const handleDataSettingsSave = () => {
    setSnackbarMessage('Paramètres de données mis à jour avec succès');
    setSnackbarOpen(true);
  };

  const handleAddApiKey = () => {
    const newKey = {
      id: apiKeys.length + 1,
      name: 'Nouvelle clé API',
      key: `key_${Math.random().toString(36).substring(2, 15)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setApiKeys([...apiKeys, newKey]);
    setSnackbarMessage('Nouvelle clé API générée');
    setSnackbarOpen(true);
  };

  const handleDeleteApiKey = (id: number) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    setSnackbarMessage('Clé API supprimée');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Paramètres</h1>
      <p className="text-gray-600 mb-6">Gérez les paramètres et préférences de votre compte</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Paramètres du profil */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5" />
              <h2 className="text-xl font-semibold ml-2">Paramètres du profil</h2>
            </div>
            <hr className="mb-4" />
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom complet</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Adresse email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rôle</label>
                <input
                  type="text"
                  value={user?.role === 'admin' ? 'Administrateur' : 'Personnel médical'}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                />
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
              <h2 className="text-xl font-semibold ml-2">Changer le mot de passe</h2>
            </div>
            <hr className="mb-4" />
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Mot de passe actuel</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirmer le nouveau mot de passe</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
              <h2 className="text-xl font-semibold ml-2">Paramètres de notification</h2>
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
                  Recevez des alertes par email pour les mises à jour importantes et les dépassements de seuil
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
                <label className="block text-sm font-medium text-gray-700">Seuil d'alerte</label>
                <select
                  value={alertThreshold}
                  onChange={handleAlertThresholdChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="low">Faible (Notifier pour tous les changements)</option>
                  <option value="medium">Moyen (Notifier pour les changements significatifs)</option>
                  <option value="high">Élevé (Notifier uniquement pour les changements critiques)</option>
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
              <h2 className="text-xl font-semibold ml-2">Paramètres des données</h2>
            </div>
            <hr className="mb-4" />
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Intervalle de rafraîchissement des données</label>
                <select
                  value={dataRefreshInterval}
                  onChange={handleDataRefreshIntervalChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                <button
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
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

          {/* Clés API */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <Database className="w-5 h-5" />
              <h2 className="text-xl font-semibold ml-2">Clés API</h2>
            </div>
            <hr className="mb-4" />
            
            <div className="bg-blue-50 p-4 rounded-md mb-4">
              <p className="text-sm text-blue-700">
                Les clés API sont utilisées pour se connecter à des sources de données externes. Gardez-les sécurisées.
              </p>
            </div>
            
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="bg-gray-50 p-4 rounded-md flex justify-between items-center">
                  <div>
                    <p className="font-medium">{apiKey.name}</p>
                    <p className="text-sm text-gray-600">{apiKey.key}</p>
                    <p className="text-sm text-gray-500">Créée le : {apiKey.createdAt}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteApiKey(apiKey.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            
            <button
              onClick={handleAddApiKey}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 mt-4"
            >
              <Plus className="w-4 h-4 mr-2" />
              Générer une nouvelle clé API
            </button>
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