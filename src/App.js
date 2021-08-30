import './App.css';
import Map from './components/Map';
import Stats from './components/Stats';
import Overview from './components/Overview';
import { useState, useEffect, createContext, useContext } from 'react';
import { sortData } from './util'

export const CountryContext = createContext();

function App() {
  const [selectedCountry, setSelectedCountry] = useState('Worldwide')
  const [countryInfo, setCountryInfo] = useState();
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  // const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({lat: 35, lng: 0});
  const [mapZoom, setMapZoom] = useState(1);

  console.log(selectedCountry)
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
          // setMapCountries(data);
        });
    };

    getCountriesData();
  }, []);

  useEffect(() => {
    const onCountryChange = async () => {
      const url =
        selectedCountry === "Worldwide"
          ? "https://disease.sh/v3/covid-19/all"
          : `https://disease.sh/v3/covid-19/countries/${selectedCountry}`;
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
          if (selectedCountry === "Worldwide") {
            setMapCenter({lat: 35, lng: 0})
            setMapZoom(1)
          } else {
            setMapCenter({lat: data.countryInfo?.lat, lng: data.countryInfo?.long})
            setMapZoom(3)
          }
        });
    };

    onCountryChange()
  }, [selectedCountry])



  return (
    <div className="App bg-gray-100">
      {/* useMemo for value below? */}
      <CountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
        <div className="app-top flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-2 m-2">
          <Stats
            countries={countries}
            countryInfo={JSON.stringify(countryInfo)}
            casesType={casesType}
          />
          <Map 
            mapCenter={mapCenter}
            mapZoom={mapZoom}
            countryInfo={countryInfo}
          />
        </div>
        <Overview /> 
      </CountryContext.Provider>
    </div>
  );
}

export default App;
