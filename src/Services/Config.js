// Beta server
const USE_LOCAL_API = false;

const betaApi = {
  baseURL: 'https://ranglerzbeta.in/limelight/api/',
  domain: 'https://ranglerzbeta.in/limelight/',
};

const localApi = {
  baseURL: 'http://192.168.18.184/limelight-sales-performance/api/',
  domain: 'http://192.168.18.184/limelight-sales-performance/',
};

const activeApi = USE_LOCAL_API ? localApi : betaApi;

const Config = {
  baseURL: activeApi.baseURL,
  domain: activeApi.domain,
};

export default Config;
