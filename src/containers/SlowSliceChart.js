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

class SlowSliceChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderer: 'canvas'
    };
  }
  async componentWillMount() {
    const path = '/slow_slice';
    const key = 'slow_slice';

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
        text: '慢请求切片分析'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function (params) {
          console.log(params);
          let sum = 0;
          for (let index = 0; index < params.length; index++) {
            const element = params[index];
            sum += element['value'];
          }
          let string = params[0]['name'];
          for (let index = 0; index < params.length; index++) {
            const element = params[index];
            const percent = ' (' + (element['value'] / sum * 100).toFixed(2) + '%' + ')';
            string = string + '<br/>' + element['seriesName'] + ' : ' + element['value'] + percent;
          }
          return string;
        }
      },
      legend: {
        data: ['dns', 'tcp', 'ssl', 'request', 'first pack', 'response']
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
          data: [34.7464, 62.9139, 207.3905, 273.7844, 615.1206, 712.8443, 1092.7333, 3179.0962]
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
          data: [46.2551, 75.0122, 116.3077, 152.2129, 208.1768, 205.4956, 242.4254, 594.0931]
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
          data: [134.5675, 228.2499, 344.4992, 390.9444, 586.1206, 572.6207, 779.3124, 2483.5381]
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
          data: [0.1526, 0.5281, 0.9854, 0.8088, 1.5486, 0.8136, 1.7063, 17.8956]
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
          data: [147.9811, 239.6918, 498.4211, 836.8413, 739.7179, 1128.1058, 993.1667, 2174.6968]
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
          data: [3.4861, 8.1603, 27.4452, 34.9505, 66.6301, 64.2797, 86.4508, 315.3974]
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
)(SlowSliceChart);
