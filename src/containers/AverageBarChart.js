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
        data: ['time']
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
          name: 'time',
          type: 'bar',
          stack: '总量',
          barWidth: 20,
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [696.1066, 907.6599, 1030.9506, 1142.8509, 1262.8485, 1392.7077, 1523.7677, 1682.2972,
            1908.4893, 2314.0252, 3343.963, 3536.1066, 3766.423, 4048.0652, 4400.8543, 4858.0052,
            5482.2576, 6410.8695, 8028.9163, 11832.6885]
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
