import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';  // Asegúrate de tener este archivo en la ruta correcta.
import Header from './Header';  // Importar Header

import rockIcon from './assets/img/rock.png';
import kpopIcon from './assets/img/kpop.png';
import jazzIcon from './assets/img/jazz.png';
import electronicaIcon from './assets/img/dj.png';
import perfilIcon from './assets/img/grupo.png';
import agregarGrupoIcon from './assets/img/mas.png';
import kpopGroupIcon from './assets/img/kpop-icon.png';

function Miembros() {
    const [subseccionesContenido, setSubseccionesContenido] = useState('');

    const mostrarSubsecciones = (categoria) => {
        let contenido = '';

        switch (categoria) {
            case 'rock':
                contenido = `
                    <h3>Rock</h3>
                    <ul>
                        <li>Rock Indie</li>
                        <li>Rock Alternativo</li>
                    </ul>
                `;
                break;
            case 'kpop':
                contenido = `
                    <h3>Kpop</h3>
                    <ul>
                        <li>Kpop Clásico</li>
                        <li>Kpop Moderno</li>
                    </ul>
                `;
                break;
            case 'jazz':
                contenido = `
                    <h3>Jazz</h3>
                    <ul>
                        <li>Jazz Clásico</li>
                        <li>Jazz Moderno</li>
                    </ul>
                `;
                break;
            case 'electronica':
                contenido = `
                    <h3>Electrónica</h3>
                    <ul>
                        <li>Electrónica Dance</li>
                        <li>Electrónica Chill</li>
                    </ul>
                `;
                break;
            default:
                break;
        }

        setSubseccionesContenido(contenido);
    };

    const cerrarModal = () => {
        setSubseccionesContenido('');
    };

    const generateMembersList = () => {
        const members = [
            'Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Hank', 'Ivy',
            'Jack', 'Kate', 'Liam', 'Mia', 'Noah', 'Olivia', 'Peter', 'Quinn', 'Rachel',
            'Sam', 'Tom'
        ];

        return members.map(member => (
            <li key={member}>
                {member}
                <div className="member-buttons">
                    <button className="expulsar-button">Expulsar</button>
                    <button className="banear-button">Banear</button>
                </div>
            </li>
        ));
    };

    return (
        <>
            <Header /> {/* Añadir el componente Header */}

            <div className="d-flex">
                <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light">
                    <div className="position-sticky">
                        <div className="logo-container">
                            <img className="logo-menu" src="./assets/img/start_loog.png" alt="Logo" />
                        </div>

                        <div className="menu-container mt-2">
                            <button className="menu-section" onClick={() => mostrarSubsecciones('rock')}>
                                <img src={rockIcon} alt="Icono de Rock" />
                                <span>Rock</span>
                            </button>
                            <button className="menu-section" onClick={() => mostrarSubsecciones('kpop')}>
                                <img src={kpopIcon} alt="Icono de Kpop" />
                                <span>Kpop</span>
                            </button>
                            <button className="menu-section" onClick={() => mostrarSubsecciones('jazz')}>
                                <img src={jazzIcon} alt="Icono de Jazz" />
                                <span>Jazz</span>
                            </button>
                            <button className="menu-section" onClick={() => mostrarSubsecciones('electronica')}>
                                <img src={electronicaIcon} alt="Icono de Electronica" />
                                <span>Electronica</span>
                            </button>
                            <button className="menu-section" onClick={() => window.location.href = 'VistAperfil.html'}>
                                <img src={perfilIcon} alt="Icono de Perfil" />
                                <span>Perfil</span>
                            </button>
                            <button className="menu-section" onClick={() => window.location.href = 'AgregarGrupo.html'}>
                                <img src={agregarGrupoIcon} alt="Icono de Agregar Grupo" />
                                <span>Agregar Grupo</span>
                            </button>
                        </div>

                        {/* Modal para subsecciones */}
                        <div className="modal" id="subseccionesModal">
                            <div className="modal-content">
                                <span className="close" onClick={cerrarModal}>&times;</span>
                                <div dangerouslySetInnerHTML={{ __html: subseccionesContenido }}></div>
                            </div>
                        </div>
                    </div>
                </nav>

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="main-content" style={{ overflowY: 'auto', paddingRight: '15px' }}>
                        <div className="group">
                            <img src={kpopGroupIcon} alt="Kpop Icon" />
                            <h3>Kpop Enthusiasts</h3>
                            <div className="group-members">
                                <h4>Lista de Miembros:</h4>
                                <ul>
                                    {generateMembersList()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
        </>
    );
}

export default Miembros;
