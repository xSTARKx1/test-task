import axios from 'axios';

axios.defaults.baseURL = 'https://run.mocky.io/v3/';

const fetchCities = async () => {
  const cities = await axios.get('/9fcb58ca-d3dd-424b-873b-dd3c76f000f4');

  return cities.data;
};
const fetchSpeciality = async () => {
  const cities = await axios.get('/e8897b19-46a0-4124-8454-0938225ee9ca');

  return cities.data;
};

const fetchDoctors = async () => {
  const cities = await axios.get('/3d1c993c-cd8e-44c3-b1cb-585222859c21');

  return cities.data;
};

export { fetchCities, fetchSpeciality, fetchDoctors };
