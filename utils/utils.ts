// 获取连接参数
function getQueryString(query:string):string|null {
  const reg = new RegExp("(^|&)" + query + "=([^&]*)(&|$)", "i");
  const r = location.search.slice(1).match(reg);
  return r === null ? r : r[2];
}

// TODO:
function updateUrl(url:string,options:object):string{
  return url;
}

// 图片模糊
// ?imageView&blur=40x20
function blurImage(url:string,blur:string="40x20"):string{
  return updateUrl(url,{
    imageView:true,
    blur
  });
}


export {
  getQueryString,
  updateUrl,
  blurImage
}