//import React from 'react';
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
import Nav from './Nav'
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';  // Importar Link desde react-router-dom



import Axios from "axios";
import React, { useEffect, useState } from "react";

function VerGrupos() {
    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const category = searchParams.get('category');

    const sesion = JSON.parse(localStorage.getItem('sesion'))

    const[allImg, setAllmg] = useState([]);

    function detectar_categoria(id2) {
        switch(id2) {
            case 1: 
                return "Rock";
            
            case 2: 
                return "K-pop";
            
            case 3: 
                return "Jazz";
            
            case 4: 
                return "Electronica";
            
            case 5: 
                return "Corridos tumbados";
            
            case 6: 
                return "Pop";
            
            default:
                return "Categoría no encontrada"; // Manejo de caso por defecto
        }
    }
    


    
useEffect(()=>{
    const frmData = new FormData();
    frmData.append("nomb", sesion);

    Axios.post(`http://localhost:3001/getgruposCategoria?nomb=${encodeURIComponent(id)}`)
    .then((data)=>{
        if(data.data === "No imagen"){
            alert("No hay imagen en el usuario");
        }else{
            setAllmg(data.data);
        }
    })
}, [id]);

const categoria = detectar_categoria(id);
    return (
        <>
            <Header />
            <div className="container-fluid mt-4">
                <div className="row">
                    {/* Barra lateral */}
                    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light">
                        
                        <Nav></Nav>
                    </nav>
                    {/* Contenido principal */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 d-flex justify-content-center align-items-center">

                    <div className="content">
                        {
                            
                        }
                    <h5 className="card-title">Todos los grupos de {category} </h5>
                        {
                        //ID, NombreGrupo, NombreCategoria, NombreUsuarioCreador, Fotousuario, Descripción, Fecha_de_creación, Foto, Estado
                        allImg.map((val,key)=>{
                            return (
                                <div className="card-container" key={key}>
                                    <div className="card mt-4">
                                        <Link to={`/Grupo?id=${val.ID}`} className="card-link">
                                            <img src={'data:image/jpeg;base64,' + val.Foto} className="card-img-top" alt={val.NombreGrupo} />
                                            <div className="card-body">
                                                <span className="navbar-text">Categoría: {val.NombreCategoria}</span>
                                                <h5 className="card-title">{val.NombreGrupo}</h5>
                                                <p className="card-text">{val.Descripción}</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default VerGrupos;
