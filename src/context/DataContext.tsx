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
  const [globalTimeline, setGlobalTimeline] = useState<TimelineData[]>([]);
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [selectedDisease, setSelectedDisease] = useState<string>('covid-19');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('30');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch countries data
      const countriesResponse = await axios.get('https://disease.sh/v3/covid-19/countries');
      setCountriesData(countriesResponse.data);

      // Fetch global timeline
      const timelineResponse = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
      
      const formattedTimeline: TimelineData[] = Object.keys(timelineResponse.data.cases).map(date => ({
        date,
        cases: timelineResponse.data.cases[date],
        deaths: timelineResponse.data.deaths[date],
        recovered: timelineResponse.data.recovered[date]
      }));
      
      setGlobalTimeline(formattedTimeline);

      // Mock diseases data
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
          cases: 24000000,
          deaths: 34000,
          recovered: 23500000,
          active: 466000,
        },
        {
          id: 'ebola',
          name: 'Ebola',
          cases: 35000,
          deaths: 15000,
          recovered: 18000,
          active: 2000,
        }
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
          confidence: 0.95 - (i * 0.01)
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
        refreshData
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