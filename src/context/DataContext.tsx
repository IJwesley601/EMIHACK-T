import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';


export interface Disease {
  id: string;
  name: string;
  cases: number;
  deaths: number;
  recovered: number;
  active: number;
}

export interface CountryData {
  country: string;
  countryInfo: {
    _id: number;
    lat: number;
    long: number;
    flag: string;
  };
  cases: number;
  deaths: number;
  recovered: number;
  active: number;
}

export interface InfluenzaData {
  region: string;
  total_cases: number;
  total_deaths: number;
  total_recovered: number;
  active_cases: number;
}

export interface TimelineData {
  date: string;
  cases: number;
  deaths: number;
  recovered: number;
}

export interface PredictionData {
  date: string;
  predictedCases: number;
  predictedDeaths: number;
  confidence: number;
}

interface DataContextType {
  diseases: Disease[];
  countriesData: CountryData[];
  influenzaData: InfluenzaData[];
  globalTimeline: TimelineData[];
  predictions: PredictionData[];
  selectedDisease: string;
  setSelectedDisease: (disease: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  timeRange: string;
  setTimeRange: (range: string) => void;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [countriesData, setCountriesData] = useState<CountryData[]>([]);
  const [influenzaData, setInfluenzaData] = useState<InfluenzaData[]>([]);
  const [globalTimeline, setGlobalTimeline] = useState<TimelineData[]>([]);
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [selectedDisease, setSelectedDisease] = useState<string>('covid-19');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('30');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCovidData = async () => {
    const countriesResponse = await axios.get('https://disease.sh/v3/covid-19/countries');
    const timelineResponse = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    return { countriesResponse, timelineResponse };
  };

 

  const fetchInfluenzaData = async () => {
    const influenzaResponse = await axios.get('https://data.cdc.gov/resource/3yf8-kanr.json');
  
    // Mappez les juridictions aux régions
    const jurisdictionToRegionMap: { [key: string]: string } = {
      'Florida': 'americas',
      'Texas': 'americas',
      'California': 'americas',
      'New York': 'americas',
      // Ajoutez d'autres correspondances ici
    };
  
    // Transformer les données de l'API pour correspondre à la structure attendue
    const transformedData = influenzaResponse.data.map((entry: any) => {
      const region = jurisdictionToRegionMap[entry.jurisdiction_of_occurrence] || 'other'; // Par défaut, utilisez 'other'
  
      return {
        country: entry.jurisdiction_of_occurrence, // Utiliser "jurisdiction_of_occurrence" comme "Pays"
        region, // Ajouter la région
        countryInfo: {
          flag: `https://flagcdn.com/us.svg`, // URL du drapeau (toujours US pour les États-Unis)
        },
        cases: parseInt(entry.influenza_and_pneumonia_j10) || 0, // Utiliser "influenza_and_pneumonia_j10" comme "Cas totaux"
        deaths: parseInt(entry.influenza_and_pneumonia_j10) || 0, // Utiliser "influenza_and_pneumonia_j10" comme "Décès"
        recovered: 0, // Donnée non disponible dans l'API, donc mise à 0
        active: parseInt(entry.influenza_and_pneumonia_j10) || 0, // Utiliser "influenza_and_pneumonia_j10" comme "Cas actifs"
      };
    });
  
    return transformedData;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [covidData, influenzaData] = await Promise.all([
        fetchCovidData(),
        fetchInfluenzaData(),
      ]);

      const { countriesResponse, timelineResponse } = covidData;

      // Set COVID-19 data
      setCountriesData(countriesResponse.data);

      const formattedTimeline: TimelineData[] = Object.keys(timelineResponse.data.cases).map(date => ({
        date,
        cases: timelineResponse.data.cases[date],
        deaths: timelineResponse.data.deaths[date],
        recovered: timelineResponse.data.recovered[date],
      }));
      setGlobalTimeline(formattedTimeline);

      // Set Influenza data
      setInfluenzaData(influenzaData); // Utiliser les données transformées

      // Set diseases data
      setDiseases([
        {
          id: 'covid-19',
          name: 'COVID-19',
          cases: countriesResponse.data.reduce((sum: number, country: CountryData) => sum + country.cases, 0),
          deaths: countriesResponse.data.reduce((sum: number, country: CountryData) => sum + country.deaths, 0),
          recovered: countriesResponse.data.reduce((sum: number, country: CountryData) => sum + country.recovered, 0),
          active: countriesResponse.data.reduce((sum: number, country: CountryData) => sum + country.active, 0),
        },
        {
          id: 'influenza',
          name: 'Influenza',
          cases: influenzaData.reduce((sum: number, entry: any) => sum + entry.cases, 0),
          deaths: influenzaData.reduce((sum: number, entry: any) => sum + entry.deaths, 0),
          recovered: influenzaData.reduce((sum: number, entry: any) => sum + entry.recovered, 0),
          active: influenzaData.reduce((sum: number, entry: any) => sum + entry.active, 0),
        },
        {
          id: 'ebola',
          name: 'Ebola',
          cases: 35000,
          deaths: 15000,
          recovered: 18000,
          active: 2000,
        },
        // Ajoutez les épidémies historiques avec des données approximatives
        {
          id: 'plague-of-athens',
          name: 'Peste d\'Athènes',
          cases: 100000, // Estimation historique
          deaths: 75000, // Estimation historique
          recovered: 25000, // Estimation historique
          active: 0, // Terminée
        },
        {
          id: 'antonine-plague',
          name: 'Peste antonine',
          cases: 5000000, // Estimation historique
          deaths: 5000000, // Estimation historique
          recovered: 0, // Aucun survivant connu
          active: 0, // Terminée
        },
        {
          id: 'black-death',
          name: 'Peste noire',
          cases: 75000000, // Estimation historique
          deaths: 50000000, // Estimation historique
          recovered: 25000000, // Estimation historique
          active: 0, // Terminée
        },
        {
          id: 'cholera',
          name: 'Choléra',
          cases: 1000000, // Estimation annuelle actuelle
          deaths: 10000, // Estimation annuelle actuelle
          recovered: 990000, // Estimation annuelle actuelle
          active: 10000, // Cas actifs actuels
        },
        {
          id: 'hiv-aids',
          name: 'VIH/SIDA',
          cases: 38000000, // Estimation actuelle
          deaths: 33000000, // Estimation historique
          recovered: 5000000, // Estimation actuelle
          active: 33000000, // Cas actifs actuels
        },
        {
          id: 'sars',
          name: 'SRAS',
          cases: 8096, // Données historiques
          deaths: 774, // Données historiques
          recovered: 7322, // Données historiques
          active: 0, // Terminée
        },
        {
          id: 'h1n1',
          name: 'Grippe H1N1',
          cases: 140000000, // Estimation historique
          deaths: 151700, // Estimation historique
          recovered: 139848300, // Estimation historique
          active: 0, // Terminée
        },
        {
          id: 'yellow-fever',
          name: 'Fièvre jaune',
          cases: 200000, // Estimation annuelle actuelle
          deaths: 30000, // Estimation annuelle actuelle
          recovered: 170000, // Estimation annuelle actuelle
          active: 200000, // Cas actifs actuels
        },
        {
          id: 'leprosy',
          name: 'Lèpre',
          cases: 200000, // Estimation actuelle
          deaths: 0, // Très faible mortalité
          recovered: 200000, // Estimation actuelle
          active: 200000, // Cas actifs actuels
        },
        {
          id: 'tuberculosis',
          name: 'Tuberculose',
          cases: 10000000, // Estimation annuelle actuelle
          deaths: 1500000, // Estimation annuelle actuelle
          recovered: 8500000, // Estimation annuelle actuelle
          active: 10000000, // Cas actifs actuels
        },
        {
          id: 'measles',
          name: 'Rougeole',
          cases: 1000000, // Estimation annuelle actuelle
          deaths: 100000, // Estimation annuelle actuelle
          recovered: 900000, // Estimation annuelle actuelle
          active: 1000000, // Cas actifs actuels
        },
        {
          id: 'malaria',
          name: 'Paludisme',
          cases: 229000000, // Estimation annuelle actuelle
          deaths: 409000, // Estimation annuelle actuelle
          recovered: 228591000, // Estimation annuelle actuelle
          active: 229000000, // Cas actifs actuels
        },
      ]);
      // Mock prediction data
      const today = new Date();
      const mockPredictions: PredictionData[] = [];

      for (let i = 1; i <= 30; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);

        mockPredictions.push({
          date: futureDate.toISOString().split('T')[0],
          predictedCases: Math.round(500000 + Math.random() * 50000 * i),
          predictedDeaths: Math.round(10000 + Math.random() * 1000 * i),
          confidence: 0.95 - (i * 0.01),
        });
      }

      setPredictions(mockPredictions);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = async () => {
    await fetchData();
  };

  return (
    <DataContext.Provider
      value={{
        diseases,
        countriesData,
        influenzaData,
        globalTimeline,
        predictions,
        selectedDisease,
        setSelectedDisease,
        selectedCountry,
        setSelectedCountry,
        timeRange,
        setTimeRange,
        loading,
        error,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};