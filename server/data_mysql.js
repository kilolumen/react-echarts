const { query } = require('./async-db')
// async function selectAllData() {
//   let sql = 'SELECT count(*) FROM ad_analysis WHERE image_download_cost_time<(400)'
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
  const SQL = 'SELECT count(*) FROM ad_analysis WHERE cost_time>0 and image_download_cost_time>0 and city=\'' + loc +'\' and ';
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
  let sql = 'SELECT count(*) FROM ad_analysis WHERE cost_time>0 and image_download_cost_time>0 and cost_time<' + xData[0];
  let result = await query(sql);
  data.push(result[0]['count(*)']);
  for (let index = 0; index < xData.length - 1; index++) {
    const element1 = xData[index];
    const element2 = xData[index + 1];
    const sql = 'SELECT count(*) FROM ad_analysis WHERE cost_time>' + element1 +
      ' and cost_time<' + element2;
    let result = await query(sql);
    data.push(result[0]['count(*)']);
  }
  sql = 'SELECT count(*) FROM ad_analysis WHERE cost_time>' + xData[xData.length - 1];
  result = await query(sql);
  data.push(result[0]['count(*)']);

  console.log('[' + data.toString() + ']');
}

async function getImageLineData() {
  let xData = ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000', '1100', '1200', '1300', '1400',
    '1500', '1600', '1700', '1800', '1900', '2000', '2100', '2200', '2300', '2400', '2500', '2600',
    '2700', '2800', '2900', '3000', '3100', '3200', '3300', '3400', '3500', '3600', '3700', '3800'];
  let data = [];
  let sql = 'SELECT count(*) FROM ad_analysis WHERE cost_time>0 and image_download_cost_time>0 and image_download_cost_time<' + xData[0];
  let result = await query(sql);
  data.push(result[0]['count(*)']);
  for (let index = 0; index < xData.length - 1; index++) {
    const element1 = xData[index];
    const element2 = xData[index + 1];
    const sql = 'SELECT count(*) FROM ad_analysis WHERE image_download_cost_time>' + element1 +
      ' and image_download_cost_time<' + element2;
    let result = await query(sql);
    data.push(result[0]['count(*)']);
  }
  sql = 'SELECT count(*) FROM ad_analysis WHERE image_download_cost_time>' + xData[xData.length - 1];
  result = await query(sql);
  data.push(result[0]['count(*)']);

  console.log('[' + data.toString() + ']');
}


async function getSliceData() {
  let sql = 'SELECT avg(dns_cost_time),avg(tcp_cost_time),avg(ssl_cost_time),avg(request_cost_time),\
  avg(first_pack_cost_time),avg(response_cost_time),avg(image_download_cost_time) FROM ad_analysis\
  where cost_time>0 and image_download_cost_time>0';
  let result = await query(sql);
  console.log(result);
}

async function getSlowSliceData() {
  const SQL = 'SELECT avg(dns_cost_time),avg(tcp_cost_time),avg(ssl_cost_time),avg(request_cost_time),\
  avg(first_pack_cost_time),avg(response_cost_time),avg(image_download_cost_time) FROM ad_analysis';
  let xData = ['0', '500', '1000', '1500', '2000', '2500', '3000', '3500'];
  let data = [];
  for (let index = 0; index < xData.length - 1; index++) {
    const element1 = xData[index];
    const element2 = xData[index + 1];
    const sql = SQL + ' WHERE cost_time>0 and image_download_cost_time>0 and cost_time+image_download_cost_time>' + element1 + ' and cost_time+image_download_cost_time<' + element2;
    let result = await query(sql);
    data.push(result);
  }
  let sql = SQL + ' WHERE cost_time+image_download_cost_time>' + xData[xData.length - 1];
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
  const SQL = 'SELECT count(*) FROM ad_analysis';
  let xData = ['0', '1000', '2000', '3000', '4000'];
  let data = [];
  for (let index = 0; index < xData.length - 1; index++) {
    const element1 = xData[index];
    const element2 = xData[index + 1];
    const sql = SQL + ' WHERE cost_time>0 and image_download_cost_time>0 and cost_time+image_download_cost_time>' + element1 + ' and cost_time+image_download_cost_time<' + element2;
    let result = await query(sql);
    data.push(result[0]['count(*)']);
  }
  let sql = SQL + ' WHERE cost_time+image_download_cost_time>' + xData[xData.length - 1];
  let result = await query(sql);
  data.push(result[0]['count(*)']);

  console.log('[' + data.toString() + ']');
}

async function getAverageData() {
  let data = [];
  const total = 662225;
  const offSet = Math.floor(total * 0.05);
  for (let index = 0; index < 20; index++) {
    const element = Math.floor(total * 0.05 * index);
    const sql = 'SELECT avg(cost_time+image_download_cost_time) FROM (SELECT * FROM mydb.ad_analysis where cost_time>0 and image_download_cost_time>0 order by cost_time+image_download_cost_time limit ' + element + ',' + offSet + ') as analysis';
    console.log(sql);
    let result = await query(sql);
    data.push(result[0]['avg(cost_time+image_download_cost_time)']);
  }
  console.log('[' + data.toString() + ']');
}

async function getNetworkData() {
  const SQL = 'SELECT count(*) FROM ad_analysis WHERE conntype=4 and cost_time>0 and image_download_cost_time>0 and ';
  let xData = ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000', '1100', '1200', '1300', '1400',
    '1500', '1600', '1700', '1800', '1900', '2000', '2100', '2200', '2300', '2400', '2500', '2600',
    '2700', '2800', '2900', '3000', '3100', '3200', '3300', '3400', '3500', '3600', '3700', '3800'];
  let data = [];
  let sql = SQL + 'image_download_cost_time+cost_time<' + xData[0];
  let result = await query(sql);
  data.push(result[0]['count(*)']);
  for (let index = 0; index < xData.length - 1; index++) {
    const element1 = xData[index];
    const element2 = xData[index + 1];
    const sql = SQL + 'image_download_cost_time+cost_time>' + element1 +
      ' and image_download_cost_time+cost_time<' + element2;
    let result = await query(sql);
    data.push(result[0]['count(*)']);
  }
  sql = SQL + 'image_download_cost_time+cost_time>' + xData[xData.length - 1];
  result = await query(sql);
  data.push(result[0]['count(*)']);

  console.log('[' + data.toString() + ']');
}

async function getPreAdData() {
  const SQL = 'SELECT count(*) FROM ad_analysis_ios WHERE ';
  let xData = ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000', '1100', '1200', '1300', '1400',
    '1500', '1600', '1700', '1800', '1900', '2000', '2100', '2200', '2300', '2400', '2500', '2600',
    '2700', '2800', '2900', '3000', '3100', '3200', '3300', '3400', '3500', '3600', '3700', '3800'];
  let data = [];
  let sql = SQL + 'pre_ad_cost_time>0 and pre_ad_cost_time<' + xData[0];
  let result = await query(sql);
  data.push(result[0]['count(*)']);
  for (let index = 0; index < xData.length - 1; index++) {
    const element1 = xData[index];
    const element2 = xData[index + 1];
    const sql = SQL + 'pre_ad_cost_time>' + element1 +
      ' and pre_ad_cost_time<' + element2;
    let result = await query(sql);
    data.push(result[0]['count(*)']);
  }
  sql = SQL + 'pre_ad_cost_time>' + xData[xData.length - 1];
  result = await query(sql);
  data.push(result[0]['count(*)']);

  console.log('[' + data.toString() + ']');
}
getPreAdData();

async function getImageSizeData() {
  const SQL = 'SELECT avg(image_download_cost_time) FROM ad_analysis WHERE ';
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

function combine() {
  const data1 = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400,
    1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600,
    2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, Infinity];
  const data2 = [514, 1584, 5553, 20767, 44487, 64137, 67358, 60027, 47284, 35432, 26842, 43028,
    47387, 27039, 23279, 19607, 17247, 14776, 13140, 10989, 9512, 8616, 9100, 8069, 7117, 6379,
    5390, 4781, 4238, 3572, 3177, 2751, 2575, 2626, 2396, 2118, 1836, 1669, 31833];
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