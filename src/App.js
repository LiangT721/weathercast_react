import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Route } from 'react-router-dom'
import HomePage from './page/homepage';
import CityManage from './page/cityManage';
import './asset/style/main.scss'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <BrowserRouter>
            <div>
              <Route path='/' exact  render={() => <HomePage />}></Route>
              <Route path='/city' exact render={() => <CityManage />}></Route>
            </div>
          </BrowserRouter>
        </div>
      </Provider>)
  }
}

export default App;
