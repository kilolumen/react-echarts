/*
   Root, Router 配置
*/
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
/*
* 暂时没用 按需加载
* */
// import lazyLoad from './lazyLoad';
import App from '../containers/App';
import LineChart from '../containers/LineChart';
import PieChart from '../containers/PieChart'
import SliceChart from '../containers/SliceChart';
import SlowSliceChart from '../containers/SlowSliceChart';
import SlowFullSliceChart from '../containers/SlowFullSliceChart';
import AverageBarChart from '../containers/AverageBarChart';
import NetworkLineChart from '../containers/NetworkLineChart';
import PreAdLineChart from '../containers/PreAdLineChart';
import ImageSizeBarChart from '../containers/ImageSizeBarChart';
import LocationLineChart from '../containers/LocationLineChart';

const Root = () => (
   <div>
      <Switch>
         <Route
            path="/"
            render={props => (
               <App>
                  <Switch>
                     <Route path="/" exact component={LineChart} />
                     <Route path="/line" component={LineChart} />
                     <Route path="/pie" component={PieChart} />
                     <Route path="/slice" component={SliceChart} />
                     <Route path="/slow_slice" component={SlowSliceChart} />
                     <Route path="/slow_full_slice" component={SlowFullSliceChart} />
                    <Route path="/average" component={AverageBarChart} />
                    <Route path="/network" component={NetworkLineChart} />
                    <Route path="/pre_ad" component={PreAdLineChart} />
                    <Route path="/image_size" component={ImageSizeBarChart}/>
                    <Route path="/location" component={LocationLineChart}/>
                     <Route render={() => <Redirect to="/" />} />
                  </Switch>
               </App>
            )}
         />
         <Route render={() => <Redirect to="/" />} />
      </Switch>
   </div>
);

export default hot(module)(Root);
