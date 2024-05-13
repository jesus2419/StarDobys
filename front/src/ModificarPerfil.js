import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';  // Importar Link desde react-router-dom
import './ModificarPerfil.css';  // Importar el archivo CSS personalizado
import startLogo from './assets/img/start_loog.png';  // Importar la imagen
import Header from './Header';
import rockIcon from './assets/img/rock.png';
import kpopIcon from './assets/img/kpop.png';
import jazzIcon from './assets/img/jazz.png';
import electronicaIcon from './assets/img/dj.png';
import perfilIcon from './assets/img/grupo.png';
import masIcon from './assets/img/mas.png';

function ModificarPefil() {
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
                                    <img src={masIcon} alt="Agregar Grupo" className="icon" />
                                    Agregar Grupo
                                </Link>
                            </div>
                        </div>
                    </nav>
                    {/* Contenido principal */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="content-full">
                            <div style={{ height: '140px', paddingLeft: '32px' }} className="d-flex align-items-center">
                                <svg className="cf-t" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"
                                    fill="#000000">
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path
                                        d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                                </svg>
                                <h4 className="cf-t text-center">Configuraciones de perfil</h4>
                            </div>
                            <div className="d-flex justify-content-center">
                                <div style={{ width: '30%' }}>
                                    <div className="d-flex justify-content-center">
                                        <div className="d-flex mb-2 align-items center">
                                            <div className="icon-container">
                                                <img className="round-img" src="./assets/img/sloth.png" alt="Foto de Perfil" />
                                            </div>
                                            <div className="d-flex align-items-center" style={{ marginLeft: '16px' }}>
                                                <input className="form-control" style={{ width: '300px' }} type="file" id="formFile" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" id="floatingInput" placeholder="Usuario" value="usuarioEjemplo" />
                                        <label htmlFor="floatingInput">Nombre de usuario*</label>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value="ContR4.S3ñ4" />
                                        <label htmlFor="floatingPassword">Contraseña*</label>
                                    </div>
                                    {/* Nuevos campos para nombre, apellidos y correo */}
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" id="nombre" placeholder="Nombre" value="Nombre Ejemplo" />
                                        <label htmlFor="nombre">Nombre*</label>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" id="apellidos" placeholder="Apellidos" value="Apellidos Ejemplo" />
                                        <label htmlFor="apellidos">Apellidos*</label>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="email" className="form-control" id="correo" placeholder="name@example.com" value="correo.ejemplo@gmail.com" />
                                        <label htmlFor="correo">Correo*</label>
                                    </div>
                                    <div className="w-100 mt-4 d-flex align-items-center justify-content-end">
                                        <button type="button" className="btn btn-outline-danger" style={{ marginRight: '16px' }}>Eliminar cuenta</button>
                                        <button className="btn btn-accent" type="submit">Guardar cambios</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default ModificarPefil;
