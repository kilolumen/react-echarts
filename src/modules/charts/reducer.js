import { GET_CHART } from '../types-constant';

// state 初始化数据
const initialState = {
   routePaths: [
      {
        path: 'line',
        name: '总时长分布图'
      },
      {
        path: 'pie',
        name: '分布数量'
      },
      {
        path: 'average',
        name: '分段平均值分布'
      },
      {
        path: 'slice',
        name: '切片分析'
      },
      {
        path: 'slow_slice',
        name: '慢请求分析'
      },
      {
        path: 'slow_full_slice',
        name: '全链路慢请求'
      },
      {
        path: 'network',
        name: '网络分析'
      },
      {
        path: 'pre_ad',
        name: 'pre ad cost time'
      },
      {
        path: 'image_size',
        name: 'image size'
      },
      {
        path: 'location',
        name: '地理位置'
      }
   ],
   heatmap: [[]],
   map: [],
   parallel: [[]],
   graph: {
      data: [],
      links: []
   }
};

const typesCommands = {
   [GET_CHART](state, action) {
      const { key, value } = action.msg;

      return Object.assign({}, state, {
         [key]: value
      });
   }
};

export default function home(state = initialState, action) {
   const actionResponse = typesCommands[action.type];

   return actionResponse ? actionResponse(state, action) : state;
}
