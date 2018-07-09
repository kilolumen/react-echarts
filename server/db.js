// mock.js 配置假数据

const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = function() {
   // 自定义扩展
  Random.extend({});

  // const telReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

  const heatmap = (function() {
    const getArr = (end, start = 0) => Array.apply(null, Array(end - start)).map((v, i) => i + start);
    const getValue = (x, y) => (x * x * y * y) % 20;

    const x = getArr(51);
    let data = [];

    x.map(xValue => {
        const currentData = getArr(71).map(y => {
          return [xValue, y, getValue(xValue, y)];
        });

        data = data.concat(currentData);
    });

    return data;
  }());

  const map = (function() {
    const initialProvinces = Mock.mock({
        'content|90': ['@province']
    }).content;
    const adapter = {
        黑龙: '黑龙江',
        内蒙: '内蒙古'
    };
    const data = [...new Set(initialProvinces)].map(p => {
        const subP = p.substr(0, 2);
        return {
          name: adapter[subP] || subP,
          value: Random.float(0, 1000, 2, 2)
        };
    });

    return data;
  }());

  const parallel = (function() {
    const provinces = Mock.mock({
        'content|90': ['@province']
    }).content;
    const adapter = {
        黑龙: '黑龙江',
        内蒙: '内蒙古'
    };
    const getAge = () => Random.natural(10, 80);
    const getGender = () => Math.random();
    const getTotal = (single, count) => single * count;
    const getSingle = () => Random.natural(100, 10000);
    const getCount = () => Random.natural(1, 5);
    const getPopulation = () => Random.natural(1000, 100000);
    const data = [...new Set(provinces)].map(p => {
        const subP = p.substr(0, 2);
        const province = adapter[subP] || subP;
        const single = getSingle();
        const count = getCount();

        return [province, getAge(), getGender(), single, count, getTotal(single, count), getPopulation()];
    });

    return data;
  }());

  const graph = (function() {
    const names = Mock.mock({
        'names|300': '@cfirst'
    }).names;
    const data = [...new Set(names)].map(name => {
        return {
          name,
          value: Random.natural(0, 300),
          x: Random.float(-500, 500),
          y: Random.float(-500, 500),
          category: Random.natural(0, 5)
        };
    });
    function getIdx(initial, range) {
        const idx = Random.natural(0, range);
        if (initial !== idx) {
          return idx;
        }

        return getIdx(initial, range);
    }
    const range = data.length - 1;
    const linkNums = Random.natural(0, range * 2);
    let links = [];

    for (let i = 0; i < linkNums; i++) {
        const sourceIdx = Random.natural(0, range);
        const targetIdx = getIdx(sourceIdx, range);
        const link = {
          source: sourceIdx,
          target: targetIdx,
          value: Random.natural(0, 200)
        };
        links.push(link);
    }

    return { data, links };
  }());

  const line = (function () {
    const data = [0, 137, 592, 2127, 4728, 7809, 13487, 21652, 32350, 42274, 46617, 47627, 43618,
      37272, 34440, 40402, 44136, 33269, 26054, 21349, 18106, 15816, 14152, 12977, 11112, 10224,
      9694, 9053, 8160, 7335, 6405, 5610, 5321, 4879, 4303, 3883, 3495, 3267, 63245];
    // const data2 = [10, 9908, 60629, 147016, 170396, 107686, 50617, 24837, 14235, 9048, 6303, 4822,
    //   4174, 4032, 3534, 3296, 2914, 2534, 1921, 1599, 1266, 1069, 950, 1111, 1200, 1393, 1306, 1130,
    //   883, 727, 639, 585, 668, 688, 540, 521, 478, 463, 19160];
    // const data3 = [514, 1584, 5553, 20767, 44487, 64137, 67358, 60027, 47284, 35432, 26842, 43028,
    //   47387, 27039, 23279, 19607, 17247, 14776, 13140, 10989, 9512, 8616, 9100, 8069, 7117, 6379,
    //   5390, 4781, 4238, 3572, 3177, 2751, 2575, 2626, 2396, 2118, 1836, 1669, 31833];
    return data;
  }());

  const slice = (function () {
    const data = [26131, 5435, 16282, 22911, 21152, 17658, 20728, 26511, 35162, 44168, 48043, 48866,
      44700, 38316, 35427, 41392, 44997, 33959, 26616, 21788, 18442, 16084, 14378, 13268, 11400,
      10563, 9992, 9321, 8355, 7487, 6575, 5750, 5463, 5039, 4429, 4018, 3607, 3373, 67247];
    return data;
  }());

  return {
    heatmap,
    map,
    parallel,
    graph,
    line,
    slice
  };
};
