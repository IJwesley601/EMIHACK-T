import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { useData } from "../context/DataContext";
import { Database, Upload, Download, RefreshCw, Filter } from "lucide-react";
import * as XLSX from "xlsx";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const DataManagement: React.FC = () => {
  const {
    diseases,
    countriesData,
    influenzaData,
    selectedDisease,
    setSelectedDisease,
    loading,
    refreshData,
  } = useData();

  const [activeTab, setActiveTab] = useState<"countries" | "sources">(
    "countries"
  );
  const [filterRegion, setFilterRegion] = useState<string>("all");
  const [file, setFile] = useState<File | null>(null);
  const [advancedFilters, setAdvancedFilters] = useState({
    minCases: 0,
    maxCases: Infinity,
    minDeaths: 0,
    maxDeaths: Infinity,
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Colonnes pour le tableau des pays
  const countriesColumns = [
    {
      key: "country",
      label: "Pays",
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center">
          <img
            src={row.countryInfo.flag}
            alt={`${value} flag`}
            className="h-4 w-6 mr-2"
          />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: "cases",
      label: "Cas totaux",
      sortable: true,
      render: (value: number) => value.toLocaleString(),
    },
    {
      key: "active",
      label: "Cas actifs",
      sortable: true,
      render: (value: number) => value.toLocaleString(),
    },
    {
      key: "deaths",
      label: "Décès",
      sortable: true,
      render: (value: number) => value.toLocaleString(),
    },
    {
      key: "recovered",
      label: "Rétablis",
      sortable: true,
      render: (value: number) => value.toLocaleString(),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: any) => (
        <div className="flex space-x-2">
          <button
            className="p-1 text-green-600 hover:text-green-800"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  // Récupérer les sources de données depuis l'API
  const [dataSources, setDataSources] = useState<any[]>([]);
  useEffect(() => {
    const fetchDataSources = async () => {
      try {
        const token = localStorage.getItem("token");

        // Vérifier si le token existe
        if (!token) {
          console.log("Token manquant. Veuillez vous connecter.");
          return;
        }
        const response = await axios.get("http://localhost:3000/api/sources", {
          headers: {
            Authorization: `Bearer ${token}`, // Ajouter le token dans les headers
          },
        });
        setDataSources(response.data); // Mettre à jour l'état avec les données récupérées
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des sources de données:",
          error
        );
      }
    };

    fetchDataSources();
  }, []);

  // Colonnes pour le tableau des sources de données
  const sourcesColumns = [
    { key: "nom", label: "Nom de la source", sortable: true },
    { key: "type", label: "Type", sortable: true },
    {
      key: "derniereMiseAJour",
      label: "Dernière mise à jour",
      sortable: true,
      render: (value: Date) => new Date(value).toLocaleDateString(), // Formater la date
    },
    { key: "frequence", label: "Fréquence de mise à jour", sortable: true },
  ];

  const [isUploading, setIsUploading] = useState(false);
  // Fonction pour importer un fichier Excel
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setIsUploading(true); // Activer la barre de progression
      setFile(uploadedFile);

      const formData = new FormData();
      formData.append("file", uploadedFile);
      formData.append("nom", "Nom de la source");
      formData.append("type", "API");
      formData.append("frequence", "Quotidien");

      try {
        const token = localStorage.getItem("token");

        // Vérifier si le token existe
        if (!token) {
          console.log("Token manquant. Veuillez vous connecter.");
          return;
        }

        await axios.post("http://localhost:3000/api/sources/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        // Rafraîchir la liste des sources de données
        const updatedSources = await axios.get(
          "http://localhost:3000/api/sources",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Ajouter le token dans les headers
            },
          }
        );
        setDataSources(updatedSources.data);
      } catch (error) {
        console.error("Erreur lors de l'upload:", error);
        alert("Erreur lors de l'upload du fichier");
      } finally {
        setIsUploading(false); // Désactiver la barre de progression
      }
    }
  };
  // Fonction pour appliquer les filtres avancés
  const applyAdvancedFilters = (data: any[]) => {
    return data.filter((item) => {
      return (
        item.cases >= advancedFilters.minCases &&
        item.cases <= advancedFilters.maxCases &&
        item.deaths >= advancedFilters.minDeaths &&
        item.deaths <= advancedFilters.maxDeaths
      );
    });
  };

  // Fonction pour gérer le rafraîchissement des données
  const handleRefresh = () => {
    refreshData();
  };

  // Fonction pour exporter les données en Excel
  const handleDownloadExcel = (data: any[], fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  // Filtrer les données en fonction de la maladie sélectionnée
  const getFilteredData = () => {
    if (selectedDisease === "covid-19") {
      return countriesData;
    } else if (selectedDisease === "influenza") {
      return influenzaData;
    } else {
      return [];
    }
  };

  // Appliquer les filtres régionaux et avancés
  const filteredData = applyAdvancedFilters(
    filterRegion === "all"
      ? getFilteredData()
      : getFilteredData().filter((item) => {
          if (selectedDisease === "covid-19") {
            // Filtrage pour COVID-19
            if (filterRegion === "asia") {
              return [
                "China",
                "India",
                "Japan",
                "South Korea",
                "Vietnam",
                "Thailand",
              ].includes(item.country);
            } else if (filterRegion === "europe") {
              return [
                "Germany",
                "France",
                "UK",
                "Italy",
                "Spain",
                "Netherlands",
              ].includes(item.country);
            } else if (filterRegion === "americas") {
              return [
                "USA",
                "Canada",
                "Brazil",
                "Mexico",
                "Argentina",
                "Colombia",
              ].includes(item.country);
            } else if (filterRegion === "africa") {
              return [
                "South Africa",
                "Nigeria",
                "Egypt",
                "Morocco",
                "Kenya",
                "Ethiopia",
              ].includes(item.country);
            }
          } else if (selectedDisease === "influenza") {
            // Filtrage pour Influenza
            return item.region === filterRegion;
          }
          return true;
        })
  );

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
        <h1 className="text-2xl font-bold text-gray-800">
          Gestion des données
        </h1>
        <p className="text-gray-600">
          Gérez et exportez les données épidémiques
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "countries"
                  ? "text-blue-600 border-b-2 border-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("countries")}
            >
              <div className="flex items-center">
                <Database className="h-4 w-4 mr-2" />
                Données des pays
              </div>
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "sources"
                  ? "text-blue-600 border-b-2 border-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("sources")}
            >
              <div className="flex items-center">
                <Upload className="h-4 w-4 mr-2" />
                Sources de données
              </div>
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "countries" && (
            <>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <label
                      htmlFor="disease-filter"
                      className="block text-sm text-gray-600 mb-1"
                    >
                      Maladie
                    </label>
                    <select
                      id="disease-filter"
                      className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedDisease}
                      onChange={(e) => setSelectedDisease(e.target.value)}
                    >
                      {diseases.map((disease) => (
                        <option key={disease.id} value={disease.id}>
                          {disease.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="region-filter"
                      className="block text-sm text-gray-600 mb-1"
                    >
                      Région
                    </label>
                    <select
                      id="region-filter"
                      className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filterRegion}
                      onChange={(e) => setFilterRegion(e.target.value)}
                    >
                      <option value="all">Toutes les régions</option>
                      <option value="asia">Asie</option>
                      <option value="europe">Europe</option>
                      <option value="americas">Amériques</option>
                      <option value="africa">Afrique</option>
                    </select>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                    onClick={() =>
                      handleDownloadExcel(filteredData, "donnees_pays")
                    }
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Exporter les données
                  </button>
                  <button
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
                    onClick={() => setShowAdvancedFilters(true)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filtres avancés
                  </button>
                </div>
              </div>

              <DataTable
                title="Données des pays"
                data={filteredData}
                columns={countriesColumns}
              />
            </>
          )}

          {activeTab === "sources" && (
            <>
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-lg font-medium">Sources de données</h3>
                <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Importer la source
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
              <DataTable
                title="Sources de données"
                data={dataSources}
                columns={sourcesColumns}
              />
            </>
          )}
        </div>
      </div>

      {showAdvancedFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Filtres avancés</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600">
                  Cas minimum
                </label>
                <input
                  type="number"
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={advancedFilters.minCases}
                  onChange={(e) =>
                    setAdvancedFilters({
                      ...advancedFilters,
                      minCases: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">
                  Cas maximum
                </label>
                <input
                  type="number"
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={advancedFilters.maxCases}
                  onChange={(e) =>
                    setAdvancedFilters({
                      ...advancedFilters,
                      maxCases: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">
                  Décès minimum
                </label>
                <input
                  type="number"
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={advancedFilters.minDeaths}
                  onChange={(e) =>
                    setAdvancedFilters({
                      ...advancedFilters,
                      minDeaths: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">
                  Décès maximum
                </label>
                <input
                  type="number"
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={advancedFilters.maxDeaths}
                  onChange={(e) =>
                    setAdvancedFilters({
                      ...advancedFilters,
                      maxDeaths: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
                onClick={() => setShowAdvancedFilters(false)}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                onClick={() => setShowAdvancedFilters(false)}
              >
                Appliquer les filtres
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Barre de progression animée */}
      <AnimatePresence>
        {isUploading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center"
            >
              <CircularProgress size={60} thickness={4} className="mb-4" />
              <p className="text-lg font-medium text-gray-700">
                Importation en cours...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DataManagement;
