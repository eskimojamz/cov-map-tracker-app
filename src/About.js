import React from 'react'
import Github from './assets/icons8-github.svg'

const About = () => {
    return (
        <div className="h-auto w-full sm:w-4/5 max-w-screen-sm bg-white mx-auto rounded-md p-8 mt-8 space-y-6">
            <p className="text-lg">
                <span className="font-semibold italic">Covid-tracker-mapp</span> (map application) is a project built with the ReactJS library.
                Data is fetched from the <a className="font-semibold text-blue-400 hover:text-blue-200" href="https://www.disease.sh">disease.sh</a> API. 
                Charting is handled with the <a className="font-semibold text-blue-400 hover:text-blue-200" href="https://www.chartjs.org/">Chart.js</a> library and mapping with the <a className="font-semibold text-blue-400 hover:text-blue-200" href="https://leafletjs.com/">Leaflet.js</a> library. 
                The project is hosted on <a className="font-semibold text-blue-400 hover:text-blue-200" href="https://firebase.google.com/">Firebase</a>.
            </p>
            <p className="text-lg text-center">
                The source code for this project can be found on:
            </p>
            <div>
                <a href="https://github.com/eskimojamz/cov-map-tracker-app">
                    <button className="flex items-start font-semibold text-white border-2 border-black rounded-md mx-auto py-1 px-1 hover:opacity-50">
                        <img className="h-6 w-6" src={Github} /> 
                        <span className="text-black ml-0.5">Github</span> 
                    </button>
                </a>
            </div>
        </div>
    )
}

export default About
