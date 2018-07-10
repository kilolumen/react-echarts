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
          const data = [[0, 137, 592, 2127, 4728, 7809, 13487, 21652, 32350, 42274, 46617, 47627,
            43618, 37272, 34440, 40402, 44136, 33269, 26054, 21349, 18106, 15816, 14152, 12977,
            11112, 10224, 9694, 9053, 8160, 7335, 6405, 5610, 5321, 4879, 4303, 3883, 3495, 3267, 63245],
          [0, 137, 592, 2127, 4728, 7809, 13487, 21652, 32350, 42274, 46617, 47627, 43618, 37272, 34440,
            40402, 44136, 33269, 26054, 21349, 18106, 15816, 14152, 12977, 11112, 10224, 9694, 9053,
            8160, 7335, 6405, 5610, 5321, 4879, 4303, 3883, 3495, 3267, 63245],
          [10, 9908, 60629, 147016, 170396, 107686, 50617, 24837, 14235, 9048, 6303, 4822, 4174,
            4032, 3534, 3296, 2914, 2534, 1921, 1599, 1266, 1069, 950, 1111, 1200, 1393, 1306, 1130,
            883, 727, 639, 585, 668, 688, 540, 521, 478, 463, 19160],
          [514, 1584, 5553, 20767, 44487, 64137, 67358, 60027, 47284, 35432, 26842, 43028, 47387,
            27039, 23279, 19607, 17247, 14776, 13140, 10989, 9512, 8616, 9100, 8069, 7117, 6379,
            5390, 4781, 4238, 3572, 3177, 2751, 2575, 2626, 2396, 2118, 1836, 1669, 31833]];
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
        data: ['全链路 bar', '全链路', 'getAd', 'image']
      },
      xAxis: {
        type: 'value',
        name: 'ms',
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '全链路 bar',
          data: [[100, 0], [200, 137], [300, 592], [400, 2127], [500, 4728], [600, 7809], [700, 13487],
          [800, 21652], [900, 32350], [1000, 42274], [1100, 46617], [1200, 47627], [1300, 43618],
          [1400, 37272], [1500, 34440], [1600, 40402], [1700, 44136], [1800, 33269], [1900, 26054],
          [2000, 21349], [2100, 18106], [2200, 15816], [2300, 14152], [2400, 12977], [2500, 11112],
          [2600, 10224], [2700, 9694], [2800, 9053], [2900, 8160], [3000, 7335], [3100, 6405], [3200, 5610],
          [3300, 5321], [3400, 4879], [3500, 4303], [3600, 3883], [3700, 3495], [3800, 3267], [3900, 63245]],
          type: 'bar',
        },
        {
          name: '全链路',
          data: [[100, 0], [200, 137], [300, 592], [400, 2127], [500, 4728], [600, 7809], [700, 13487],
          [800, 21652], [900, 32350], [1000, 42274], [1100, 46617], [1200, 47627], [1300, 43618],
          [1400, 37272], [1500, 34440], [1600, 40402], [1700, 44136], [1800, 33269], [1900, 26054],
          [2000, 21349], [2100, 18106], [2200, 15816], [2300, 14152], [2400, 12977], [2500, 11112],
          [2600, 10224], [2700, 9694], [2800, 9053], [2900, 8160], [3000, 7335], [3100, 6405], [3200, 5610],
          [3300, 5321], [3400, 4879], [3500, 4303], [3600, 3883], [3700, 3495], [3800, 3267], [3900, 63245]],
          type: 'line',
          smooth: true,
          markLine: {
            data: [
              { name: '平均值', xAxis: 2242 },
              { name: '中位数', xAxis: 1648 },
              { name: '20%', xAxis: 1070 },
              { name: '40%', xAxis: 1386 },
              { name: '60%', xAxis: 1739 },
              { name: '80%', xAxis: 2515 },
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
          data: [[100, 10], [200, 9908], [300, 60629], [400, 147016], [500, 170396], [600, 107686],
          [700, 50617], [800, 24837], [900, 14235], [1000, 9048], [1100, 6303], [1200, 4822],
          [1300, 4174], [1400, 4032], [1500, 3534], [1600, 3296], [1700, 2914], [1800, 2534],
          [1900, 1921], [2000, 1599], [2100, 1266], [2200, 1069], [2300, 950], [2400, 1111],
          [2500, 1200], [2600, 1393], [2700, 1306], [2800, 1130], [2900, 883], [3000, 727],
          [3100, 639], [3200, 585], [3300, 668], [3400, 688], [3500, 540], [3600, 521], [3700, 478],
          [3800, 463], [3900, 19160]],
          type: 'line',
          smooth: true
        },
        {
          name: 'image',
          data: [[100, 514], [200, 1584], [300, 5553], [400, 20767], [500, 44487], [600, 64137],
          [700, 67358], [800, 60027], [900, 47284], [1000, 35432], [1100, 26842], [1200, 43028],
          [1300, 47387], [1400, 27039], [1500, 23279], [1600, 19607], [1700, 17247], [1800, 14776],
          [1900, 13140], [2000, 10989], [2100, 9512], [2200, 8616], [2300, 9100], [2400, 8069],
          [2500, 7117], [2600, 6379], [2700, 5390], [2800, 4781], [2900, 4238], [3000, 3572],
          [3100, 3177], [3200, 2751], [3300, 2575], [3400, 2626], [3500, 2396], [3600, 2118],
          [3700, 1836], [3800, 1669], [3900, 31833]],
          type: 'line',
          smooth: true
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
