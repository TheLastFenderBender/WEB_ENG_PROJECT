import axios from 'axios';

const getFlightData = async (searchInput, selectedOption) => {
  const response = await axios.get("http://localhost:3000/flights");
  const flightData = response.data;
  return flightData.filter((flight) => {
    // eslint-disable-next-line
    return flight[selectedOption] == searchInput;
  });
};

export default getFlightData;