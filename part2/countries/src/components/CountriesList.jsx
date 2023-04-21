import { useState } from "react";
import CountryInfo from "./CountryInfo";

const CountriesList = ({ filter, filteredCountries }) => {
  const [showCountry, setShowCountry] = useState({});
  if (filter && filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filter && filteredCountries.length === 1) {
    return <CountryInfo country={filteredCountries[0]} />;
  } else {
    return filteredCountries.map((country, i) => {
      return (
        <div key={i} className="countryListDiv">
          <div className="countryList">
            {country.name.common + " "}
            <button
              onClick={(e) =>
                setShowCountry((prev) => ({
                  ...prev,
                  [country.name.common]: prev[country.name.common]
                    ? !prev[country.name.common]
                    : true,
                }))
              }
            >
              {showCountry[country.name.common] ? "Hide" : "Show"}
            </button>
          </div>
          {showCountry[country.name.common] && (
            <CountryInfo country={country} />
          )}
        </div>
      );
    });
  }
};

export default CountriesList;
