import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';  // Importar Link desde react-router-dom
import './Usuarios.css';  // Importar el archivo CSS personalizado
import './styles.css';  // Importar el archivo CSS personalizado
import startLogo from './assets/img/start_loog.png';  // Importar la imagen
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

function VerGrupos() {
    return (
        <>
            <Header />
            <div className="container-fluid mt-4">
                <div className="row">
                    {/* Barra lateral */}
                    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light">
                        <div className="position-sticky">
                            {/* Imagen en la parte superior de la barra lateral */}
                            <img src={startLogo} alt="Start Logo" className="img-fluid p-3" />

                            {/* Íconos en la barra lateral */}
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
                                <Link to="/Perfil"  className="list-group-item list-group-item-action">
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
                    {/* Contenido principal */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <h3>Peticiones nuevas</h3>
                        <div>
                            {/* Grupo 1 - Entusiastas del Kpop */}
                            <div className="group">
                                <img src={kpopGroupIcon} alt="Ícono de Kpop" />
                                <h3>Entusiastas del Kpop</h3>
                                <p>Petición de: <span className="random-name">Juan Pérez</span></p>
                                <div className="group-buttons">
                                    <button className="accept-button">Aceptar</button>
                                    <button className="reject-button">Rechazar</button>
                                </div>
                            </div>
                            {/* Grupo 2 - Adictos al Jazz */}
                            <div className="group">
                                <img src={jazzGroupIcon} alt="Ícono de Jazz" />
                                <h3>Adictos al Jazz</h3>
                                <p>Petición de: <span className="random-name">María Rodríguez</span></p>
                                <div className="group-buttons">
                                    <button className="accept-button">Aceptar</button>
                                    <button className="reject-button">Rechazar</button>
                                </div>
                            </div>
                            {/* Grupo 3 - Rebeldes del Rock */}
                            <div className="group">
                                <img src={rockGroupIcon} alt="Ícono de Rock" />
                                <h3>Rebeldes del Rock</h3>
                                <p>Petición de: <span className="random-name">Carlos López</span></p>
                                <div className="group-buttons">
                                    <button className="accept-button">Aceptar</button>
                                    <button className="reject-button">Rechazar</button>
                                </div>
                            </div>
                            {/* Grupo 4 - Euforia Electrónica */}
                            <div className="group">
                                <img src={electronicGroupIcon} alt="Ícono Electrónico" />
                                <h3>Euforia Electrónica</h3>
                                <p>Petición de: <span className="random-name">Ana Martínez</span></p>
                                <div className="group-buttons">
                                    <button className="accept-button">Aceptar</button>
                                    <button className="reject-button">Rechazar</button>
                                </div>
                            </div>
                        </div>

                        <h3>Grupos existentes</h3>
                        <div>
                            {/* Grupo 5 - Compañeros del Country */}
                            <div className="group">
                                <img src={countryGroupIcon} alt="Ícono de Country" />
                                <h3>Compañeros del Country</h3>
                                <p>Creado por: <span className="random-name">Pedro García</span></p>
                                <div className="group-buttons">
                                    <button className="reject-button">Ver miembros</button>
                                    <button className="reject-button">Editar</button>
                                    <button className="reject-button">Eliminar</button>
                                </div>
                            </div>
                            {/* Grupo 6 - Amigos del Pop */}
                            <div className="group">
                                <img src={popGroupIcon} alt="Ícono de Pop" />
                                <h3>Amigos del Pop</h3>
                                <p>Creado por: <span className="random-name">Laura Fernández</span></p>
                                <div className="group-buttons">
                                    <button className="reject-button">Ver miembros</button>
                                    <button className="reject-button">Editar</button>
                                    <button className="reject-button">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default VerGrupos;
