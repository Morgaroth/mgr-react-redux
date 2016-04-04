import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
// import 'todomvc-app-css/index.css'

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// import Algorithm from "./components/algorithm/Algorithm"
// render(
//     <Algorithm knightPosition={[2,3]}/>,
//     document.getElementById('root')
// )
