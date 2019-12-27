import './components/styles.css';
import Saloon from './Pages/Saloon';
import Kitchen from './Pages/Kitchen'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <nav className="nav">
        <div className="nav-wrapper">
          <ul className="ul">
            <li className="nav-li">
              <Link className="nav-link" to="/">Salão</Link>
            </li>
            <li className="nav-li">
              <Link className="nav-link" to="/Kitchen">Cozinha</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route exact path="/" component={Saloon} />
        <Route path="/Kitchen" component={Kitchen} />
      </Switch>
    </Router>
  );
}