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
        trigger: 'axis'
      },
      legend: {
        data: ['全链路', 'getAd', 'image']
      },
      xAxis: {
        type: 'category',
        name: 'ms',
        axisTick: {
          alignWithLabel: true
        },
        data: ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000', '1100', '1200', '1300', '1400',
          '1500', '1600', '1700', '1800', '1900', '2000', '2100', '2200', '2300', '2400', '2500', '2600',
          '2700', '2800', '2900', '3000', '3100', '3200', '3300', '3400', '3500', '3600', '3700', '3800', '∞']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
        name: '全链路',
          data: [0, 137, 592, 2127, 4728, 7809, 13487, 21652, 32350, 42274, 46617, 47627, 43618,
            37272, 34440, 40402, 44136, 33269, 26054, 21349, 18106, 15816, 14152, 12977, 11112, 10224,
            9694, 9053, 8160, 7335, 6405, 5610, 5321, 4879, 4303, 3883, 3495, 3267, 63245],
        type: 'line',
        smooth: true
        },
        {
          name: 'getAd',
          data: [10, 9908, 60629, 147016, 170396, 107686, 50617, 24837, 14235, 9048, 6303, 4822,
            4174, 4032, 3534, 3296, 2914, 2534, 1921, 1599, 1266, 1069, 950, 1111, 1200, 1393, 1306, 1130,
            883, 727, 639, 585, 668, 688, 540, 521, 478, 463, 19160],
          type: 'line',
          smooth: true
        },
        {
          name: 'image',
          data: [514, 1584, 5553, 20767, 44487, 64137, 67358, 60027, 47284, 35432, 26842, 43028,
            47387, 27039, 23279, 19607, 17247, 14776, 13140, 10989, 9512, 8616, 9100, 8069, 7117, 6379,
            5390, 4781, 4238, 3572, 3177, 2751, 2575, 2626, 2396, 2118, 1836, 1669, 31833],
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
