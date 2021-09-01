import './App.css';
import Navbar from './components/Navbar';
import Home from './Home'
import About from './About'
import { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const CountryContext = createContext();
export const CasesTypeContext = createContext();

function App() {
  const [selectedCountry, setSelectedCountry] = useState("Worldwide")
  const [casesType, setCasesType] = useState("cases");

  return (
    <div className="App bg-gray-100">
      <Router>
        <CountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
        <CasesTypeContext.Provider value={{ casesType, setCasesType }}>
          <Navbar />
        
        {/* Switch */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>

        </CasesTypeContext.Provider>
        </CountryContext.Provider>
      </Router>
    </div>
  );
}

export default App;
