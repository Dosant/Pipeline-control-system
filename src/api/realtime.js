import axios from 'axios';
export function checkConnection() {
  return axios.get('/api/realtime/connected')
    .then(({data}) => {
      return data;
    })
}