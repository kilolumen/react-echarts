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

async function getLineData() {
  let xData = ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000', '1100', '1200', '1300', '1400',
  '1500', '1600', '1700', '1800', '1900', '2000', '2100', '2200', '2300', '2400', '2500', '2600',
  '2700', '2800', '2900', '3000', '3100', '3200', '3300', '3400', '3500', '3600', '3700', '3800'];
  let data = [];
  let sql = 'SELECT count(*) FROM ad_analysis WHERE image_download_cost_time+cost_time<' + xData[0];
  let result = await query(sql);
  data.push(result[0]['count(*)']);
  for (let index = 0; index < xData.length - 1; index++) {
    const element1 = xData[index];
    const element2 = xData[index + 1];
    const sql = 'SELECT count(*) FROM ad_analysis WHERE image_download_cost_time+cost_time>' + element1 +
    ' and image_download_cost_time+cost_time<' + element2;
    let result = await query(sql);
    data.push(result[0]['count(*)']);
  }
  sql = 'SELECT count(*) FROM ad_analysis WHERE image_download_cost_time+cost_time>' + xData[xData.length - 1];
  result = await query(sql);
  data.push(result[0]['count(*)']);
  
  console.log(data.toString());
  return {xData, data};
}
getLineData()


// [26131,21836,44312,38578,61998,92716,94051,74142,86860,60900,40464,30629,24773,20649,17762,14136,
// 11262,9524,7667,6407,5344,4353,4076,3445,3158,2673,2209,1980,1813,1558,1470,1276,1184,1163,1184,1208,1126,24845]

// async function getLineData() {
//   let xData = ['100', '300', '500', '700', '900', '1100', '1300', '1500', '1700', '1900', '2100', '2300', '2500',
//     '2700', '2900', '3100', '3300', '3500', '3700', '3900', '4100', '4300', '4500', '4700', '4900',
//     '5100', '5300', '5500', '5700', '5900', '6100', '6300', '6500', '6700', '6900', '7100', '7300'];
//   let data = [];
//   let sql = 'SELECT count(*) FROM ad_analysis WHERE image_download_cost_time+cost_time<' + xData[0];
//   let result = await query(sql);
//   data.push(result[0]['count(*)']);
//   for (let index = 0; index < xData.length - 1; index++) {
//     const element1 = xData[index];
//     const element2 = xData[index + 1];
//     const sql = 'SELECT count(*) FROM ad_analysis WHERE image_download_cost_time+cost_time>' + element1 + ' and image_download_cost_time+cost_time<' + element2;
//     let result = await query(sql);
//     data.push(result[0]['count(*)']);
//   }
//   sql = 'SELECT count(*) FROM ad_analysis WHERE image_download_cost_time+cost_time>' + xData[xData.length - 1];
//   result = await query(sql);
//   data.push(result[0]['count(*)']);

//   console.log(data.toString());
//   return { xData, data };
// }
// getLineData()