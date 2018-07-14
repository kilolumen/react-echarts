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
        data: ['0-500', '500-1000', '1000-1500', '1500-2000', '2000-2500', '2500-3000', '3000-3500', '3500-∞'],
        axisLabel: {
          formatter: function (value, index) {
            const counts = [43113, 219617, 190411, 157302, 66904, 41361, 24163, 14605, 51935];
            let sum = 0;
            for (let index = 0; index < counts.length; index++) {
              const element = counts[index];
              sum += element;
            }
            return value + '\n' + '(' + counts[index] + ', ' + (counts[index] / sum * 100).toFixed(2) + '%' + ')';
          }
        }

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
              position: 'insideLeft',
              formatter: function (params) {
                return formatter(params);
              }
            }
          },
          data: [20.7142, 36.1721, 48.5724, 56.3067, 82.9198, 148.1582, 179.0878, 1184.9932]
        },
        {
          name: 'tcp',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideLeft',
              formatter: function (params) {
                return formatter(params);
              }
            }
          },
          data: [28.0077, 47.9405, 56.578, 59.4326, 67.5779, 75.8182, 84.86, 240.1603]
        },
        {
          name: 'ssl',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideLeft',
              formatter: function (params) {
                return formatter(params);
              }
            }
          },
          data: [78.2941, 137.6481, 168.0098, 174.7939, 207.5005, 226.6253, 259.5116, 881.702]
        },
        {
          name: 'request',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideLeft',
              formatter: function (params) {
                return formatter(params);
              }
            }
          },
          data: [0.0397, 0.1884, 0.3249, 0.2947, 0.4959, 0.4931, 0.7096, 6.2147]
        },
        {
          name: 'first pack',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideLeft',
              formatter: function (params) {
                return formatter(params);
              }
            }
          },
          data: [84.1426, 146.2631, 166.7496, 171.1348, 181.678, 191.3778, 213.3373, 578.6483]
        },
        {
          name: 'response',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideLeft',
              formatter: function (params) {
                return formatter(params);
              }
            }
          },
          data: [2.2298, 3.7946, 5.0552, 5.5787, 8.2736, 11.2796, 15.8669, 85.8921]
        },
        {
          name: 'image',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight',
              formatter: function (params) {
                return formatter(params);
              }
            }
          },
          data: [170.5427, 391.4102, 770.6129, 1235.7151, 1659.3755, 2061.7506, 2456.1244, 4914.1933]
        }
      ]
    }
  };
}

function formatter(params) {
  const array = [[20.7142, 36.1721, 48.5724, 56.3067, 82.9198, 148.1582, 179.0878, 1184.9932],
    [28.0077, 47.9405, 56.578, 59.4326, 67.5779, 75.8182, 84.86, 240.1603],
    [78.2941, 137.6481, 168.0098, 174.7939, 207.5005, 226.6253, 259.5116, 881.702],
    [0.0397, 0.1884, 0.3249, 0.2947, 0.4959, 0.4931, 0.7096, 6.2147],
    [84.1426, 146.2631, 166.7496, 171.1348, 181.678, 191.3778, 213.3373, 578.6483],
    [2.2298, 3.7946, 5.0552, 5.5787, 8.2736, 11.2796, 15.8669, 85.8921],
    [170.5427, 391.4102, 770.6129, 1235.7151, 1659.3755, 2061.7506, 2456.1244, 4914.1933]];

  const dataIndex = params['dataIndex'];
  let sum = 0;
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    sum += element[dataIndex];
  }
  const percent = '(' + (params['value'] / sum * 100).toFixed(2) + '%' + ')';
  return params['value'] + '\n' + percent;
}

export default connect(
  state => ({ charts: state.charts }),
  dispatch => ({
    getChart: bindActionCreators(getChart, dispatch)
  })
)(SlowFullSliceChart);
