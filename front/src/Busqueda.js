import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Header from './Header';
import Nav from './Nav';

function Busqueda() {
    const [grupos, setGrupos] = useState([]);
    const [error, setError] = useState(null);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const term = searchParams.get('buscar');

    useEffect(() => {
        if (term) {
            Axios.get(`http://localhost:3001/buscarGrupos?term=${term}`)
                .then((response) => {
                    if (response.data && response.data !== 'No datos') {
                        setGrupos(response.data);
                    } else {
                        //setGrupos([]);
                    }
                })
                .catch((error) => {
                    setError(error.message);
                });
        } else {
            //setGrupos([]);
        }
    }, []);

    return (
        <>
            <Header />
            <div className="container-fluid mt-4">
                <div className="row">
                    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light">
                        <Nav />
                    </nav>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 d-flex justify-content-center align-items-center">
                        <div className="content">
                            <h5 className="card-title">Resultados de Busqueda</h5>
                            {grupos.length > 0 ? (
                                grupos.map((val, key) => {
                                    return (
                                        <div className="card-container" key={key}>
                                            <div className="card mt-4">
                                                <Link to={`/Grupo?id=${val.ID}`} className="card-link">
                                                    {val.Foto && <img src={`data:image/jpeg;base64,${val.Foto}`} className="card-img-top" alt={val.NombreGrupo} />}
                                                    <div className="card-body">
                                                        <span className="navbar-text">Categoría: {val.NombreCategoria}</span>
                                                        <h5 className="card-title">{val.NombreGrupo}</h5>
                                                        <p className="card-text">{val.Descripción}</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>No se encontraron grupos.</p>
                            )}
                            {error && <p>Error: {error}</p>}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Busqueda;
