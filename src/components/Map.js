import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { useContext } from 'react';
import { CasesTypeContext, CountryContext } from '../App'
import { casesTypeColors } from './casesTypeColors';

const Map = ({mapCenter, mapZoom, countries}) => {
    const { selectedCountry, setSelectedCountry } = useContext(CountryContext)
    const {casesType, setCasesType} = useContext(CasesTypeContext)
    console.log(casesType)
    function ChangeMapView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }
    
    return (
        <>
            <MapContainer center={mapCenter} zoom={4} scrollWheelZoom={true}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {(selectedCountry !== "Worldwide") && (<Marker position={mapCenter}>
                </Marker>)}
                <ChangeMapView center={mapCenter} zoom={mapZoom} />
                {countries.map((country) => (
                    <Circle
                        center={[country.lat, country.long]}
                        fillColor={"#CC1034"}
                        fillOpacity={0.2}
                        radius={
                            Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
                        }
                        stroke={false}
                    >
                    </Circle>
                    ))
                }
            </MapContainer>
        </>
    )
}

export default Map
