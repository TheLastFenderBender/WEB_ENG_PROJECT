// Import axios
import axios from 'axios';

// Define the API key and base URL
const API_KEY = 'b919893bcb6febf1fa61f1e6bbfa465b';
const BASE_URL = 'http://api.aviationstack.com/v1/flights';

// Define a function that takes a flight number as a parameter and returns a promise
const getFlightData = (flightNumber) => {
  // Construct the request URL with the flight number and the API key
  const requestURL = `${BASE_URL}?flight_number=${flightNumber}&access_key=${API_KEY}`;

  // Return the axios promise
  return axios.get(requestURL);
};

// Export the function
export default getFlightData;