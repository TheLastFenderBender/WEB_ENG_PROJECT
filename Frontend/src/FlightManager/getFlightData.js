import axios from 'axios';

const getFlightData = async (searchInput, selectedOption) => {
  const response = await axios.get("http://localhost:3000/flights");
  const flightData = response.data;
  if (searchInput === '') {
    return flightData;
  }
  return flightData.filter((flight) => {
    if (selectedOption === 'flightNumber') {
      return flight[selectedOption] === Number(searchInput);
    } else {
      // eslint-disable-next-line
      return flight[selectedOption] == searchInput;
    }
  });
};

export default getFlightData;