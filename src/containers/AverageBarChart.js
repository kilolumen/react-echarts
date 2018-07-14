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
        data: ['分位值']
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
          '45%', '50%', '55%', '60%', '65%', '70%', '75%', '80%', '85%', '90%', '95%']
      },
      series: [
        {
          name: '分位值',
          type: 'bar',
          barWidth: 20,
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [492, 605, 712, 803, 884, 961, 1041, 1128, 1227, 1346, 1476, 1583, 1680, 1806, 1981, 2238, 2611, 3173, 4629]
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
