import axios from 'axios';
import Toast from 'react-native-simple-toast';
import Config from './Config';
import { getStaffDetailsEndpoint } from '../Utils/staffHelpers';
import { getApiMessage } from '../Utils/apiHelpers';

axios.defaults.headers.common['Cache-Control'] = 'no-cache';
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.timeout = 20000;

if (__DEV__) {
  console.log('API baseURL:', Config.baseURL);
}

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
    const requestUrl = String(error?.config?.url ?? '');
    const isLoginRequest = requestUrl.includes('login');

    if (!isLoginRequest) {
      const message = getApiMessage(null, error);

      if (message) {
        Toast.show(message, Toast.LONG);
      }
    }

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

export const isApiSuccess = response => {
  if (!response) {
    return false;
  }

  const httpStatus = response?.status;
  const bodyStatus = response?.data?.status;

  if (httpStatus == 200) {
    return true;
  }

  return bodyStatus == 200;
};

export const getSlipBoundIncentiveList = responseData => {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  const payload = responseData?.data;

  if (Array.isArray(payload)) {
    return payload;
  }

  return payload?.incentives ?? payload?.slip_bound_incentive ?? [];
};

export const formatApiAppResponse = (response, data) => {
  const resJson = response?.data;

  return {
    status: resJson?.status ?? response?.status,
    message: resJson?.message,
    data,
  };
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
  staffFeedback: data => requests.post('staff-feedback', data),
  asmFeedback: data => requests.post('asm-feedback', data),
  getSurveyQuestions: role => requests.get(`survey-questions/${role}`),
  getTrainingVideos: role => requests.get(`training-videos?role=${role}`),
  getCategoryBreakdown: () => requests.get('category-breakdown'),
  getDashboard: () => requests.get('dashboard'),
  getSlipBoundIncentive: () => requests.get('slip-bound-incentive'),
  getConversionRate: (from, to) =>
    requests.get(`conversion-rate?from=${from}&to=${to}`),
  getBranchManagerDashboard: () => requests.get('branch-manager-dashboard'),
  getBranchManagerCommission: () => requests.get('branch-manager-commission'),
  getBranchManagerCategoryPerformance: () =>
    requests.get('branch-manager-category-performance'),
  getBranchManagerStaffComparison: () =>
    requests.get('branch-manager-staff-comparison'),
  getBranchManagerBranchComparison: () =>
    requests.get('branch-manager-branch-comparison'),
  getMonthlyTargets: () => requests.get('monthly-targets'),
  assignBranchManagerTargets: data =>
    requests.post('branch-manager/assign-targets', data),
  getAsmBranchComparison: () => requests.get('asm-branch-comparison'),
  getAsmBranchConversion: type =>
    requests.get(`asm-branch-conversion?type=${type}`),
  getAsmRegionComparison: () => requests.get('asm-regions-comparison'),
  getAsmRegionConversion: type =>
    requests.get(`asm-region-comparison?type=${type}`),
  getAsmStaffComparison: () => requests.get('asm-staff-comparison'),
  getAsmBranchTargets: () => requests.get('asm-branch-targets'),
  getStaffDetails: (id, role) =>
    requests.get(getStaffDetailsEndpoint(id, role)),
};

export default Api;
