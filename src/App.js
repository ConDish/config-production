import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.bundle';
// import "bootstrap";
// import "popper";
// import 'jquery/dist/jquery';
import 'babel-core/register';
import 'babel-polyfill';

import Home from './components/page/Auth/Home';
import Login from './components/page/Auth/Login';


class App extends Component {
  render() {
    return (
      <Router>
        <main>
          <nav className="navbar navbar-dark navbar-expand-lg" style={{ background: '#3DA5E5' }}>
            <Link className="navbar-brand" to="/">Logo</Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
              <span className="navbar-toggler-icon"></span>
            </button>


            <div className="collapse navbar-collapse" id="navbarSupportedContent">

              <ul className="navbar-nav mr-auto">


                <li className="nav-item">
                  <Link to="/" className="nav-link">Inico</Link>

                </li>

                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>

              </ul>

            </div>

          </nav>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;