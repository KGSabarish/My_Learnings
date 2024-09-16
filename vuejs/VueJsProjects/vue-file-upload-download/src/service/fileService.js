import axios from 'axios';

const API_URL = 'http://localhost:3000';

export default {
  uploadFile(file) {
    return axios.post(`${API_URL}/upload`, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getFiles() {
    return axios.get(`${API_URL}/files`).then(response => response.data);
  },
};
