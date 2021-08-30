import { useContext } from "react";
import { CountryContext } from '../App'
import { CountryDropdown } from "./CountryDropdown";
import CountryLineChart from "./CountryLineChart";

const Stats = ({ countries, countryInfo, casesType }) => {

    return (
        <div className="stats w-full sm:h-full sm:w-1/2 bg-white rounded-md p-2">
            {/* <h1>Statistics</h1> */}
            <div>
                <CountryDropdown
                    countries={countries}
                />
                <CountryLineChart 
                    casesType={casesType}
                />
                {countryInfo}
            </div>
        </div>
    )
}

export default Stats
