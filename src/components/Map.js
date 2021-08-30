import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useContext } from 'react';
import { CountryContext } from '../App'

const Map = ({mapCenter, mapZoom, countryInfo}) => {
    const { selectedCountry, setSelectedCountry } = useContext(CountryContext)

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
                <Marker position={mapCenter}>
                    <Popup>
                        {/* {countryInfo.country} */}
                    </Popup>
                </Marker>
                <ChangeMapView center={mapCenter} zoom={mapZoom} />
            </MapContainer>
        </>
    )
}

export default Map
