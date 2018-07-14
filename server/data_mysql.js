const { query } = require('./async-db')
// async function selectAllData() {
//   let sql = 'SELECT count(*) FROM ad_analysis_ios WHERE image_download_cost_time<(400)'
//   let dataList = await query( sql )
//   return dataList
// }
// async function getData() {
//   let dataList = await selectAllData()
//   console.log( dataList )
//   console.log(dataList[0]['count(*)'])
// }

// getData()

async function getLineData(loc) {
  let xData = ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000', '1100', '1200', '1300', '1400',
  '1500', '1600', '1700', '1800', '1900', '2000', '2100', '2200', '2300', '2400', '2500', '2600',
  '2700', '2800', '2900', '3000', '3100', '3200', '3300', '3400', '3500', '3600', '3700', '3800'];
  // let location = ['Shanghai', 'Beijing', 'Hangzhou', 'Xian', 'Chengdu', 'Wuhan'];
  const SQL = 'SELECT count(*) FROM ad_analysis_ios WHERE cost_time>0 and image_download_cost_time>0 and city=\'' + loc +'\' and ';
  let data = [];
  let sql = SQL + 'image_download_cost_time+cost_time<' + xData[0];
  let result = await query(sql);
  data.push(result[0]['count(*)']);
  for (let index = 0; index < xData.length - 1; index++) {
    const element1 = xData[index];
    const element2 = xData[index + 1];
    const sql = SQL + 'image_download_cost_time+cost_time>' + element1 + ' and image_download_cost_time+cost_time<' + element2;
    let result = await query(sql);
    data.push(result[0]['count(*)']);
  }
  sql = SQL + 'image_download_cost_time+cost_time>' + xData[xData.length - 1];
  result = await query(sql);
  data.push(result[0]['count(*)']);
  
  console.log(loc + '[' + data.toString() + ']');
}


async function getAdLineData() {
  let xData = ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000', '1100', '1200', '1300', '1400',
    '1500', '1600', '1700', '1800', '1900', '2000', '2100', '2200', '2300', '2400', '2500', '2600',
    '2700', '2800', '2900', '3000', '3100', '3200', '3300', '3400', '3500', '3600', '3700', '3800'];
  let data = [];
  let sql = 'SELECT count(*) FROM ad_analysis_ios WHERE cost_time>0 and image_download_cost_time>0 and cost_time<' + xData[0];
  let result = await query(sql);
  data.push(result[0]['count(*)']);
  for (let index = 0; index < xData.length - 1; index++) {
    const element1 = xData[index];
    const element2 = xData[index + 1];
    const sql = 'SELECT count(*) FROM ad_analysis_ios WHERE cost_time>' + element1 +
      ' and cost_time<' + element2;
    let result = await query(sql);
    data.push(result[0]['count(*)']);
  }
  sql = 'SELECT count(*) FROM ad_analysis_ios WHERE cost_time>' + xData[xData.length - 1];
  result = await query(sql);
  data.push(result[0]['count(*)']);

  console.log('[' + data.toString() + ']');
}

async function getImageLineData() {
  let xData = ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000', '1100', '1200', '1300', '1400',
    '1500', '1600', '1700', '1800', '1900', '2000', '2100', '2200', '2300', '2400', '2500', '2600',
    '2700', '2800', '2900', '3000', '3100', '3200', '3300', '3400', '3500', '3600', '3700', '3800'];
  let data = [];
  let sql = 'SELECT count(*) FROM ad_analysis_ios WHERE cost_time>0 and image_download_cost_time>0 and image_download_cost_time<' + xData[0];
  let result = await query(sql);
  data.push(result[0]['count(*)']);
  for (let index = 0; index < xData.length - 1; index++) {
    const element1 = xData[index];
    const element2 = xData[index + 1];
    const sql = 'SELECT count(*) FROM ad_analysis_ios WHERE image_download_cost_time>' + element1 +
      ' and image_download_cost_time<' + element2;
    let result = await query(sql);
    data.push(result[0]['count(*)']);
  }
  sql = 'SELECT count(*) FROM ad_analysis_ios WHERE image_download_cost_time>' + xData[xData.length - 1];
  result = await query(sql);
  data.push(result[0]['count(*)']);

  console.log('[' + data.toString() + ']');
}


async function getSliceData() {
  let sql = 'SELECT avg(dns_cost_time),avg(tcp_cost_time),avg(ssl_cost_time),avg(request_cost_time),\
  avg(first_pack_cost_time),avg(response_cost_time),avg(image_download_cost_time) FROM ad_analysis_ios\
  where http_code=200 and (image_size<>0 or (image_size=0 and is_image_cache=1))';
  let result = await query(sql);
  console.log(result);
}
// getSliceData();

async function getSlowSliceData() {
  const SQL = 'SELECT avg(dns_cost_time),avg(tcp_cost_time),avg(ssl_cost_time),avg(request_cost_time),\
  avg(first_pack_cost_time),avg(response_cost_time),avg(image_download_cost_time) FROM ad_analysis_ios where http_code=200 and (image_size<>0 or (image_size=0 and is_image_cache=1)) and ';
  let xData = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500];
  let data = [];
  for (let index = 0; index < xData.length - 1; index++) {
    const element1 = xData[index];
    const element2 = xData[index + 1];
    const sql = SQL + 'cost_time+image_download_cost_time>=' + element1 + ' and cost_time+image_download_cost_time<' + element2;
    let result = await query(sql);
    data.push(result);
  }
  let sql = SQL + 'cost_time+image_download_cost_time>=' + xData[xData.length - 1];
  let result = await query(sql);
  data.push(result);
  let finalData = [[],[],[],[],[],[],[]];
  for (let index = 0; index < data.length; index++) {
    const res = data[index];
    finalData[0].push(res[0]['avg(dns_cost_time)']);
    finalData[1].push(res[0]['avg(tcp_cost_time)']);
    finalData[2].push(res[0]['avg(ssl_cost_time)']);
    finalData[3].push(res[0]['avg(request_cost_time)']);
    finalData[4].push(res[0]['avg(first_pack_cost_time)']);
    finalData[5].push(res[0]['avg(response_cost_time)']);
    finalData[6].push(res[0]['avg(image_download_cost_time)']);
  }
  for (const key in finalData) {
    if (finalData.hasOwnProperty(key)) {
      const element = finalData[key];
      console.log('[' + element.toString() + ']');
    }
  }
}


async function getPieData() {
  const SQL = 'SELECT count(*) FROM ad_analysis_ios where http_code=200 and (image_size<>0 or (image_size=0 and is_image_cache=1)) and ';
  let xData = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000];
  let data = [];
  for (let index = 0; index < xData.length - 1; index++) {
    const element1 = xData[index];
    const element2 = xData[index + 1];
    const sql = SQL + 'cost_time+image_download_cost_time>=' + element1 + ' and cost_time+image_download_cost_time<' + element2;
    let result = await query(sql);
    data.push(result[0]['count(*)']);
  }
  let sql = SQL + 'cost_time+image_download_cost_time>=' + xData[xData.length - 1];
  let result = await query(sql);
  data.push(result[0]['count(*)']);

  console.log('[' + data.toString() + ']');
}

async function getPreAdData() {
  const SQL = 'SELECT count(*) FROM ad_analysis_ios WHERE ';
  let xData = ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000', '1100', '1200', '1300', '1400',
    '1500', '1600', '1700', '1800', '1900', '2000', '2100', '2200', '2300', '2400', '2500', '2600',
    '2700', '2800', '2900', '3000', '3100', '3200', '3300', '3400', '3500', '3600', '3700', '3800'];
  let data = [];
  let sql = SQL + 'pre_ad_cost_time>0 and pre_ad_cost_time<=' + xData[0];
  let result = await query(sql);
  data.push(result[0]['count(*)']);
  for (let index = 0; index < xData.length - 1; index++) {
    const element1 = xData[index];
    const element2 = xData[index + 1];
    const sql = SQL + 'pre_ad_cost_time>' + element1 +
      ' and pre_ad_cost_time<=' + element2;
    let result = await query(sql);
    data.push(result[0]['count(*)']);
  }
  sql = SQL + 'pre_ad_cost_time>' + xData[xData.length - 1];
  result = await query(sql);
  data.push(result[0]['count(*)']);

  console.log('[' + data.toString() + ']');
}

async function getImageSizeData() {
  const SQL = 'SELECT avg(image_download_cost_time) FROM ad_analysis_ios WHERE ';
  let xData = ['20', '40', '60', '80', '100', '120', '140', '160', '180', '200', '220', '240', '260', '280', '300'];
  let data = [];
  let sql = SQL + 'image_size/1024>0 and image_size/1024<' + xData[0];
  let result = await query(sql);
  data.push(result[0]['avg(image_download_cost_time)']);
  for (let index = 0; index < xData.length - 1; index++) {
    const element1 = xData[index];
    const element2 = xData[index + 1];
    const sql = SQL + 'image_size/1024>' + element1 + ' and image_size/1024<' + element2;
    let result = await query(sql);
    data.push(result[0]['avg(image_download_cost_time)']);
  }
  sql = SQL + 'image_size/1024>' + xData[xData.length - 1];
  result = await query(sql);
  data.push(result[0]['avg(image_download_cost_time)']);

  console.log('[' + data.toString() + ']');
}

async function computer() {
  const data = [0, 137, 592, 2127, 4728, 7809, 13487, 21652, 32350, 42274, 46617, 47627, 43618,
    37272, 34440, 40402, 44136, 33269, 26054, 21349, 18106, 15816, 14152, 12977, 11112, 10224,
    9694, 9053, 8160, 7335, 6405, 5610, 5321, 4879, 4303, 3883, 3495, 3267, 63245];
  let sum = 0;
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key];
      sum += element;
    }
  }
  console.log(sum);
}

function combine(data2) {
  const data1 = [-100, 0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400,
    1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600,
    2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900];
  let data = [];
  let string = '';
  for (let index = 0; index < data1.length; index++) {
    const element1 = data1[index];
    const element2 = data2[index];
    data.push([element1, element2]);
    string = string + ',' + '[' + [element1, element2].toString() + ']'
  }
  // console.log(data.toString());
  console.log(string);
}
// combine([0, 180, 43324, 45310, 29250, 47529, 63812, 64791, 55992, 45446, 35790, 28292, 25378, 41072, 47200, 28591, 23957, 19921, 16369, 13854, 11641, 10127, 8594, 8361, 8399, 7809, 7099, 6162, 5166, 4699, 3898, 3602, 2903, 2556, 2528, 2506, 2196, 1990, 1886, 1664, 29567]);

async function getiOSLineData(require) {
  let xData = [-100, 0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400,
    1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600,
    2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800];
  const SQL = 'SELECT count(*) FROM ad_analysis_ios WHERE http_code=200 and (image_size<>0 or (image_size=0 and is_image_cache=1)) and ';
  let data = [];
  let sql = SQL + require + '<=' + xData[0];
  let result = await query(sql);
  data.push(result[0]['count(*)']);
  for (let index = 0; index < xData.length - 1; index++) {
    const element1 = xData[index];
    const element2 = xData[index + 1];
    const sql = SQL + require + '>' + element1 + ' and ' + require + '<=' + element2;
    let result = await query(sql);
    data.push(result[0]['count(*)']);
  }
  sql = SQL + require + '>' + xData[xData.length - 1];
  result = await query(sql);
  data.push(result[0]['count(*)']);
  console.log(require + '[' + data.toString() + ']');
}
// getiOSLineData('cost_time+image_download_cost_time-pre_ad_cost_time');

async function getAverageData() {
  let data = [];
  const totalResult = await query('SELECT count(*) FROM mydb.ad_analysis_ios where http_code=200 and (image_size<>0 or (image_size=0 and is_image_cache=1))');
  const total = totalResult[0]['count(*)']
  const offSet = 1;// Math.floor(total * 0.1);
  for (let index = 1; index < 20; index++) {
    const element = Math.floor(total * 0.05 * index) - 1;
    const sql = 'SELECT cost_time+image_download_cost_time FROM (SELECT * FROM mydb.ad_analysis_ios where http_code=200 and (image_size<>0 or (image_size=0 and is_image_cache=1)) order by image_download_cost_time+cost_time limit ' + element + ',' + offSet + ') as analysis';
    console.log(sql);
    let result = await query(sql);
    for (const key in result[0]) {
      if (result[0].hasOwnProperty(key)) {
        const element = result[0][key];
        data.push(element);
      }
    }
  }
  console.log('[' + data.toString() + ']');
}

async function getStandardDeviation(type) {
  const result = await query('SELECT FORMAT(STD(cost_time+image_download_cost_time),2) FROM mydb.ad_analysis_ios where conntype=' + type + ' and http_code=200 and (image_size<>0 or (image_size=0 and is_image_cache=1))');
  console.log(type + ': ' + result instanceof Array);
}
getStandardDeviation(1);
// getStandardDeviation(2);
// getStandardDeviation(3);
// getStandardDeviation(4);

async function getNetworkData(type) {
  const SQL = 'SELECT count(*) FROM ad_analysis_ios WHERE conntype=' + type + ' and http_code=200 and (image_size<>0 or (image_size=0 and is_image_cache=1)) and ';
  let xData = [-100, 0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400,
    1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600,
    2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800];
  let data = [];
  let sql = SQL + 'image_download_cost_time+cost_time<' + xData[0];
  let result = await query(sql);
  data.push(result[0]['count(*)']);
  for (let index = 0; index < xData.length - 1; index++) {
    const element1 = xData[index];
    const element2 = xData[index + 1];
    const sql = SQL + 'image_download_cost_time+cost_time>=' + element1 +
      ' and image_download_cost_time+cost_time<' + element2;
    let result = await query(sql);
    data.push(result[0]['count(*)']);
  }
  sql = SQL + 'image_download_cost_time+cost_time>=' + xData[xData.length - 1];
  result = await query(sql);
  data.push(result[0]['count(*)']);

  console.log(type + ': ' + '[' + data.toString() + ']');
  combine(data);
}
// getNetworkData(1)
// getNetworkData(2);
// getNetworkData(3);
// getNetworkData(4);