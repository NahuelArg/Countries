import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import "./CountryInfo.css";

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

function CountryInfo() {
  const { countryCode } = useParams();
  const [countryInfo, setCountryInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const response = await axios.get(`/api/country/${countryCode}`);
        setCountryInfo(response.data);
      } catch (error) {
        console.error("Error fetching country info:", error);
      }
    };

    fetchCountryInfo();
  }, [countryCode]);

  if (!countryInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="country-info-container">
      <h1>{countryInfo.countryCode}</h1>
      <img src={countryInfo.flag} alt={`${countryInfo.countryCode} flag`} className="country-flag" />

      <h2>Border Countries:</h2>
      <ul className="border-country-list">
        {countryInfo.borders.map((border) => (
          <li key={border} className="border-country-item">
            <span className="border-country-name">{border}</span>
          </li>
        ))}
      </ul>

      <h2>Population:</h2>
      {countryInfo.population && countryInfo.population.length > 0 ? (
        <Line
          data={{
            labels: countryInfo.population.map((entry) => entry.year),
            datasets: [
              {
                label: "Population",
                data: countryInfo.population.map((entry) => entry.population),
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
            ],
          }}
          options={{
            scales: {
              x: { type: "category" },
            },
            plugins: {
              title: {
                display: true,
                text: `Population Growth of ${countryInfo.countryCode}`,
              },
            },
          }}
        />
      ) : (
        <p>No population data available for {countryInfo.countryCode}</p>
      )}
            <button onClick={() => navigate(-1)} className="back-button">Back</button>

    </div>
  );
}

export default CountryInfo;
