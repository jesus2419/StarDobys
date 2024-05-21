//import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import './Header.css';  // Importar el archivo CSS personalizado
import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';  // Importar Link desde react-router-dom




import startLogo from './assets/img/start_loog.png';  // Importar la image

function Header() {
    const sesion = JSON.parse(localStorage.getItem('sesion'));
    const[busqueda, setbusqueda] = useState('');

    const buscar = (e) => {
      e.preventDefault();
      
  }
  

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-custom">
  <div class="container-fluid">
  <Link to="/Home">
            <img src={startLogo} alt="Start Logo" className="img-fluid p-3" />
            </Link>
    

    <button class="navbar-toggler" type="button" data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
      aria-label="Toggle navigation">
      <i class="fas fa-bars text-light"></i>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto d-flex flex-row mt-3 mt-lg-0">
        
        <li class="nav-item text-center mx-2 mx-lg-1">
         <Link to="/CrearGrupo">
          <a class="nav-link" href="#">
            <div>
              <i class="far fa-envelope fa-lg mb-1"></i>
              <span class="badge rounded-pill badge-notification bg-danger">+</span>
            </div>
            Crear nuevo grupo
          </a>
          </Link>
        </li>
        {/*<li class="nav-item text-center mx-2 mx-lg-1">
          <a class="nav-link disabled" aria-disabled="true" href="#">
            <div>
              <i class="far fa-envelope fa-lg mb-1"></i>
              <span class="badge rounded-pill badge-notification bg-warning">📩</span>
            </div>
            Mensajes
          </a>
        </li> */}
        
        
      </ul>
      

      <ul class="navbar-nav ms-auto d-flex flex-row mt-3 mt-lg-0">
        <li class="nav-item text-center mx-2 mx-lg-1">
        <Link to="/Perfil">
          <a class="nav-link" href="#">
            <div>
              <i class="fas fa-bell fa-lg mb-1"></i>
              <span class="badge rounded-pill badge-notification bg-info">🎸</span>
            </div>
            Perfil
          </a>
          </Link>
        </li>
        <li class="nav-item text-center mx-2 mx-lg-1">
        <Link to="/">
          <a class="nav-link" href="#">
            <div>
              <i class="fas fa-globe-americas fa-lg mb-1"></i>
              <span class="badge rounded-pill badge-notification bg-success">🚪</span>
            </div>
            Salir
          </a>
          </Link>
        </li>
      </ul>

      <form class="d-flex input-group w-auto ms-lg-3 my-3 my-lg-0">
        <input type="search" class="form-control" placeholder="Search" aria-label="Search" onChange={(e)=>{setbusqueda(e.target.value)}} />
        <NavLink to={`/Busqueda?buscar=${busqueda}`}>
        <button class="btn btn-primary" type="button" data-mdb-ripple-color="dark" >
          Search
        </button>
        </NavLink>
      </form>

    </div>
  </div>
</nav>

    );
}

export default Header;
