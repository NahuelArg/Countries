# Country Information Application

This project is a web application that allows users to explore detailed information about countries, including borders, population statistics, and flags. It uses a React-based frontend and an Express.js backend, fetching data from external APIs to provide relevant country information.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [API Endpoints](#api-endpoints)
  - [Get Country Information](#get-country-information)
  - [Get List of Countries](#get-list-of-countries)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- List of available countries, fetched from an external API.
- Detailed country view including:
  - Country flag
  - Border countries
  - Population growth data (if available)
- Pagination for country list to navigate through large data sets.

## Technologies

- **Frontend:**
  - React
  - React Router
  - Axios
  - Chart.js (for population growth charts)
  - CSS (custom styling)
  
- **Backend:**
  - Express.js
  - Axios (for making external API requests)
  - CORS (Cross-Origin Resource Sharing)
  - dotenv (for environment variables)

- **APIs:**
  - Nager.Date API (for country borders and info)
  - CountriesNow API (for population and flags)

## Setup

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <repo-directory>
- Navigate to the frontend directory and install dependencies:
cd frontend
npm install
Start the frontend server:
npm start
- Navigate to the backend directory:
cd backend
- Install the backend dependencies:
  *npm install
Create a .env file in the backend directory and add your environment variables (such as API URLs):
-Start the backend server:
npm start
The backend will now be running on http://localhost:3001 and the frontend on http://localhost:3000.
API Endpoints

Get Country Information
Route: GET /api/country/:countryCode
Description: Fetches information for a specific country, including borders, population data, and flag.
Parameters:
  countryCode: ISO 3-letter country code (e.g., USA for the United States).
Response:
  JSON object containing:
    countryCode: Country code.
    borders: List of countries bordering the specified country.
    population: Population data (if available).
    flag: URL of the country’s flag.

Get List of Countries
Route: GET /api/countries
Description: Fetches a list of all available countries.
Response:
  JSON array containing country names and ISO 2-letter country codes.

Usage
Once both the backend and frontend servers are running:

1. Navigate to http://localhost:3000 in your browser.
2. The country list will appear on the homepage.
3. Click on any country to view its detailed information.

Contributing
Contributions are welcome! If you have any suggestions, bug fixes, or improvements, please open an issue or submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

