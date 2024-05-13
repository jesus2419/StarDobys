import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import './Usuarios.css';
import startLogo from './assets/img/start_loog.png';
import Header from './Header';
import rockIcon from './assets/img/rock.png';
import kpopIcon from './assets/img/kpop.png';
import jazzIcon from './assets/img/jazz.png';
import electronicaIcon from './assets/img/dj.png';
import perfilIcon from './assets/img/grupo.png';
import crearGrupoIcon from './assets/img/mas.png';
import kpopGroupIcon from './assets/img/kpop-icon.png';
import jazzGroupIcon from './assets/img/jazz-icon.png';
import rockGroupIcon from './assets/img/rock-icon.png';
import electronicGroupIcon from './assets/img/electronic-icon.png';
import countryGroupIcon from './assets/img/country-icon.png';
import popGroupIcon from './assets/img/pop-icon.png';

function MisGrupos() {
    return (
        <>
            <Header />
            <div className="container-fluid mt-4">
                <div className="row">
                    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light">
                        <div className="position-sticky">
                            <img src={startLogo} alt="Start Logo" className="img-fluid p-3" />
                            <div className="list-group mt-3">
                                <button type="button" className="list-group-item list-group-item-action">
                                    <img src={rockIcon} alt="Rock" className="icon" />
                                    Rock
                                </button>
                                <button type="button" className="list-group-item list-group-item-action">
                                    <img src={kpopIcon} alt="Kpop" className="icon" />
                                    Kpop
                                </button>
                                <button type="button" className="list-group-item list-group-item-action">
                                    <img src={jazzIcon} alt="Jazz" className="icon" />
                                    Jazz
                                </button>
                                <button type="button" className="list-group-item list-group-item-action">
                                    <img src={electronicaIcon} alt="Electrónica" className="icon" />
                                    Electrónica
                                </button>
                                <Link to="/Perfil" className="list-group-item list-group-item-action">
                                    <img src={perfilIcon} alt="Perfil" className="icon" />
                                    Perfil
                                </Link>
                                <Link to="/CrearGrupo" className="list-group-item list-group-item-action">
                                    <img src={crearGrupoIcon} alt="Crear grupo" className="icon" />
                                    Crear grupo
                                </Link>
                            </div>
                        </div>
                    </nav>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div>
                            <div className="group">
                                <img src={kpopGroupIcon} alt="Kpop Icon" />
                                <h3>Kpop Enthusiasts</h3>
                                <p>Entusiastas del Kpop</p>
                                <div className="group-buttons">
                                    <button className="delete-button">Abandonar</button>
                                    <button className="edit-button">Editar</button>
                                </div>
                            </div>
                            <div className="group">
                                <img src={jazzGroupIcon} alt="Jazz Icon" />
                                <h3>Jazz Junkies</h3>
                                <p>Adictos al Jazz</p>
                                <div className="group-buttons">
                                    <button className="delete-button">Abandonar</button>
                                    <button className="edit-button">Editar</button>
                                </div>
                            </div>
                            <div className="group">
                                <img src={rockGroupIcon} alt="Rock Icon" />
                                <h3>Rock Rebels</h3>
                                <p>Rebeldes del Rock</p>
                                <div className="group-buttons">
                                    <button className="delete-button">Abandonar</button>
                                </div>
                            </div>
                            <div className="group">
                                <img src={electronicGroupIcon} alt="Electronic Icon" />
                                <h3>Electronic Euphoria</h3>
                                <p>Euforia Electrónica</p>
                                <div className="group-buttons">
                                    <button className="delete-button">Abandonar</button>
                                </div>
                            </div>
                            <div className="group">
                                <img src={countryGroupIcon} alt="Country Icon" />
                                <h3>Compañeros del Country</h3>
                                <p>Fandom for companions of country music.</p>
                                <div className="group-buttons">
                                    <button className="delete-button">Abandonar</button>
                                </div>
                            </div>
                            <div className="group">
                                <img src={popGroupIcon} alt="Pop Icon" />
                                <h3>Amigos del Pop</h3>
                                <p>Fandom for friends of pop music.</p>
                                <div className="group-buttons">
                                    <button className="delete-button">Abandonar</button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default MisGrupos;
