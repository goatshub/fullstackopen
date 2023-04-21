import { useState } from "react";
import "./App.css";
import FilterCountries from "./components/FilterCountries";
import { useEffect } from "react";
import countryServices from "./services/country";
import CountriesList from "./components/CountriesList";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    countryServices.getAll().then((res) => setAllCountries(res));
  }, []);

  const filteredCountries = filter
    ? allCountries.filter((country) =>
        country.name.common
          .toString()
          .toLowerCase()
          .includes(filter.toString().toLowerCase())
      )
    : allCountries;

  return (
    <div className="App">
      <FilterCountries
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      />
      <CountriesList filter={filter} filteredCountries={filteredCountries} />
    </div>
  );
}

export default App;
