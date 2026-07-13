import axios from 'axios';
import Config from './Config';

axios.defaults.headers.common['Cache-Control'] = 'no-cache';
axios.defaults.headers.common.Accept = 'application/json';

let authToken = null;

export const getAuthToken = () => authToken;

export const setAuthToken = token => {
  authToken = token;

  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

axios.interceptors.request.use(
  config => {
    if (authToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${authToken}`,
      };
    }
    return config;
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  response => response,
  error => {
    if (error?.response?.status === 401) {
      setAuthToken(null);
    }
    return Promise.reject(error);
  },
);

const requests = {
  get: url => axios.get(`${Config.baseURL}${url}`),
  post: (url, data, config = {}) =>
    axios.post(`${Config.baseURL}${url}`, data, config),
  put: (url, data, config = {}) =>
    axios.put(`${Config.baseURL}${url}`, data, config),
  delete: url => axios.delete(`${Config.baseURL}${url}`),
};

const getWithFallback = async (endpoints, label = 'API') => {
  let lastError;

  for (let index = 0; index < endpoints.length; index += 1) {
    const endpoint = endpoints[index];

    try {
      const response = await requests.get(endpoint);

      if (index > 0) {
        console.log(`${label} fallback used: ${endpoint}`);
      }

      return response;
    } catch (error) {
      lastError = error;
      const status = error?.response?.status;
      const hasFallback = index < endpoints.length - 1;

      if (status === 404 && hasFallback) {
        console.log(`${label} ${endpoint} returned 404, trying fallback`);
        continue;
      }

      throw error;
    }
  }

  throw lastError;
};

const Api = {
  login: data => requests.post('login', data),
  logout: () => requests.delete('logout'),
  sendOtp: data => requests.post('sendotp', data),
  resendOtp: data => requests.post('resendotp', data),
  verifyOtp: data => requests.post('verifyotp', data),
  resetPassword: data => requests.post('resetpassword', data),
  changePassword: data => requests.post('changepassword', data),
  getProfile: () => requests.get('getprofile'),
  updateProfile: data => requests.post('updateprofile', data),
  staffFeedback: data => requests.post('staff-feedback', data),
  asmFeedback: data => requests.post('asm-feedback', data),
  getSurveyQuestions: role => requests.get(`survey-questions/${role}`),
  getTrainingVideos: role => requests.get(`training-videos?role=${role}`),
  getCategoryBreakdown: () => requests.get('category-breakdown'),
  getDashboard: () => requests.get('dashboard'),
  getSlipBoundIncentive: () => requests.get('slip-bound-incentive'),
  getConversionRate: (from, to) =>
    requests.get(`conversion-rate?from=${from}&to=${to}`),
  getBranchManagerCommission: () =>
    getWithFallback(
      ['branch-manager-commission', 'category-breakdown'],
      'Branch Manager Commission',
    ),
  getBranchManagerCategoryPerformance: () =>
    requests.get('branch-manager-category-performance'),
};

export default Api;
