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

class SlowFullSliceChart extends Component {
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
        text: '全链路慢请求切片分析'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['dns', 'tcp', 'ssl', 'request', 'first pack', 'response', 'image']
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
        data: ['0-500', '500-1000', '1000-1500', '1500-2000', '2000-2500', '2500-3000', '3000-3500', '3500-∞']
      },
      series: [
        {
          name: 'dns',
          type: 'bar',
          stack: '总量',
          barWidth: 30,
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [15.326, 32.0763, 44.9249, 54.0464, 76.5737, 119.1256, 167.376, 1022.2622]
        },
        {
          name: 'tcp',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [14.8374, 39.4272, 58.0076, 61.5308, 71.703, 77.2898, 88.8032, 236.4429]
        },
        {
          name: 'ssl',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [49.8956, 112.0175, 165.6663, 177.5538, 213.4048, 228.173, 262.454, 925.768]
        },
        {
          name: 'request',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [0.0327, 0.0692, 0.2816, 0.3017, 0.4527, 0.5054, 0.6003, 5.5383]
        },
        {
          name: 'first pack',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [102.5696, 147.2389, 184.3697, 212.3946, 256.7117, 279.3347, 349.9812, 854.2923]
        },
        {
          name: 'response',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [1.3089, 3.329, 4.8868, 5.6617, 7.4137, 10.237, 15.3508, 107.4386]
        },
        {
          name: 'image',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [252.902, 505.2671, 765.0947, 1191.3435, 1580.0793, 2000.5325, 2321.0715, 4752.4146]
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
)(SlowFullSliceChart);
