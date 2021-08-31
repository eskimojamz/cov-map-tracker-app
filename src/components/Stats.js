import { useContext } from "react";
import { CountryContext } from '../App'
import { CountryDropdown } from "./CountryDropdown";
import CountryLineChart from "./CountryLineChart";

const Stats = ({ countries }) => {

    return (
        <div className="stats w-full sm:h-full sm:w-1/2 bg-gray-100 rounded-md">
            {/* <h1>Statistics</h1> */}
                <CountryDropdown
                    countries={countries}
                />
           
                <CountryLineChart
                />
                
            
        </div>
    )
}

export default Stats
