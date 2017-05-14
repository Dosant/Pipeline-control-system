import React, {Component} from 'react';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import Page from './Containers/Page';
import Browse from './Containers/Browse';
import Map from './Containers/Map';
import Stats from './Containers/Stats';
import Alert from './Containers/Alert';
import Help from './Containers/Help';
import About from './Containers/About';
import Settings from './Containers/Settings';
import PreConfiguration from './Containers/Configuration/PreConfiguration';
import Configuration from './Containers/Configuration/Configuration';
import Login from './Containers/Login';
import Menu from './Menu';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import './App.css';

const Shell = ({children}) => {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel">
        <Header />
        <div className="content">
          <div className="container-fluid">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

class App extends Component {
  authRequiredHook(nextState, replace) {
    if (nextState.location.state && nextState.location.state.user === 'test') {
      return;
    } else {
      return;
      replace('/login');
    }
  }
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Shell} onEnter={this.authRequiredHook}>
          <IndexRoute component={Page} />
          <Router path="browse" component={Browse} />
          <Router path="map" component={Map} />
          <Router path="alerts" component={Alert} />
          <Router path="stats" component={Stats} />
          <Router path="help" component={Help} />
          <Router path="about" component={About} />
          <Router path="settings" component={Settings} />
        </Route>
        <Route path="/menu" component={PreConfiguration} onEnter={this.authRequiredHook}></Route>
        <Route path="/configuration" component={Configuration} onEnter={this.authRequiredHook}></Route>
        <Router path="/login" component={Login}/>
      </Router>
    );
  }
}

export default App;
