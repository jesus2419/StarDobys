import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import './Header.css';  // Importar el archivo CSS personalizado

function Header() {
    const sesion = JSON.parse(localStorage.getItem('sesion'));

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-purple">
            <a className="navbar-brand"></a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <span className="navbar-text">{sesion}</span>
                    </li>
                    <li className="nav-item">
                        <form className="form-inline">
                            <div className="input-group">
                                <input className="form-control" type="search" placeholder="Buscar" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-light" type="submit">Buscar</button>
                                </div>
                            </div>
                        </form>
                    </li>
                    <li className="nav-item">
                        <Link to='/' className="nav-link">Salir<span className="sr-only"></span></Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;
