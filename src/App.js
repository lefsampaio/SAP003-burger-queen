import './components/styles.css';
import Saloon from './Pages/Saloon';
import Kitchen from './Pages/Kitchen'
import Logo from './components/BurgerQueen'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorClosed, faHamburger } from '@fortawesome/free-solid-svg-icons'
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
          <Logo />
          <div className="div-list">
            <li className="nav-li">
              <Link className="nav-link" to="/"><FontAwesomeIcon icon={faDoorClosed} />Salão</Link>
            </li>
            <li className="nav-li">
              <Link className="nav-link" to="/Kitchen"> <FontAwesomeIcon icon={faHamburger} /> Cozinha</Link>
            </li>
          </div>
        </div>
      </nav>
      <Switch>
        <Route exact path="/" component={Saloon} />
        <Route path="/Kitchen" component={Kitchen} />
      </Switch>
    </Router>
  );
}