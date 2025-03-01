import React from 'react';
import PredictionChart from '../components/PredictionChart';
import { useData } from '../context/DataContext';
import { Brain, TrendingUp, AlertTriangle, BarChart3 } from 'lucide-react';

const PredictionsPage: React.FC = () => {
  const { predictions, selectedDisease, diseases, loading } = useData();
  
  // Trouver la maladie sélectionnée
  const currentDisease = diseases.find(d => d.id === selectedDisease) || diseases[0];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Prédictions IA</h1>
        <p className="text-gray-600">Prévisions basées sur l'apprentissage automatique pour les tendances épidémiques</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-purple-100 mr-4">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium">Modèle IA</h3>
              <p className="text-sm text-gray-500">Réseau de neurones LSTM</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Précision</span>
              <span className="text-sm font-medium">94,2%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '94.2%' }}></div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-600">Données d'entraînement</span>
              <span className="text-sm font-medium">2 ans</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '80%' }}></div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-600">Caractéristiques</span>
              <span className="text-sm font-medium">12 paramètres</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Prévisions sur 30 jours</h3>
              <p className="text-sm text-gray-500">{currentDisease?.name}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Nouveaux cas prévus</span>
              <span className="text-sm font-medium text-blue-600">
                +{(predictions[29]?.predictedCases - predictions[0]?.predictedCases).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Taux de croissance</span>
              <span className="text-sm font-medium text-red-500">+12,4%</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Date de pic</span>
              <span className="text-sm font-medium">{predictions[20]?.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Niveau de confiance</span>
              <span className="text-sm font-medium">{(predictions[0]?.confidence * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-red-100 mr-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium">Évaluation des risques</h3>
              <p className="text-sm text-gray-500">Basée sur les prédictions de l'IA</p>
            </div>
          </div>
          <div className="space-y-4 mt-4">
            <div className="p-3 bg-red-50 rounded-lg border border-red-100">
              <h4 className="text-sm font-medium text-red-800">Régions à haut risque</h4>
              <p className="text-xs text-red-600 mt-1">Asie du Sud-Est, Amérique du Sud</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
              <h4 className="text-sm font-medium text-yellow-800">Régions à risque modéré</h4>
              <p className="text-xs text-yellow-600 mt-1">Amérique du Nord, Europe</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border border-green-100">
              <h4 className="text-sm font-medium text-green-800">Régions à faible risque</h4>
              <p className="text-xs text-green-600 mt-1">Australie, Nouvelle-Zélande</p>
            </div>
          </div>
        </div>
      </div>

      <PredictionChart />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-blue-100 mr-3">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-medium">Facteurs de prédiction</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Densité de population</span>
                <span className="text-sm font-medium">Impact élevé</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Taux de vaccination</span>
                <span className="text-sm font-medium">Impact moyen</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Flux de voyageurs</span>
                <span className="text-sm font-medium">Impact élevé</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Capacité hospitalière</span>
                <span className="text-sm font-medium">Impact moyen</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Facteurs saisonniers</span>
                <span className="text-sm font-medium">Impact faible</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium mb-4">Actions recommandées</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-red-100 mr-3 mt-0.5">
                <span className="block h-2 w-2 rounded-full bg-red-600"></span>
              </div>
              <div>
                <h4 className="text-sm font-medium">Augmenter la capacité de tests</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Déployer des unités de test mobiles dans les zones à haut risque pour identifier les cas rapidement.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-yellow-100 mr-3 mt-0.5">
                <span className="block h-2 w-2 rounded-full bg-yellow-600"></span>
              </div>
              <div>
                <h4 className="text-sm font-medium">Campagne de vaccination</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Accélérer les efforts de vaccination dans les régions montrant des tendances à la hausse.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-green-100 mr-3 mt-0.5">
                <span className="block h-2 w-2 rounded-full bg-green-600"></span>
              </div>
              <div>
                <h4 className="text-sm font-medium">Sensibilisation du public</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Lancer des campagnes d'information ciblées sur les mesures préventives.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-blue-100 mr-3 mt-0.5">
                <span className="block h-2 w-2 rounded-full bg-blue-600"></span>
              </div>
              <div>
                <h4 className="text-sm font-medium">Préparation des soins de santé</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Augmenter la capacité hospitalière dans les zones prévues pour une augmentation des cas.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-purple-100 mr-3 mt-0.5">
                <span className="block h-2 w-2 rounded-full bg-purple-600"></span>
              </div>
              <div>
                <h4 className="text-sm font-medium">Restrictions de voyage</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Envisager des limitations temporaires de voyage des zones à haut risque vers les zones à faible risque.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionsPage;