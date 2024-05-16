//import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';  // Importar Link desde react-router-dom
import './Usuarios.css';  // Importar el archivo CSS personalizado
import startLogo from './assets/img/start_loog.png';  // Importar la imagen
import Header from './Header';
import rockIcon from './assets/img/rock.png';
import kpopIcon from './assets/img/kpop.png';
import jazzIcon from './assets/img/jazz.png';
import electronicaIcon from './assets/img/dj.png';
import perfilIcon from './assets/img/grupo.png';
import crearGrupoIcon from './assets/img/mas.png';
import Nav from './Nav'
import Axios from "axios";
import React, { useEffect, useState } from "react";



function Usuarios() {

    const sesion = JSON.parse(localStorage.getItem('sesion'))

    const[allImg, setAllmg] = useState([]);


    
useEffect(()=>{
    const frmData = new FormData();
    frmData.append("nomb", sesion);

    Axios.get("http://localhost:3001/getgrupos")
    .then((data)=>{
        if(data.data === "No imagen"){
            alert("No hay imagen en el usuario");
        }else{
            setAllmg(data.data);
        }
    })
}, []);
    return (
        <>
            <Header />
            <div className="container-fluid mt-4">
                <div className="row">
                    <span className="navbar-text">{sesion}</span>
                    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light">
                       <Nav></Nav>
                    </nav>
                   
                    
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 d-flex justify-content-center align-items-center">

                    

                    <div className="content">
                    <h5 className="card-title">Todos los grupos</h5>
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

export default Usuarios;
