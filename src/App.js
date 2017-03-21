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
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Shell}>
          <IndexRoute component={Page} />
          <Router path="browse" component={Browse} />
          <Router path="map" component={Map} />
          <Router path="alerts" component={Alert} />
          <Router path="stats" component={Stats} />
          <Router path="help" component={Help} />
          <Router path="about" component={About} />
          <Router path="settings" component={Settings} />
        </Route>
        <Route path="/menu" component={Menu}>
        </Route>
      </Router>
    );
  }
}

export default App;
