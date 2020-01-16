import React from 'react'
import BurgerQueen from '../components/BurgerQueen'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons'

const Navbar = (props) => {
    return (
        <nav className="nav">
            <div className="nav-wrapper">
                <BurgerQueen />
                <div className="div-list">
                    <li className="nav-li">
                        <a className="nav-link" onClick={props.onClick}><FontAwesomeIcon icon={faDoorClosed} />Sair</a>
                    </li>
                </div>
            </div>
        </nav>)
}
export default Navbar