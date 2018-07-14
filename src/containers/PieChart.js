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

class PieChart extends Component {
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
        text: '总时长各阶段数量',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 'right',
        data: ['0-500', '500-1000', '1000-1500', '1500-2000', '2000-2500', '2500-3000', '3000-3500', '3500-4000', '4000-∞'],
      },
      series: [
        {
          name: '数量',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: [
            { value: 43113, name: '0-500' },
            { value: 219617, name: '500-1000' },
            { value: 190411, name: '1000-1500' },
            { value: 157302, name: '1500-2000' },
            { value: 66904, name: '2000-2500' },
            { value: 41361, name: '2500-3000' },
            { value: 24163, name: '3000-3500' },
            { value: 14605, name: '3500-4000' },
            { value: 51935, name: '4000-∞' },
            { value: 191736, name: '失败' }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            normal: {
              formatter: '{b} : {c} ({d}%)'
            }
          }
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
)(PieChart);
