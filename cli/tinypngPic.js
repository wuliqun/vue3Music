#!/usr/bin/env node
/* =============================================================================
#     FileName: tinypngPic.js
#         Desc:    
#   LastChange: 2021-09-07 16:08:58
#         参考：https://segmentfault.com/a/1190000015467084
#               https://github.com/pch1024/thank-tinypng
#               https://github.com/zhanyuzhang/super-tinypng
============================================================================= */

const fs = require("fs");
const path = require("path");
const https = require("https");
const URL = require("url").URL;
const crypto = require('crypto');
const EventEmitter = require("events");

const err = (msg) => new EventEmitter().emit("error", msg);


const conf = {
  successCount: 0, // 成功图片
  files: [], // 待压缩的图片文件
  cacheTinyPNGFile: '.cacheTinyPNG',
  cacheTinyPNGPic: {}, // 历史数据
  deepLoop : true, // 递归目录
  exts: [".jpg", ".png"],
  max: 5200000 // 5MB == 5242848.754299136
};

/**
 * 过滤待处理文件夹，得到待处理文件列表
 * @param {*} folder 待处理文件夹
 * @param {*} files 待处理文件列表
 */
function fileFilter(folder) {
  // 读取文件夹
  fs.readdirSync(folder).forEach((file) => {
    let fullFilePath = path.posix.join(folder, file);
    // 读取文件信息
    let fileStat = fs.statSync(fullFilePath);

    // 过滤文件安全性/大小限制/后缀名
    if (fileStat.size <= conf.max && fileStat.isFile() && conf.exts.includes(path.extname(file))) {
      let fileKey = fullFilePath.replace(imageDir, '');
      let cacheMD5 = conf.cacheTinyPNGPic[fileKey] || '';
      let md5 = md5File(fullFilePath);

      if(cacheMD5 !== md5){
        conf.files.push(fullFilePath);
      } else {
        console.log(`文件已压缩，跳过文件：${fullFilePath}`); 
      }
    }
    // 是都要深度递归处理文件夹
    else if (conf.deepLoop && fileStat.isDirectory()) {
      fileFilter(fullFilePath);
    }
  });
}

/**
 * TinyPng 远程压缩 HTTPS 请求的配置生成方法
 */
function getAjaxOptions() {
  return {
    method: "POST",
    hostname: "tinypng.com",
    path: "/web/shrink",
    headers: {
      rejectUnauthorized: false,
      // 生成随机IP， 赋值给 X-Forwarded-For
      "X-Forwarded-For": Array(4).fill(1).map(() => parseInt(Math.random() * 254 + 1)).join("."),
      "Postman-Token": Date.now(),
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36"
    }
  };
}

/**
 * TinyPng 远程压缩 HTTPS 请求
 * @param {string} img 待处理的文件
 * @success {
 *              "input": { "size": 887, "type": "image/png" },
 *              "output": { "size": 785, "type": "image/png", "width": 81, "height": 81, "ratio": 0.885, "url": "https://tinypng.com/web/output/7aztz90nq5p9545zch8gjzqg5ubdatd6" }
 *           }
 * @error  {"error": "Bad request", "message" : "Request is invalid"}
 */
function fileUpload(imgPath) {
  let req = https.request(getAjaxOptions(), (res) => {
    res.on("data", (buf) => {
      let obj = JSON.parse(buf.toString());
      if (obj.error) {
        console.log(`压缩失败！\n 当前文件：${imgPath} \n ${obj.message}`);
      } else {
        fileUpdate(imgPath, obj);
      }
    });
  });

  req.write(fs.readFileSync(imgPath), "binary");
  req.on("error", (e) => console.error(`请求错误! \n 当前文件：${imgPath} \n`, e));
  req.end();
}

// 该方法被循环调用,请求图片数据
function fileUpdate(entryImgPath, obj) {
  let options = new URL(obj.output.url);
  let req = https.request(options, (res) => {
    let body = "";
    res.setEncoding("binary");
    res.on("data", (data) => (body += data));
    res.on("end", () => {
      fs.writeFile(entryImgPath, body, "binary", (err) => {
        if (err) {
          return console.error(err);
        }

        conf.successCount++;

        let md5 = md5File(entryImgPath);
        let fileKey = entryImgPath.replace(imageDir, '');
        let log = `[${conf.successCount}]压缩成功，`;
        log += `优化比例: ${((1 - obj.output.ratio) * 100).toFixed(2)}% ，`;
        log += `原始大小: ${(obj.input.size / 1024).toFixed(2)}KB ，`;
        log += `压缩大小: ${(obj.output.size / 1024).toFixed(2)}KB ,`;
        log += `md5：${md5} ，`;
        log += `文件 ：${entryImgPath}`;
        console.log(log);

        // 缓存数据
        conf.cacheTinyPNGPic[fileKey] = md5;
        // 写入缓存历史
        writeCacheTinyPNG();
      });
    });
  });
  req.on("error", (e) => console.error(e));
  req.end();
}

// 计算小文件md5
function md5File(entryImgPath) {
  const buffer = fs.readFileSync(entryImgPath);
  const hash = crypto.createHash('md5');
  hash.update(buffer, 'utf8');
  const md5 = hash.digest('hex');
  return md5;
};

// 写入压缩历史
function writeCacheTinyPNG() {
  let text = JSON.stringify(conf.cacheTinyPNGPic);
  let cachePath = path.join(imageDir, conf.cacheTinyPNGFile);

  fs.writeFile(cachePath, text, "utf8", (err) => {
    if (err) {
      return console.error(err);
    }
  });
}

// 读取压缩历史
function readCacheTinyPNG() {
  let cachePath = path.posix.join(imageDir, conf.cacheTinyPNGFile);
  if(fs.existsSync(cachePath)){
    let data = fs.readFileSync(cachePath, 'utf8');
    // 读取压缩历史
    conf.cacheTinyPNGPic = JSON.parse(data);
  }
}

/**
 * 获取活动环境
 *
 * @returns
 */
function getEntry() {

  const entry = `../src/img`;
  console.log(`当前指定压缩路径: ${entry}`);
  return entry;
}


// 待压缩的目录
const imageDir =  path.posix.resolve(getEntry());

// 读取压缩历史
readCacheTinyPNG();
// 入口
fileFilter(imageDir);
// 上传压缩
conf.files.forEach((img) => fileUpload(img));
