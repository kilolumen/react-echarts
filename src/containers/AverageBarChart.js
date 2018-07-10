/*
   slow slice 慢请求分析
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

class AverageBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderer: 'canvas'
    };
  }
  async componentWillMount() {
    const path = '/slow_full_slice';
    const key = 'slow_full_slice';

    await this.props.getChart({ path, key });
  }
  render() {
    const renderer = this.state.renderer;
    const option = this.getOption();

    return <Chart renderer={renderer} option={option} />;
  }
  getOption = () => {
    // const { data, links } = this.props.charts.graph;
    return {
      title: {
        text: '分段均值'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['平均数', '中位数']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        name: 'ms'
      },
      yAxis: {
        type: 'category',
        data: ['5%', '10%', '15%', '20%', '25%', '30%', '35%', '40%',
          '45%', '50%', '55%', '60%', '65%', '70%', '75%', '80%', '85%', '90%', '95%', '100%']
      },
      series: [
        {
          name: '平均数',
          type: 'bar',
          barWidth: 10,
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [696.1066, 861.1032, 954.2166, 1032.4863, 1106.1512, 1178.391, 1254.3773, 1339.436,
            1435.8836, 1533.5046, 1614.6536, 1693.6151, 1794.9113, 1931.3087, 2115.0723, 2361.0477,
            2696.3937, 3174.727, 4225.0292, 11612.4852]
          },
        {
          name: '中位数',
          type: 'bar',
          barWidth: 10,
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [696.1066, 861.1032, 954.2166, 1032.4863, 1106.1512, 1178.391, 1254.3773, 1339.436,
            1435.8836, 1533.5046, 1614.6536, 1693.6151, 1794.9113, 1931.3087, 2115.0723, 2361.0477,
            2696.3937, 3174.727, 4225.0292, 11612.4852]
        }
      ]
    }
  };
}

export default connect(
  state => ({ charts: state.charts }),
  dispatch => ({
    getChart: bindActionCreators(getChart, dispatch)
  })
)(AverageBarChart);
