import Map from './components/Map';
import Stats from './components/Stats';
import Overview from './components/Overview';
import { useState, useEffect, useContext } from 'react';
import { CountryContext, CasesTypeContext } from './App';

const Home = () => {
    const {selectedCountry, setSelectedCountry} = useContext(CountryContext)
    const {casesType, setCasesType} = useContext(CasesTypeContext)
    const [countries, setCountries] = useState([]);
    const [countryData, setCountryData] = useState();
    const [mapCenter, setMapCenter] = useState({lat: 35, lng: 0});
    const [mapZoom, setMapZoom] = useState(1);

    useEffect(() => {
        const getCountriesData = async () => {
          fetch("https://disease.sh/v3/covid-19/countries")
            .then((response) => response.json())
            .then((data) => {
              const countries = data.map((country) => ({
                name: country.country,
                value: country.countryInfo.iso2,
                lat: country.countryInfo.lat,
                long: country.countryInfo.long,
                cases: country.cases,
                deaths: country.deaths
              }));
              setCountries(countries);
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
            setCountryData(data);
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
        <>
        <div className="app-top flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 m-auto">
            <Stats
                countries={countries}
                countryData={JSON.stringify(countryData)}
                casesType={casesType}
            />
            <Map 
                mapCenter={mapCenter}
                mapZoom={mapZoom}
                countryData={countryData}
                countries={countries}
        />
        </div>
        <Overview 
            countryData={countryData}
        />
        </>
    )
}

export default Home
