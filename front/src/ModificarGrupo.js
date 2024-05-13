import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';  // Importar Link desde react-router-dom
import './CrearGrupo.css';  // Importar el archivo CSS personalizado
import startLogo from './assets/img/start_loog.png';  // Importar la imagen
import Header from './Header';
import rockIcon from './assets/img/rock.png';
import kpopIcon from './assets/img/kpop.png';
import jazzIcon from './assets/img/jazz.png';
import electronicaIcon from './assets/img/dj.png';
import perfilIcon from './assets/img/grupo.png';

function ModificarGrupo() {
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
                            </div>
                        </div>
                    </nav>
                    {/* Contenido principal */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="container d-flex justify-content-center">
                            <div className="card p-4" style={{ width: '600px' }}>
                                <h2 className="text-center">Información del Grupo</h2>

                                <form enctype="multipart/form-data">
                                    <div className="mb-3">
                                        <label htmlFor="nombreGrupo" className="form-label">Nombre del Grupo</label>
                                        <input type="text" className="form-control" id="nombreGrupo" name="nombreGrupo" required />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="categoriaGrupo" className="form-label">Categoría del Grupo</label>
                                        <select className="form-select" id="categoriaGrupo" name="categoriaGrupo" required>
                                            <option value="rock">Rock</option>
                                            <option value="kpop">Kpop</option>
                                            <option value="jazz">Jazz</option>
                                            <option value="electronica">Electronica</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="descripcionGrupo" className="form-label">Descripción del Grupo</label>
                                        <textarea className="form-control" id="descripcionGrupo" name="descripcionGrupo" rows="3" required></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="imagenGrupo" className="form-label">Seleccionar Archivo de Imagen</label>
                                        <input type="file" className="form-control" id="imagenGrupo" name="imagenGrupo" accept="image/*" required />
                                    </div>

                                    <button type="submit" className="btn btn-primary">Guardar Información</button>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default ModificarGrupo;
