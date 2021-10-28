const fs = require('fs');
const path = require('path');
const axios = require("axios");
const utc = require('dayjs/plugin/utc'); // dependent on utc plugin
const timezone = require('dayjs/plugin/timezone');
const dayjs = require('dayjs');
dayjs.extend(utc);
dayjs.extend(timezone);

const testJsonFile = path.resolve(__dirname, './test.json');

const data = fs.readFileSync(testJsonFile, 'UTF-8').toString();
const {
  list
} = JSON.parse(data);

console.log(data, list);

const baseUrl = "https://purge.jsdelivr.net/gh/LiangSenCheng/blog-img/"

async function frushcdn(filePath) {
  let resData = {
    code: 40000,
    msg: "fail",
    data: {}
  }
  try {
    // 上面的请求也可以这样做
    const res = await axios.get(`${baseUrl}${filePath}`, {});
    console.log(res);
    const {
      status,
      data
    } = res;
    const {
      paths,
      timestamp
    } = data;
    if (status === 200) {
      if (data.status === "finished") {
        resData["code"] = 0;
        resData["msg"] = "刷新请求成功";
        resData["data"] = {
          path: filePath,
          timestamp: dayjs(timestamp).tz("Asia/Shanghai").format("YYYY-MM-DD HH:MM:ss"),
        }
      } else {
        resData["code"] = 40002;
        resData["msg"] = "网络请求成功,但刷新请求失败~";
      }
    } else {
      resData["code"] = 40002;
      resData["msg"] = "网络请求失败~";
    }
  } catch (err) {
    resData["code"] = 40001
  } finally {
    console.log(resData);
    return resData;
  }
}

const result = list.map(async (item) => {
  return await frushcdn(item);
});

console.log(result);
