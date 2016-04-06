import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
import * as actions from "./actions/index"

const store = configureStore();

store.dispatch(actions.fetchCPUsFromServer());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);