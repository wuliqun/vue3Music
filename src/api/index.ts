import request  from "UTILS/request";

// 获取轮播图
export function apiBanner(){
  return request({
    url:'/banner',
    data:{
      type:0
    }
  })
}

// 获取推荐歌单
export function apiGetRecommendPlaylist(limit:number = 8){
  return request({
    url:'/personalized',
    data:{
      limit
    }
  })
}