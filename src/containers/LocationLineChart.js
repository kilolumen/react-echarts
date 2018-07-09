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

class LocationLineChart extends Component {
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
        text: '地理位置分析'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Shanghai', 'Beijing', 'Hangzhou', 'Xian', 'Chengdu', 'Wuhan']
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
        type: 'value',
      },
      series: [
        {
        name: 'Shanghai',
          data: [0, 0, 0, 4, 21, 196, 579, 1291, 2616, 3917, 4516, 4479, 3849, 3201, 2638, 3200,
            3934, 3045, 2391, 1881, 1522, 1300, 1103, 1016, 918, 781, 739, 714, 635, 573, 513, 427,
            392, 340, 325, 302, 244, 280, 4718],
        type: 'line',
        smooth: true
        },
        {
          name: 'Beijing',
          data: [0, 0, 4, 191, 767, 1791, 5424, 9886, 13318, 13449, 11657, 9101, 6725, 5318, 6133,
            9977, 8214, 5860, 4668, 3785, 3150, 2776, 2291, 1873, 1763, 1795, 1707, 1635, 1454, 1384,
            1139, 911, 842, 757, 610, 584, 557, 535, 11115],
          type: 'line',
          smooth: true
        },
        {
          name: 'Hangzhou',
          data: [0, 0, 0, 1, 3, 14, 103, 206, 474, 792, 913, 1030, 873, 704, 636, 704, 823, 668, 531,
            399, 346, 305, 266, 247, 193, 177, 158, 155, 162, 138, 110, 98, 100, 81, 82, 65, 59, 51, 1039],
          type: 'line',
          smooth: true
        },
        {
          name: 'Xian',
          data: [0, 0, 0, 2, 13, 61, 148, 293, 582, 737, 910, 832, 709, 551, 492, 620, 661, 547, 431,
            394, 310, 259, 227, 194, 163, 156, 151, 151, 125, 111, 108, 101, 91, 79, 62, 68, 64, 58, 1130],
          type: 'line',
          smooth: true
        },
        {
          name: 'Chengdu',
          data: [0, 0, 0, 0, 5, 31, 68, 156, 579, 1574, 2657, 3486, 4021, 3804, 3338, 3063, 3830,
            3005, 2484, 2050, 1832, 1622, 1498, 1341, 1139, 1026, 981, 904, 762, 749, 653, 575, 588,
            437, 432, 388, 328, 329, 6756],
          type: 'line',
          smooth: true
        },
        {
          name: 'Wuhan',
          data: [0, 0, 0, 1, 7, 61, 137, 396, 793, 1232, 1386, 1424, 1269, 972, 903, 1063, 1133, 904,
            744, 573, 519, 455, 398, 355, 287, 265, 254, 243, 228, 182, 179, 160, 139, 127, 106, 110, 104, 86, 1762],
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
)(LocationLineChart);
