const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

/**
 * @route GET /country/:countryCode
 * @description Get country information by country code.
 * @access Public
 */
router.get('/country/:countryCode', async (req, res) => {
  const { countryCode } = req.params;
  try {
    // Fetch country information from Nager.Date API.
    const borderCountriesResponse = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);
    
    // Extract border countries' common names.
    const borders = Array.isArray(borderCountriesResponse.data.borders)
      ? borderCountriesResponse.data.borders.map(border => border.commonName)
      : [];

    // Fetch population data from CountriesNow API.
    const populationResponse = await axios.get(`https://countriesnow.space/api/v0.1/countries/population`);
    
    // Find the country's population data.
    const countryPopulationData = populationResponse.data.data.find(country => country.iso3 === countryCode.toUpperCase());
    
    // Extract population counts or return an empty array if not found.
    const population = countryPopulationData && countryPopulationData.populationCounts
      ? countryPopulationData.populationCounts.map(entry => ({ year: entry.year, population: entry.value }))
      : [];

    // Fetch flag image URL from CountriesNow API.
    const flagResponse = await axios.get(`https://countriesnow.space/api/v0.1/countries/flag/images`);
    
    // Find the country's flag data.
    const countryFlagData = flagResponse.data.data.find(country => country.iso3 === countryCode.toUpperCase() || country.iso2 === countryCode.toUpperCase());
    
    // Extract flag URL or return null if not found.
    const flag = countryFlagData ? countryFlagData.flag : null;

    // Return country information.
    return res.json({
      countryCode,
      borders,
      population,
      flag
    });

  } catch (error) {
    console.error('Error fetching country data:', error);
    if (error.response) {
      if (error.response.status === 404 && error.response.config.url === 'https://countriesnow.space/api/v0.1/countries/population') {
        // Population data not found, return a message in the response.
        return res.json({
          countryCode,
          borders,
          population: { message: `Population data not found for ${countryCode}` },
          flag
        });
      } else if (error.response.status === 404) {
        // Country not found in the countries API.
        return res.status(404).json({
          countryCode,
          borders: [],
          population: [],
          flag: null,
          message: `Country not found ${countryCode}`
        });
      } else {
        // Other API error.
        return res.status(error.response.status).json({
          message: 'Error getting country information',
          details: error.response.data
        });
      }
    } else if (error.request) {
      // Error in the API request (e.g., no connection).
      return res.status(500).json({
        message: 'Connection error to external server'
      });
    } else {
      // Other unexpected error.
      return res.status(500).json({
        message: 'Error getting country information',
        details: error.message
      });
    }
  }
});

/**
 * @route GET /countries
 * @description Get a list of available countries.
 * @access Public
 */
router.get("/countries", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.NAGER_API_BASE_URL}/AvailableCountries`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error with countries data", error);
    res.status(500).json({ message: "Error getting available countries" });
  }
});

module.exports = router;