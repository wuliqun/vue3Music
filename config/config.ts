import { getQueryString } from "UTILS/utils";
import apiConfig from './apiConfig';

const ENV:string = getQueryString('env') || process.env.ENV!;

// 调试模式, 打印接口请求及返回值
const IS_DEBUG:boolean = Number(getQueryString('debug')) === 1;


const APIURL:string = apiConfig[ENV].apiUrl;

export {
  ENV,
  IS_DEBUG,
  APIURL
}