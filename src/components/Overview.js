import numeral from 'numeral'
import {useState, useContext, useEffect} from 'react'
import { CasesTypeContext, CountryContext } from '../App'

const Overview = ({countryData}) => {
    const {selectedCountry, setSelectedCountry} = useContext(CountryContext)
    const {casesType, setCasesType} = useContext(CasesTypeContext)
    const [casesBg, setCasesBg] = useState("bg-blue-200")
    const [deathsBg, setDeathsBg] = useState("")

    const toggleCases = () => {
        setCasesType('cases')
        setCasesBg(casesBg === "" ? "bg-blue-100" : "")
        setDeathsBg("")
    }

    const toggleDeaths = () => {
        setCasesType('deaths')
        setCasesBg(casesBg === "" ? "bg-blue-100" : "")
        setDeathsBg("bg-red-100")
    }

    return (
        <>
        <div className="overview flex flex-col items-center mx-auto">
            <div className="h-auto w-full flex justify-between space-x-8 p-2 m-2 bg-gray-100 rounded-md">
                <button className={`cases h-24 w-48 sm:w-72 bg-white rounded-md p-2 space-y-2 flex flex-col justify-center items-stretch border border-t-8 border-blue-500 ${casesBg}`}
                    onClick={toggleCases}
                    active={casesType === "cases"}
                >
                    <h1 className="text-lg font-light">Cases</h1>
                    <h3 className="text-xl sm:text-3xl font-medium text-blue-500">
                        {numeral(countryData?.cases).format('0,0')}
                    </h3>
                </button>
                <button className={`deaths h-24 w-48 sm:w-72 bg-white rounded-md p-2 space-y-2 flex flex-col justify-center items-stretch border border-t-8 border-red-500 ${deathsBg}`}
                    onClick={toggleDeaths}
                    active={casesType === "deaths"}
                >
                    <h1 className="text-lg font-light">Deaths</h1>
                    <h3 className="text-xl sm:text-3xl font-medium text-red-500">{numeral(countryData?.deaths).format('0,0')}</h3>
                </button>
            </div>
            <div className="w-full flex flex-col justify-center items-center bg-white border border-gray-300 rounded-md p-4">
                {(selectedCountry.length < 3) &&
                (
                <>
                <span className="flex justify-center p-2"><img className="h-24 w-36 object-cover pb-4" src={countryData?.countryInfo?.flag} /></span>
                <span className="flex space-x-2 px-4"><h3 className="text-lg">Continent:</h3><h2 className="text-lg font-semibold">{countryData?.continent}</h2></span>
                </>
                )}

                <span className="flex space-x-2 px-4"><h3 className="text-lg">Population:</h3><h2 className="text-lg font-semibold">{numeral(countryData?.population).format('0,0')}</h2></span>
                <span className="flex space-x-2 px-4"><h3 className="text-lg">Cases per million:</h3><h2 className="text-lg font-semibold">{numeral(countryData?.casesPerOneMillion).format('0,0')}</h2></span>
                <span className="flex space-x-2 px-4"><h3 className="text-lg">Deaths per million:</h3><h2 className="text-lg font-semibold">{numeral(countryData?.deathsPerOneMillion).format('0,0')}</h2></span>
            </div>
        </div>
        </>
    )
}

export default Overview
