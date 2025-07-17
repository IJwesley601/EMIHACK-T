import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import { PlusCircle, User } from 'lucide-react';
import { Switch } from '@mui/material';

const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
  const [filterRole, setFilterRole] = useState<string>('all');

  // Données utilisateurs fictives
  const [usersData, setUsersData] = useState([
    {
      id: 1,
      name: 'John Wesley',
      email: 'admin@gmail.com',
      role: 'Admin',
      verification: 'isVerified',
      lastLogin: '2025-03-02',
    },
    {
      id: 2,
      name: 'Solohery Alain',
      email: 'alain@yahoo.com',
      role: 'Admin',
      verification: 'isVerified',
      lastLogin: '2025-03-01',
    },
  ]);

  // Met à jour le rôle d'un utilisateur spécifique
  const handleRoleChange = (userId: number, newRole: string) => {
    const updatedUsers = usersData.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    );
    setUsersData(updatedUsers);
  };

  // Définir les colonnes pour le tableau des utilisateurs
  const usersColumns = [
    { key: 'name', label: 'Nom', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { 
      key: 'role', 
      label: 'Rôle', 
      sortable: true,
      render: (row: any) => (
        <select
          value={row.role}
          onChange={(e) => handleRoleChange(row.id, e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
      )
    },
    { key: 'verification', label: 'Vérification', sortable: true },
    { key: 'lastLogin', label: 'Dernière connexion', sortable: true },
    { 
      key: 'actions', 
      label: 'Activation', 
      render: () => (
        <div className="flex space-x-2">
          <Switch />
        </div>
      )
    },
  ];

  // Filtrer les utilisateurs par rôle
  const filteredUsers = filterRole === 'all' 
    ? usersData 
    : usersData.filter(user => user.role.toLowerCase() === filterRole);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Gestion des utilisateurs</h1>
        <p className="text-gray-600">Gérer les utilisateurs et leurs rôles</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'users' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('users')}
            >
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Utilisateurs
              </div>
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'users' && (
            <>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <label htmlFor="role-filter" className="block text-sm text-gray-600 mb-1">
                      Rôle
                    </label>
                    <select
                      id="role-filter"
                      className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                    >
                      <option value="all">Tous les rôles</option>
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <DataTable
                title="Utilisateurs"
                data={filteredUsers}
                columns={usersColumns}
              />
            </>
          )}

          {activeTab === 'roles' && (
            <>
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-lg font-medium">Rôles</h3>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Ajouter un nouveau rôle
                </button>
              </div>
              
              {/* Ici, vous pouvez ajouter un autre DataTable ou un composant similaire pour gérer les rôles */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
