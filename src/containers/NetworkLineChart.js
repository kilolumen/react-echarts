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
          const data = [[0, 0, 4, 217, 979, 2157, 3910, 5137, 5657, 5821, 5421, 4787, 4150, 3969, 5166, 6273,
            5874, 5157, 4656, 3894, 3340, 2784, 2450, 2239, 1988, 1907, 1853, 1683, 1619, 1442, 1238,
            1119, 1070, 880, 857, 859, 751, 690, 14073],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13],
            [0, 0, 0, 0, 0, 1, 5, 3, 18, 52, 107, 136, 164, 181, 155, 170, 209, 198, 149, 127,
              123, 125, 128, 103, 117, 100, 95, 83, 87, 87, 81, 64, 78, 59, 63, 43, 66, 52, 1387],
            [0, 0, 0, 30, 176, 1062, 5258, 13072, 23551, 33507, 38559, 40343, 36977, 31244, 27155,
              31812, 35882, 26206, 19770, 15978, 13466, 11836, 10384, 9261, 7977, 7337, 6978, 6574, 5848,
              5313, 4646, 4067, 3749, 3273, 2789, 2542, 2258, 2105, 39796]];
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
        type: 'category',
        name: 'ms',
        axisTick: {
          alignWithLabel: true
        },
        data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400,
          1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600,
          2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, '∞']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'wifi',
          data: [0, 0, 4, 217, 979, 2157, 3910, 5137, 5657, 5821, 5421, 4787, 4150, 3969, 5166, 6273,
            5874, 5157, 4656, 3894, 3340, 2784, 2450, 2239, 1988, 1907, 1853, 1683, 1619, 1442, 1238,
            1119, 1070, 880, 857, 859, 751, 690, 14073],
          type: 'line',
          smooth: true
        },
        {
          name: '2G',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13],
          type: 'line',
          smooth: true
        },
        {
          name: '3G',
          data: [0, 0, 0, 0, 0, 1, 5, 3, 18, 52, 107, 136, 164, 181, 155, 170, 209, 198, 149, 127,
            123, 125, 128, 103, 117, 100, 95, 83, 87, 87, 81, 64, 78, 59, 63, 43, 66, 52, 1387],
          type: 'line',
          smooth: true
        },
        {
          name: '4G',
          data: [0, 0, 0, 30, 176, 1062, 5258, 13072, 23551, 33507, 38559, 40343, 36977, 31244, 27155,
            31812, 35882, 26206, 19770, 15978, 13466, 11836, 10384, 9261, 7977, 7337, 6978, 6574, 5848,
            5313, 4646, 4067, 3749, 3273, 2789, 2542, 2258, 2105, 39796],
          type: 'line',
          smooth: true
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
