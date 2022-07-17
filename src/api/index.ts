import request  from "UTILS/request";

export function apiBanner(){
  return request({
    url:'/banner',
    data:{
      type:0
    }
  })
}