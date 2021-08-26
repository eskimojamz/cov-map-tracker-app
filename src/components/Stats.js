import { useContext } from "react";
import { CountryContext } from '../App'
import { CountryDropdown } from "./CountryDropdown";

const Stats = ({ onCountryChange }) => {
    const { selectedCountry } = useContext(CountryContext)
    return (
        <div className="stats h-auto w-full sm:h-full sm:w-1/2 bg-white rounded-md">
            <h1>Statistics</h1>
            <div>
                <CountryDropdown 
                    value={selectedCountry}
                    onChange={onCountryChange}
                />
                <p>Chart - new cases & deaths</p>
            </div>
        </div>
    )
}

export default Stats
