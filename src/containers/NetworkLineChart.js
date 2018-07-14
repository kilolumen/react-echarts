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

class NetworkLineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderer: 'canvas'
    };
  }
  async componentWillMount() {
    const path = '/network';
    const key = 'network';

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
        text: '网络差异分析'
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          console.log(params);
          const data = [[0, 0, 184, 254, 928, 2401, 4586, 5987, 6868, 7048, 6449, 5808, 5028, 4462, 4265,
            4800, 5848, 6479, 5949, 5209, 4441, 3564, 3175, 2764, 2408, 2264, 2126, 1917, 1850,
            1707, 1560, 1368, 1168, 1076, 988, 910, 852, 809, 727, 704, 13239],
            [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 16],
            [0, 0, 28, 15, 11, 12, 45, 100, 125, 78, 82, 98, 114, 140, 170, 181, 177, 204, 195, 191,
              172, 172, 129, 140, 136, 134, 110, 119, 122, 95, 100, 85, 87, 88, 89, 80, 77, 70, 61, 54, 1566],
            [0, 0, 1541, 2080, 1764, 7270, 21860, 29637, 30558, 36774, 43557, 46165, 43040, 37729,
              31912, 26052, 25986, 32648, 34029, 26225, 20688, 16516, 13682, 11820, 10364, 9220,
              7903, 7376, 7079, 6391, 5926, 5215, 4595, 3903, 3633, 3218, 2976, 2546, 2280, 2144, 38986]];
          let string = params[0]['name'];
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
              const element1 = seriesData[index];
              currentSum += element1;
            }

            string = string + '<br/>' + element['marker'] + element['seriesName'] + ' : ' +
            element['value'] + ' (' + (element['value'] / sum * 100).toFixed(2) +
            '%, ' + (currentSum / sum * 100).toFixed(2) + '%)';

          }
          return string;
        }
      },
      legend: {
        data: ['wifi', '2G', '3G', '4G']
      },
      xAxis: {
        type: 'value',
        name: 'ms',
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'wifi',
          data: [[-100, 0], [0, 0], [100, 184], [200, 254], [300, 928], [400, 2401], [500, 4586],
          [600, 5987], [700, 6868], [800, 7048], [900, 6449], [1000, 5808], [1100, 5028], [1200, 4462],
          [1300, 4265], [1400, 4800], [1500, 5848], [1600, 6479], [1700, 5949], [1800, 5209],
          [1900, 4441], [2000, 3564], [2100, 3175], [2200, 2764], [2300, 2408], [2400, 2264],
          [2500, 2126], [2600, 1917], [2700, 1850], [2800, 1707], [2900, 1560], [3000, 1368],
          [3100, 1168], [3200, 1076], [3300, 988], [3400, 910], [3500, 852], [3600, 809], [3700, 727], [3800, 704], [3900, 13239]],
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
              { name: '平均值', xAxis: 2223 },
              { name: '中位数', xAxis: 1518 },
              { name: '标准差', xAxis: 7608 },
            ],
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                return params['name'] + ':' + params['value'];
              }
            }
          }
        },
        {
          name: '2G',
          data: [[-100, 0], [0, 0], [100, 1], [200, 0], [300, 0], [400, 0], [500, 0], [600, 0], [700, 1],
          [800, 0], [900, 0], [1000, 0], [1100, 0], [1200, 0], [1300, 0], [1400, 0], [1500, 0], [1600, 0],
          [1700, 0], [1800, 0], [1900, 0], [2000, 0], [2100, 0], [2200, 0], [2300, 1], [2400, 0], [2500, 0],
          [2600, 0], [2700, 0], [2800, 0], [2900, 0], [3000, 0], [3100, 0], [3200, 0], [3300, 1], [3400, 0],
          [3500, 0], [3600, 0], [3700, 0], [3800, 0], [3900, 16]],
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
              { name: '平均值', xAxis: 33780 },
              { name: '中位数', xAxis: 18399 },
              { name: '标准差', xAxis: 44994 },
            ],
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                return params['name'] + ':' + params['value'];
              }
            }
          }
        },
        {
          name: '3G',
          data: [[-100, 0], [0, 0], [100, 28], [200, 15], [300, 11], [400, 12], [500, 45], [600, 100],
          [700, 125], [800, 78], [900, 82], [1000, 98], [1100, 114], [1200, 140], [1300, 170], [1400, 181],
          [1500, 177], [1600, 204], [1700, 195], [1800, 191], [1900, 172], [2000, 172], [2100, 129],
          [2200, 140], [2300, 136], [2400, 134], [2500, 110], [2600, 119], [2700, 122], [2800, 95],
          [2900, 100], [3000, 85], [3100, 87], [3200, 88], [3300, 89], [3400, 80], [3500, 77], [3600, 70], [3700, 61], [3800, 54], [3900, 1566]],
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
              { name: '平均值', xAxis: 3778 },
              { name: '中位数', xAxis: 2380 },
              { name: '标准差', xAxis: 4500 },
            ],
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                return params['name'] + ':' + params['value'];
              }
            }
          }
        },
        {
          name: '4G',
          data: [[-100, 0], [0, 0], [100, 1541], [200, 2080], [300, 1764], [400, 7270], [500, 21860],
          [600, 29637], [700, 30558], [800, 36774], [900, 43557], [1000, 46165], [1100, 43040],
          [1200, 37729], [1300, 31912], [1400, 26052], [1500, 25986], [1600, 32648], [1700, 34029],
          [1800, 26225], [1900, 20688], [2000, 16516], [2100, 13682], [2200, 11820], [2300, 10364],
          [2400, 9220], [2500, 7903], [2600, 7376], [2700, 7079], [2800, 6391], [2900, 5926], [3000, 5215],
          [3100, 4595], [3200, 3903], [3300, 3633], [3400, 3218], [3500, 2976], [3600, 2546], [3700, 2280], [3800, 2144], [3900, 38986]],
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
              { name: '平均值', xAxis: 1776 },
              { name: '中位数', xAxis: 1295 },
              { name: '标准差', xAxis: 2315 },
            ],
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                return params['name'] + ':' + params['value'];
              }
            }
          }
        }
      ]
    };
  };
}

export default connect(
  state => ({ charts: state.charts }),
  dispatch => ({
    getChart: bindActionCreators(getChart, dispatch)
  })
)(NetworkLineChart);
