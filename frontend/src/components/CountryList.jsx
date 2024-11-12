import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import iso2to3 from "country-iso-2-to-3";
import "./CountryList.css";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 10;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("/api/countries");
        const countriesWithIso3 = await Promise.all(
          response.data.map(async (country) => {
            const iso3Code = iso2to3(country.countryCode);
            return { ...country, iso3: iso3Code };
          })
        );
        setCountries(countriesWithIso3);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Calculate pagination
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);
  const totalPages = Math.ceil(countries.length / countriesPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="country-list-container">
      <ul className="country-list">
        {currentCountries.map((country) => (
          <li key={country.countryCode} className="country-card">
            <Link to={`/country/${country.iso3}`} className="country-link">
              <div className="country-card-content">
                <h3>{country.name}</h3>
                <p>ISO3 Code: {country.iso3}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default CountryList;
