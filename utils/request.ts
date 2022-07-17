import axios from 'axios';
import { ENV, IS_DEBUG, APIURL } from 'CONFIG/config';

const axiosInstance = axios.create({
  baseURL: APIURL,
  timeout: 10000,
  responseType: 'json',
  withCredentials: true
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    if(IS_DEBUG && ENV === 'beta'){
      console.log(`request ${config.url}, params: \n`,config.data);
    }
    // Do something before request is sent
    return config;
  },
  err => {
    if(IS_DEBUG && ENV === 'beta'){
      console.log(`request send ERR ${err.config.url}, err: \n`,err);
    }
    // Do something with request error
    return Promise.reject(err.data.error.message);
  }
);

axiosInstance.interceptors.response.use(
  res => {
    if(IS_DEBUG && ENV === 'beta'){
      console.log(`reponse ${res.config.url}, res: \n`,res.data);
    }
    return res;
  },
  err => {
    if(IS_DEBUG && ENV === 'beta'){
      console.log(`request ERR ${err.config.url}, err: \n`,err);
    }
    // Do something with response error
    return Promise.reject(err);
  }
);

interface RequestOptions {
  url: string,
  method?: string,
  data?: object,
  clearCache?: boolean, // 不要缓存
}


/**
 * @params options 
 * {
 *    url:'',
 *    data:{},
 *    clearCache?:boolean, // POST默认缓存,不要缓存指定false
 * }
 */
export default (options: RequestOptions): Promise<any> => {
  const config = {
    url: options.url,
    method: options.method || 'post',
    data: options.clearCache ? 
      Object.assign({}, options.data, { timestamp: Date.now() }) 
      : (options.data || {})
  };
  return axiosInstance(config).then(res=>{
    return res.data;
  });
}