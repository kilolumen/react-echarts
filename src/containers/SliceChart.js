/*
   slice 切片分析
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

class SliceChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderer: 'canvas'
    };
  }
  async componentWillMount() {
    const path = '/slice';
    const key = 'slice';

    await this.props.getChart({ path, key });
  }
  render() {
    const renderer = this.state.renderer;
    const option = this.getOption();

    return <Chart renderer={renderer} option={option} />;
  }
  getOption = () => {
    // const { data, links } = this.props.charts.slice;
    return {
      title: {
        text: '切片分析'
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
        data: ['全部']
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
          data: [162.2562]
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
          data: [77.8935]
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
          data: [246.2408]
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
          data: [0.8511]
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
          data: [270.1762]
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
          data: [14.5738]
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
          data: [1450.9047]
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
)(SliceChart);
