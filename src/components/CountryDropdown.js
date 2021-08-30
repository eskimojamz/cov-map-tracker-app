import { Fragment, useContext, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { CountryContext } from '../App'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const CountryDropdown = ({ countries }) => {
    const { selectedCountry, setSelectedCountry } = useContext(CountryContext)

    return (
    <>
    <label for="country-select" className="block text-sm font-medium text-gray-700">Country</label>
    <select 
        id="country-select" 
        className="relative w-full bg-white border border-gray-300 rounded-md p-2"
        value={selectedCountry} 
        onChange={e => setSelectedCountry(e.target.value)}
    >
        <option 
            value="Worldwide"
            className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm p-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
        >
            Worldwide
        </option>
        {countries.map((country) => {
            return (
                <option 
                    value={country.value} 
                    className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm p-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                >
                    {country.name}
                </option>
            )
        })}
    </select>
    </>
    )
}
