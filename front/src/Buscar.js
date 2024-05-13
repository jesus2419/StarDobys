import React, { useState } from 'react';
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

function Buscar() {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedCondition, setSelectedCondition] = useState('');
    const [selectedShipping, setSelectedShipping] = useState('');

    const toggleGenre = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(g => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    const handlePriceChange = (event) => {
        setSelectedPrice(event.target.value);
    };

    const handleConditionChange = (event) => {
        setSelectedCondition(event.target.value);
    };

    const handleShippingChange = (event) => {
        setSelectedShipping(event.target.value);
    };

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
                    {/* Filtros de búsqueda */}
                    <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-4">
                        <div className="row">
                            <div className="col-md-3">
                                <h6>Genero</h6>
                                <select className="form-select" onChange={handlePriceChange}>
                                    <option value="">Rock</option>
                                    <option value="">Pop</option>
                                    <option value="">Rap</option>
                                    <option value="">Electronica</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <h6>Intereses</h6>
                                <select className="form-select" onChange={handleConditionChange}>
                                    <option value="">Historia</option>
                                    <option value="nuevo">Instrumentos</option>
                                    <option value="usado">Tecnologias</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <h6>Ubicacion</h6>
                                <select className="form-select" onChange={handleShippingChange}>
                                    <option value="">Mexico</option>
                                    <option value="gratis">Estados Unidos</option>
                                    <option value="pago">Korea</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* Contenido principal */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Resultados de búsqueda</h5>
                                <p className="card-text">Aquí aparecerán los resultados de la búsqueda basados en los filtros seleccionados.</p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Buscar;
