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
          name: 'iOS',
          data: [0, 0, 10, 714, 30696, 128256, 135411, 114878, 84937, 61148, 41420, 26057, 18145,
            14774, 13298, 12851, 12729, 12949, 14248, 15452, 16535, 16941, 16306, 15172, 13240,
            11547, 9851, 8609, 7108, 6040, 5198, 4267, 3701, 3151, 2611, 2244, 1975, 1553, 15065],
          type: 'line',
          smooth: true
        }, {
          name: 'Android',
          type: 'line',
          smooth: true,
          data: [3853, 52664, 70308, 106330, 167777, 138528, 97556, 69682, 55115, 42591, 31177,
            23233, 17960, 14163, 11198, 8962, 8008, 7438, 5517, 4632, 3858, 3197, 2807, 2478, 2224,
            2023, 1688, 1497, 1372, 1253, 1121, 1001, 938, 849, 776, 876, 725, 628, 27368],
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
