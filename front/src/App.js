import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import {useState} from 'react';
import Axios from 'axios';
import Registro from './Registro';
import Usuarios from './Usuarios';
import InicioSesion from './InicioSesion';
import CrearGrupo from './CrearGrupo';
import Perfil from './Perfil';
import ModificarPerfil from './ModificarPerfil';
import VerGrupos from './VerGrupos';
import MisGrupos from './MisGrupos';
import Grupo from './Grupo';
import ModificarGrupo from './ModificarGrupo';
import Miembros from './Miembros';
import Buscar from './Buscar';
import CargarImagen from './CargarImagen';
import Header from './Header'; // Importar el Header component



function App(){
 
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Registro/>}></Route>
        <Route path='/Home' element={<Usuarios/>}></Route>
        <Route path='/Inicio' element={<InicioSesion/>}></Route>
        <Route path='/CrearGrupo' element={<CrearGrupo/>}></Route>
        <Route path='/CrearGrupo' element={<CrearGrupo/>}></Route>
        <Route path='/Perfil' element={<Perfil/>}></Route>
        <Route path='/ModificarPerfil' element={<ModificarPerfil/>}></Route>
        <Route path='/VerGrupos' element={<VerGrupos/>}></Route>
        <Route path='/MisGrupos' element={<MisGrupos/>}></Route>
        <Route path='/Grupo' element={<Grupo/>}></Route>
        <Route path='/ModificarGrupo' element={<ModificarGrupo/>}></Route>
        <Route path='/Miembros' element={<Miembros/>}></Route>
        <Route path='/Buscar' element={<Buscar/>}></Route>
        <Route path='/CargarImagen' element={<CargarImagen/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}



export default App;
