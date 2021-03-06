/*
   Line
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/line';
import Chart from '../components/Chart/index';
import { getChart } from '../modules/charts/actions';

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderer: 'canvas'
    };
  }
  async componentWillMount() {
    const path = '/line';
    const key = 'line';

    await this.props.getChart({ path, key });
  }
  render() {
    const renderer = this.state.renderer;
    const option = this.getOption();

    return <Chart renderer={renderer} option={option} />;
  }
  getOption = () => {
    // const {data1, data2, data3} = this.props.charts.line;
    return {
      title: {
        text: '总时长分布图'
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          console.log(params);
          const data = [
            [0, 6, 1822, 2404, 2730, 9836, 26631, 35823, 37633, 44052, 50174, 52117, 48214,
            42366, 36405, 31118, 32176, 39533, 40237, 31652, 25389, 20290, 17069, 14811, 13019, 11715,
            10220, 9513, 9127, 8281, 7675, 6720, 5954, 5159, 4780, 4285, 3964, 3517, 3136, 2966, 56892], // 191736
            // [0, 37388, 7763, 10706, 27233, 41921, 51129, 51267, 48386, 50704, 54145, 54785, 50141, 43795,
            //   37517, 32104, 33007, 40313, 40941, 32260, 25889, 20732, 17442, 15163, 13346, 12082, 10569,
            //   9806, 9393, 8536, 7898, 6924, 6141, 5353, 4975, 4460, 4122, 3667, 3238, 3086, 62820],
            [0, 6, 1822, 2404, 2730, 9836, 26631, 35823, 37633, 44052, 50174, 52117, 48214,
              42366, 36405, 31118, 32176, 39533, 40237, 31652, 25389, 20290, 17069, 14811, 13019, 11715,
              10220, 9513, 9127, 8281, 7675, 6720, 5954, 5159, 4780, 4285, 3964, 3517, 3136, 2966, 56892],
            [0, 57501, 299, 14996, 91966, 169822, 189542, 117944, 59897, 27768, 14379, 8752, 5539, 4059,
              3468, 3068, 2549, 2071, 1740, 1491, 1293, 1097, 1036, 932, 901, 1128, 1350, 1199, 971,
              758, 661, 555, 523, 554, 569, 587, 457, 413, 450, 407, 16719],
            [0, 180, 43324, 45310, 29250, 47529, 63812, 64791, 55992, 45446, 35790, 28292, 25378, 41072,
              47200, 28591, 23957, 19921, 16369, 13854, 11641, 10127, 8594, 8361, 8399, 7809, 7099, 6162,
              5166, 4699, 3898, 3602, 2903, 2556, 2528, 2506, 2196, 1990, 1886, 1664, 29567],
            [192290, 47216, 51130, 55106, 54060, 46918, 39153, 31161, 25242, 22450, 23666, 27403, 28903,
              22068, 14520, 10342, 8074, 6952, 6241, 5640, 5232, 5211, 5125, 4817, 4532, 4005, 3371,
              2722, 2435, 2306, 2027, 1832, 1680, 1598, 1571, 1598, 1499, 1270, 1235, 1176, 35634]];
          let string = params[0]['value'][0];
          for (let index = 0; index < params.length; index++) {
            const element = params[index];
            const seriesData = data[element['seriesIndex']]
            let sum = 0;
            seriesData.forEach(element => {
              sum += element;
            });
            const currentIndex = element['dataIndex'];
            let currentSum = 0;
            for (let index = 0; index <= currentIndex; index++) {
              const element = seriesData[index];
              currentSum += element;
            }

            string = string + '<br/>' + element['marker'] + element['seriesName'] + ' : ' + element['value'][1] + ' (' + (element['value'][1] / sum * 100).toFixed(2) +
              '%, ' + (currentSum / sum * 100).toFixed(2) + '%)';
            
          }
          return string;
        }
      },
      legend: {
        data: ['全链路 bar', '全链路', 'getAd', 'image', '-pre ad']
      },
      xAxis: {
        type: 'value',
        name: 'ms',
        axisTick: {
          alignWithLabel: true
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '全链路 bar',
          data: [[-100, 0], [0, 6], [100, 1822], [200, 2404], [300, 2730], [400, 9836], [500, 26631],
          [600, 35823], [700, 37633], [800, 44052], [900, 50174], [1000, 52117], [1100, 48214], [1200, 42366],
          [1300, 36405], [1400, 31118], [1500, 32176], [1600, 39533], [1700, 40237], [1800, 31652],
          [1900, 25389], [2000, 20290], [2100, 17069], [2200, 14811], [2300, 13019], [2400, 11715],
          [2500, 10220], [2600, 9513], [2700, 9127], [2800, 8281], [2900, 7675], [3000, 6720], [3100, 5954],
          [3200, 5159], [3300, 4780], [3400, 4285], [3500, 3964], [3600, 3517], [3700, 3136], [3800, 2966], [3900, 56892]],
          type: 'bar',
        },
        {
          name: '全链路',
          // data: [[-100, 0], [0, 37388], [100, 7763], [200, 10706], [300, 27233], [400, 41921], [500, 51129],
          // [600, 51267], [700, 48386], [800, 50704], [900, 54145], [1000, 54785], [1100, 50141], [1200, 43795],
          // [1300, 37517], [1400, 32104], [1500, 33007], [1600, 40313], [1700, 40941], [1800, 32260],
          // [1900, 25889], [2000, 20732], [2100, 17442], [2200, 15163], [2300, 13346], [2400, 12082],
          // [2500, 10569], [2600, 9806], [2700, 9393], [2800, 8536], [2900, 7898], [3000, 6924], [3100, 6141],
          // [3200, 5353], [3300, 4975], [3400, 4460], [3500, 4122], [3600, 3667], [3700, 3238], [3800, 3086], [3900, 62820]],
          data: [[-100, 0], [0, 6], [100, 1822], [200, 2404], [300, 2730], [400, 9836], [500, 26631],
            [600, 35823], [700, 37633], [800, 44052], [900, 50174], [1000, 52117], [1100, 48214], [1200, 42366],
            [1300, 36405], [1400, 31118], [1500, 32176], [1600, 39533], [1700, 40237], [1800, 31652],
            [1900, 25389], [2000, 20290], [2100, 17069], [2200, 14811], [2300, 13019], [2400, 11715],
            [2500, 10220], [2600, 9513], [2700, 9127], [2800, 8281], [2900, 7675], [3000, 6720], [3100, 5954],
            [3200, 5159], [3300, 4780], [3400, 4285], [3500, 3964], [3600, 3517], [3700, 3136], [3800, 2966], [3900, 56892]],
          type: 'line',
          smooth: true,
          markLine: {
            lineStyle: {
              color: '#2CA2FC'
            },
            label: {
              show: true,
              formatter: '{b}\n{c}'
            },
            data: [
              // { name: '平均值', xAxis: 1699, lineStyle: { color: '#FF9726', type: 'solid' } },
              // { name: '中位数', xAxis: 1133, lineStyle: { color: '#FF9726', type: 'solid' } },
              // { name: '10%', xAxis: 346 },
              // { name: '20%', xAxis: 546 },
              // { name: '30%', xAxis: 750 },
              // { name: '40%', xAxis: 936 },
              // { name: '50%', xAxis: 1133 },
              // { name: '60%', xAxis: 1406 },
              // { name: '70%', xAxis: 1667 },
              // { name: '80%', xAxis: 2049 },
              // { name: '90%', xAxis: 2966 },
              { name: '平均值', xAxis: 1926, lineStyle: { color: '#FF9726', type: 'solid' } },
              { name: '中位数', xAxis: 1346, lineStyle: { color: '#FF9726', type: 'solid' } },
              { name: '10%', xAxis: 605 },
              { name: '20%', xAxis: 803 },
              { name: '30%', xAxis: 961 },
              { name: '40%', xAxis: 1128 },
              { name: '50%', xAxis: 1346 },
              { name: '60%', xAxis: 1583 },
              { name: '70%', xAxis: 1806 },
              { name: '80%', xAxis: 2238 },
              { name: '90%', xAxis: 3173 },
            ],
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                return params['name'] + ':' + params['value'];
              }
            },
          }
        },
        {
          name: 'getAd',
          data: [[-100, 0], [0, 57501], [100, 299], [200, 14996], [300, 91966], [400, 169822], [500, 189542],
          [600, 117944], [700, 59897], [800, 27768], [900, 14379], [1000, 8752], [1100, 5539], [1200, 4059],
          [1300, 3468], [1400, 3068], [1500, 2549], [1600, 2071], [1700, 1740], [1800, 1491], [1900, 1293],
          [2000, 1097], [2100, 1036], [2200, 932], [2300, 901], [2400, 1128], [2500, 1350], [2600, 1199],
          [2700, 971], [2800, 758], [2900, 661], [3000, 555], [3100, 523], [3200, 554], [3300, 569],
          [3400, 587], [3500, 457], [3600, 413], [3700, 450], [3800, 407], [3900, 16719]],
          type: 'line',
          smooth: true,
          markLine: {
            lineStyle: {
              color: '#FF9726',
              type: 'solid'
            },
            label: {
              show: true,
              formatter: '{b}\n{c}'
            },
            data: [
              { name: '平均值', xAxis: 670 },
              { name: '中位数', xAxis: 435 }
            ],
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                return params['name'] + ':' + params['value'];
              }
            },
          }
        },
        {
          name: 'image',
          data: [[-100, 0], [0, 180], [100, 43324], [200, 45310], [300, 29250], [400, 47529], [500, 63812],
          [600, 64791], [700, 55992], [800, 45446], [900, 35790], [1000, 28292], [1100, 25378],
          [1200, 41072], [1300, 47200], [1400, 28591], [1500, 23957], [1600, 19921], [1700, 16369],
          [1800, 13854], [1900, 11641], [2000, 10127], [2100, 8594], [2200, 8361], [2300, 8399],
          [2400, 7809], [2500, 7099], [2600, 6162], [2700, 5166], [2800, 4699], [2900, 3898], [3000, 3602],
          [3100, 2903], [3200, 2556], [3300, 2528], [3400, 2506], [3500, 2196], [3600, 1990], [3700, 1886],
          [3800, 1664], [3900, 29567]],
          type: 'line',
          smooth: true,
          markLine: {
            lineStyle: {
              color: '#FF9726',
              type: 'solid'
            },
            label: {
              show: true,
              formatter: '{b}\n{c}'
            },
            data: [
              { name: '平均值', xAxis: 1257 },
              { name: '中位数', xAxis: 824 },
            ],
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                return params['name'] + ':' + params['value'];
              }
            },
          }
        },
        {
          name: '-pre ad',
          data: [[-100, 192290], [0, 47216], [100, 51130], [200, 55106], [300, 54060], [400, 46918],
          [500, 39153], [600, 31161], [700, 25242], [800, 22450], [900, 23666], [1000, 27403], [1100, 28903],
          [1200, 22068], [1300, 14520], [1400, 10342], [1500, 8074], [1600, 6952], [1700, 6241], [1800, 5640],
          [1900, 5232], [2000, 5211], [2100, 5125], [2200, 4817], [2300, 4532], [2400, 4005], [2500, 3371],
          [2600, 2722], [2700, 2435], [2800, 2306], [2900, 2027], [3000, 1832], [3100, 1680], [3200, 1598],
          [3300, 1571], [3400, 1598], [3500, 1499], [3600, 1270], [3700, 1235], [3800, 1176], [3900, 35634]],
          type: 'line',
          smooth: true,
          markLine: {
            lineStyle: {
              color: '#2CA2FC'
            },
            label: {
              show: true,
              formatter: '{b}\n{c}'
            },
            data: [
              { name: '平均数', xAxis: 722, lineStyle: { color: '#FF9726', type: 'solid' } },
              { name: '中位数', xAxis: 310, lineStyle: { color: '#FF9726', type: 'solid' } },
              { name: '10%', xAxis: -512 },
              { name: '20%', xAxis: -172 },
              { name: '30%', xAxis: 7 },
              { name: '40%', xAxis: 161 },
              { name: '50%', xAxis: 310 },
              { name: '60%', xAxis: 500 },
              { name: '70%', xAxis: 809 },
              { name: '80%', xAxis: 1111 },
              { name: '90%', xAxis: 1991 },
            ],
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                return params['name'] + ':' + params['value'];
              }
            },
          }
        },
      ]
    };
  };
}

export default connect(
  state => ({ charts: state.charts }),
  dispatch => ({
    getChart: bindActionCreators(getChart, dispatch)
  })
)(LineChart);
