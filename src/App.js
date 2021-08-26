import './App.css';
import Map from './components/Map';
import Stats from './components/Stats';
import Overview from './components/Overview';
import { useState, useEffect, createContext, useContext } from 'react';

export const CountryContext = createContext('Worldwide');

function App() {
  const [selectedCountry, setSelectedCountry] = useContext('Worldwide')
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="App bg-gray-100">
      {/* useMemo for value below? */}
      <CountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
        <div className="app-top flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-2 p-2">
          <Stats 
            props={onCountryChange}
          />
          <Map />
          <Overview /> 
        </div>
      </CountryContext.Provider>
    </div>
  );
}

export default App;
