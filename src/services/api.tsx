import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/';

export const fetchStations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/stations/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stations:', error);
    return [];
  }
};

export const fetchCuves = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}cuves/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cuves:', error);
    return [];
  }
};
