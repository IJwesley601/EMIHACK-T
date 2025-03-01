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
    { id: 1, name: 'Disease.sh API', key: 'dsh_k29fj39f93jf93jf9j3f9j3f', createdAt: '2023-10-15' },
    { id: 2, name: 'Nextstrain API', key: 'nxt_39fj39fj39fj39fj39fj39fj', createdAt: '2023-11-02' }
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
    setSnackbarMessage('Profile updated successfully');
    setSnackbarOpen(true);
  };

  const handlePasswordSave = () => {
    if (newPassword !== confirmPassword) {
      setSnackbarMessage('New passwords do not match');
      setSnackbarOpen(true);
      return;
    }
    
    if (newPassword.length < 8) {
      setSnackbarMessage('Password must be at least 8 characters');
      setSnackbarOpen(true);
      return;
    }
    
    setSnackbarMessage('Password updated successfully');
    setSnackbarOpen(true);
    
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleNotificationsSave = () => {
    setSnackbarMessage('Notification settings updated successfully');
    setSnackbarOpen(true);
  };

  const handleDataSettingsSave = () => {
    setSnackbarMessage('Data settings updated successfully');
    setSnackbarOpen(true);
  };

  const handleAddApiKey = () => {
    const newKey = {
      id: apiKeys.length + 1,
      name: 'New API Key',
      key: `key_${Math.random().toString(36).substring(2, 15)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setApiKeys([...apiKeys, newKey]);
    setSnackbarMessage('New API key generated');
    setSnackbarOpen(true);
  };

  const handleDeleteApiKey = (id: number) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    setSnackbarMessage('API key deleted');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-gray-600 mb-6">Manage your account settings and preferences</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5" />
              <h2 className="text-xl font-semibold ml-2">Profile Settings</h2>
            </div>
            <hr className="mb-4" />
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  value={user?.role === 'admin' ? 'Administrator' : 'Medical Staff'}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                />
              </div>
              <button
                onClick={handleProfileSave}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>

          {/* Password Settings */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="flex items-center mb-4">
              <Lock className="w-5 h-5" />
              <h2 className="text-xl font-semibold ml-2">Change Password</h2>
            </div>
            <hr className="mb-4" />
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
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
                Update Password
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="flex items-center mb-4">
              <Bell className="w-5 h-5" />
              <h2 className="text-xl font-semibold ml-2">Notification Settings</h2>
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
                  <span className="ml-2">Email Notifications</span>
                </label>
                <p className="text-sm text-gray-500 ml-6">
                  Receive email alerts for important updates and threshold breaches
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
                  <span className="ml-2">Push Notifications</span>
                </label>
                <p className="text-sm text-gray-500 ml-6">
                  Receive browser push notifications for real-time alerts
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Alert Threshold</label>
                <select
                  value={alertThreshold}
                  onChange={handleAlertThresholdChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="low">Low (Notify for all changes)</option>
                  <option value="medium">Medium (Notify for significant changes)</option>
                  <option value="high">High (Notify only for critical changes)</option>
                </select>
              </div>
              <button
                onClick={handleNotificationsSave}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Notification Settings
              </button>
            </div>
          </div>

          {/* Data Settings */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="flex items-center mb-4">
              <Database className="w-5 h-5" />
              <h2 className="text-xl font-semibold ml-2">Data Settings</h2>
            </div>
            <hr className="mb-4" />
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Data Refresh Interval</label>
                <select
                  value={dataRefreshInterval}
                  onChange={handleDataRefreshIntervalChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="15">Every 15 minutes</option>
                  <option value="30">Every 30 minutes</option>
                  <option value="60">Every hour</option>
                  <option value="360">Every 6 hours</option>
                  <option value="720">Every 12 hours</option>
                  <option value="1440">Every 24 hours</option>
                </select>
              </div>
              <div className="flex space-x-4">
                <button
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Data Now
                </button>
                <button
                  onClick={handleDataSettingsSave}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Data Settings
                </button>
              </div>
            </div>
          </div>

          {/* API Keys */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <Database className="w-5 h-5" />
              <h2 className="text-xl font-semibold ml-2">API Keys</h2>
            </div>
            <hr className="mb-4" />
            
            <div className="bg-blue-50 p-4 rounded-md mb-4">
              <p className="text-sm text-blue-700">
                API keys are used to connect to external data sources. Keep these secure.
              </p>
            </div>
            
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="bg-gray-50 p-4 rounded-md flex justify-between items-center">
                  <div>
                    <p className="font-medium">{apiKey.name}</p>
                    <p className="text-sm text-gray-600">{apiKey.key}</p>
                    <p className="text-sm text-gray-500">Created: {apiKey.createdAt}</p>
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
              Generate New API Key
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