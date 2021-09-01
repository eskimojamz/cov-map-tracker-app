import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="sm:h-12 w-full bg-gray-100 flex justify-between items-center p-2 mb-4">
            <Link to='/'>
                <h1 className="text-xl sm:text-3xl font-bold hover:opacity-50">covid-tracker-mapp</h1> 
            </Link>
            <Link to='/about'>
                <span className="border-2 border-black rounded py-1 px-2 hover:bg-black hover:text-white">About</span>
            </Link>
        </div>
    )
}

export default Navbar
