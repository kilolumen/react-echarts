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
        trigger: 'axis'
      },
      legend: {
        data: ['pre ad']
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
          data: [1, 1, 6, 312, 24257, 100390, 103420, 87734, 65706, 47666, 31379, 18511, 12348,
            9690, 8568, 8126, 8068, 8558, 9075, 10171, 11104, 11432, 11281, 10338, 9168, 7927,
            6732, 5711, 4961, 4136, 3381, 2919, 2383, 2067, 1805, 1472, 1223, 1067, 10584],
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
)(PreAdLineChart);
