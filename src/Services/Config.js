// Beta server
const USE_LOCAL_API = false;

const betaApi = {
  baseURL: 'https://ranglerz.click/limelight/api/',
  domain: 'https://ranglerz.click/limelight/',
};

const localApi = {
  baseURL: 'http://192.168.18.184/limelight-sales-performance/api/',
  domain: 'http://192.168.18.184/limelight-sales-performance/',
};

const activeApi = USE_LOCAL_API ? betaApi : betaApi;

const Config = {
  baseURL: activeApi.baseURL,
  domain: activeApi.domain,
};

export default Config;
