import { Platform } from 'react-native';

// Postman local: http://localhost/limelight-sales-perfomance/api/
// Beta server: https://ranglerzbeta.in/limelight/api/
const USE_LOCAL_API = true;

const localApiHost = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const betaApi = {
  baseURL: 'https://ranglerzbeta.in/limelight/api/',
  domain: 'https://ranglerzbeta.in/limelight/',
};
const localApi = {
  baseURL: `http://${localApiHost}/limelight-sales-perfomance/api/`,
  domain: `http://${localApiHost}/limelight-sales-perfomance/`,
};

const Config = USE_LOCAL_API ? localApi : betaApi;

export default Config;
