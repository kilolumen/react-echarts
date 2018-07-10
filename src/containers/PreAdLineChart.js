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

class PreAdLineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderer: 'canvas'
    };
  }
  async componentWillMount() {
    const path = '/pre_ad';
    const key = 'pre_ad';

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
        text: 'pre ad cost time'
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          console.log(params);
          const data = [[0, 0, 10, 714, 30696, 128256, 135411, 114878, 84937, 61148, 41420, 26057, 18145,
            14774, 13298, 12851, 12729, 12949, 14248, 15452, 16535, 16941, 16306, 15172, 13240,
            11547, 9851, 8609, 7108, 6040, 5198, 4267, 3701, 3151, 2611, 2244, 1975, 1553, 15065],
            [3853, 52664, 70308, 106330, 167777, 138528, 97556, 69682, 55115, 42591, 31177,
              23233, 17960, 14163, 11198, 8962, 8008, 7438, 5517, 4632, 3858, 3197, 2807, 2478, 2224,
              2023, 1688, 1497, 1372, 1253, 1121, 1001, 938, 849, 776, 876, 725, 628, 27368]];
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
        data: ['iOS', 'Android']
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
          name: 'iOS',
          data: [[100, 0], [200, 0], [300, 10], [400, 714], [500, 30696], [600, 128256], [700, 135411],
          [800, 114878], [900, 84937], [1000, 61148], [1100, 41420], [1200, 26057], [1300, 18145],
          [1400, 14774], [1500, 13298], [1600, 12851], [1700, 12729], [1800, 12949], [1900, 14248],
          [2000, 15452], [2100, 16535], [2200, 16941], [2300, 16306], [2400, 15172], [2500, 13240],
          [2600, 11547], [2700, 9851], [2800, 8609], [2900, 7108], [3000, 6040], [3100, 5198],
          [3200, 4267], [3300, 3701], [3400, 3151], [3500, 2611], [3600, 2244], [3700, 1975],
          [3800, 1553],[3900, 15065]],
          type: 'line',
          smooth: true,
          markLine: {
            name: '平均值',
            data: [
              { name: '平均值', xAxis: 3127.86 },
              { name: '中位数', xAxis: 528 }
            ],
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                return params['name'] + ':' + params['value'];
              }
            },
          }
        }, {
          name: 'Android',
          data: [[100, 3853], [200, 52664], [300, 70308], [400, 106330], [500, 167777], [600, 138528],
          [700, 97556], [800, 69682], [900, 55115], [1000, 42591], [1100, 31177], [1200, 23233],
          [1300, 17960], [1400, 14163], [1500, 11198], [1600, 8962], [1700, 8008], [1800, 7438],
          [1900, 5517], [2000, 4632], [2100, 3858], [2200, 3197], [2300, 2807], [2400, 2478],
          [2500, 2224], [2600, 2023], [2700, 1688], [2800, 1497], [2900, 1372], [3000, 1253],
          [3100, 1121], [3200, 1001], [3300, 938], [3400, 849], [3500, 776], [3600, 876], [3700, 725],
          [3800, 628], [3900, 27368]],
          type: 'line',
          smooth: true,
          markLine: {
            name: '平均值',
            data: [
              { name: '平均值', xAxis: 2034.53 },
              { name: '中位数', xAxis: 564 }
            ],
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                return params['name'] + ':' + params['value'];
              }
            },
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
)(PreAdLineChart);
