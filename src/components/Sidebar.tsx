import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Map, 
  Database, 
  Settings, 
  LogOut,
  Activity,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const { logout, user } = useAuth();

  return (
    <div className="bg-blue-900 text-white w-64 flex flex-col h-screen">
      <div className="p-5 border-b border-blue-800">
        <div className="flex items-center space-x-3">
          <Activity className="h-8 w-8 text-blue-300" />
          <h1 className="text-xl font-bold">EpiTrack AI</h1>
        </div>
        <p className="text-blue-300 text-sm mt-1">Plateforme de gestion des épidémies</p>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-4 space-y-1">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 text-sm rounded-lg ${
                isActive 
                  ? 'bg-blue-800 text-white' 
                  : 'text-blue-100 hover:bg-blue-800'
              }`
            }
            end
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Tableau de bord
          </NavLink>

          <NavLink 
            to="/predictions" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 text-sm rounded-lg ${
                isActive 
                  ? 'bg-blue-800 text-white' 
                  : 'text-blue-100 hover:bg-blue-800'
              }`
            }
          >
            <TrendingUp className="mr-3 h-5 w-5" />
            Prédictions IA
          </NavLink>

          <NavLink 
            to="/map" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 text-sm rounded-lg ${
                isActive 
                  ? 'bg-blue-800 text-white' 
                  : 'text-blue-100 hover:bg-blue-800'
              }`
            }
          >
            <Map className="mr-3 h-5 w-5" />
            Vue carte
          </NavLink>

          <NavLink 
            to="/data" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 text-sm rounded-lg ${
                isActive 
                  ? 'bg-blue-800 text-white' 
                  : 'text-blue-100 hover:bg-blue-800'
              }`
            }
          >
            <Database className="mr-3 h-5 w-5" />
            Gestion des données
          </NavLink>

          <div className="pt-4 mt-4 border-t border-blue-800">
            <div className="px-4 py-2">
              <p className="text-xs uppercase tracking-wider text-blue-400">Alertes</p>
            </div>
            <div className="px-4 py-3 text-sm text-blue-100 rounded-lg bg-red-900/30 mx-2 mb-4">
              <div className="flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-red-400" />
                <span className="font-medium">Poussée de COVID-19</span>
              </div>
              <p className="mt-1 text-xs text-blue-300">Augmentation significative détectée en Asie du Sud-Est</p>
            </div>
          </div>
        </nav>
      </div>

      <div className="p-4 border-t border-blue-800">
        <div className="flex items-center mb-4 px-4">
          <div className="h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center text-sm font-medium">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-blue-300 capitalize">{user?.role}</p>
          </div>
        </div>

        <div className="space-y-1">
          <NavLink 
            to="/settings" 
            className={({ isActive }) => 
              `flex items-center px-4 py-2 text-sm rounded-lg ${
                isActive 
                  ? 'bg-blue-800 text-white' 
                  : 'text-blue-100 hover:bg-blue-800'
              }`
            }
          >
            <Settings className="mr-3 h-5 w-5" />
            Paramètres
          </NavLink>

          <button 
            onClick={logout}
            className="w-full flex items-center px-4 py-2 text-sm rounded-lg text-blue-100 hover:bg-blue-800"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;