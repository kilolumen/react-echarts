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

class ImageSizeBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderer: 'canvas'
    };
  }
  async componentWillMount() {
    const path = '/image_size';
    const key = 'image_size';

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
        text: '图片大小分析'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['total time', 'image time']
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
        name: 'kb',
        data: ['0-20', '20-40', '40-60', '60-80', '80-100', '100-120', '120-140', '140-160',
          '160-180', '180-200', '200-220', '220-240', '240-260', '260-280', '280-300', '300-∞']
      },
      series: [
        {
          name: 'total time',
          type: 'bar',
          barWidth: 10,
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [2074.8303, 2105.0968, 2234.4028, 2326.7625, 2219.7132, 2011.515, 2262.3558,
            2158.6858, 2038.6179, 2057.9826, 2300.3589, 2370.3168, 1804.7798, 2666.3043, 2518.8064, 2796.5534]
        },
        {
          name: 'image time',
          type: 'bar',
          barWidth: 10,
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [1302.3598, 1435.3554, 1505.0312, 1544.1639, 1523.3926, 1370.3584, 1627.0752,
            1406.0005, 1407.5528, 1232.4304, 1545.5366, 1688.4451, 1064.4587, 2153.7391, 1948.4845, 2062.9205]
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
)(ImageSizeBarChart);
