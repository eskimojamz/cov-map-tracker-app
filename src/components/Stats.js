import { useContext } from "react";
import { CountryContext } from '../App'
import { CountryDropdown } from "./CountryDropdown";

const Stats = ({ onCountryChange, countries }) => {
    const { selectedCountry } = useContext(CountryContext)
    return (
        <div className="stats w-full sm:h-full sm:w-1/2 bg-white rounded-md p-2">
            {/* <h1>Statistics</h1> */}
            <div>
                <CountryDropdown 
                    value={selectedCountry}
                    onChange={onCountryChange}
                    countries={countries}
                />
                <p>Chart - new cases & deaths</p>
            </div>
        </div>
    )
}

export default Stats
