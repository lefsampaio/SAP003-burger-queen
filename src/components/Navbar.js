import React from 'react'
import BurgerQueen from '../components/BurgerQueen'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons'
import {
    Link,
    useHistory
} from 'react-router-dom'
import firebase from 'firebase'
import growl from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';

const effect =
{
    fadeAway: true,
    fadeAwayTimeOut: 1000,
}

const Navbar = () => {
    const history = useHistory();
    const logout = () => {
        firebase.auth()
            .signOut()
            .then(history.push('/'))
            .catch(() => {
                growl.error({ text: 'Ocorreu um erro ao sair', ...effect })
            });
    };
    return (
        <nav className="nav">
            <div className="nav-wrapper">
                <BurgerQueen />
                <div className="div-list">
                    <li className="nav-li">
                        <a className="nav-link" onClick={logout}><FontAwesomeIcon icon={faDoorClosed} />Sair</a>
                    </li>
                </div>
            </div>
        </nav>)
}
export default Navbar