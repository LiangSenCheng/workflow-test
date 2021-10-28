const fs = require('fs');
const path = require('path');

const testJsonFile = path.resolve(__dirname, './test.json');

const data = fs.readFileSync(testJsonFile, 'UTF-8').toString();
const { list } = JSON.parse(data);

console.log(data, list);

const baseUrl = "https://pure.jsdelivr.net/gh/LiangSenCheng/blog-img/"

async function frushcdn(filePath) {
  // 上面的请求也可以这样做
  const res = axios.get(`${baseUrl}${filePath}`, {});
  console.log(res);
  return filePath;
}

const result = data.map(async (item) => {
  return await frushcdn(item);
});

console.log(result);
