import axios from 'axios';

// Define the API key and base URL
const API_KEY = 'b919893bcb6febf1fa61f1e6bbfa465b';
const BASE_URL = 'http://api.aviationstack.com/v1/flights';

// Define a function that takes a search input and a selected option as parameters and returns a promise
const getFlightData = (searchInput, selectedOption) => {
  // Construct the request URL with the search input, the selected option and the API key
  const requestURL = `${BASE_URL}?${selectedOption}=${searchInput}&access_key=${API_KEY}`;

  // Return the axios promise
  return axios.get(requestURL);
};

// Export the function
export default getFlightData;