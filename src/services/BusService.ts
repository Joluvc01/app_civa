import axios from 'axios';

const API_URL = 'http://localhost:8088';

class BusService {
  getBuses(page: number, size: number) {
    return axios.get(`${API_URL}/bus`, {
      params: { page, size }
    });
  }

  getBusById(id: string) {
    return axios.get(`${API_URL}/bus/${id}`);
  }
}

export default new BusService();
