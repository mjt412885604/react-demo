import React, {
  Component
} from 'react'
import ReactDOM from 'react-dom';
import {
  IndexRoute,
  Router,
  Route,
  hashHistory
} from 'react-router';
import {
  Provider
} from 'react-redux';
import store from './store'
import FastClick from 'fastclick'
FastClick.attach(document.body);

import './css/main.scss'

import Index from './components/index'
import About from './components/about'
import Login from './components/Login'
import Mine from './components/mine'
import MineSet from './components/mineSet'
import Sport from './components/sport'
import ListViewDemo from './components/listView'
import Message from './components/message'
import Trans from './components/transtion'

class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Index} />
        <Route path="/index" component={Index}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/mine" component={Mine}></Route>
        <Route path="/mineSet" component={MineSet}></Route>
        <Route path="/sport" component={Sport}></Route>
        <Route path="/list" component={ListViewDemo}></Route>
        <Route path="/message" component={Message}></Route>
        <Route path="/transtion" component={Trans}></Route>
        <Route path="/login" component={Login}></Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)