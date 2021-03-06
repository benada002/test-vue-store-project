import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import store from './store';

export default axios.create({
  baseURL: '',
  onDownloadProgress: (progressEvent) => {
    store.commit('updateLoadingProcess', Math.round((progressEvent.loaded * 100) / progressEvent.total));
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
