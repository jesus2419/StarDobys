import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logol from './start_loog.png'; 

function InicioSesion() {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const nav = useNavigate();

    const log = () => {
        axios.post("http://localhost:3001/login", {
            us: user,
            con: pass
        })
        .then((data) => {
            if (data.data.alert === "Success") {
                localStorage.setItem('sesion', JSON.stringify(data.data.usuario));
                nav("/Home");
            } else {
                setError('Usuario no encontrado, verifica tus credenciales');
            }
        })
        .catch((error) => {
            setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
        });
    }

    return (
        <div className="fondo-gris"> 
            <div className="registrationBox">
                <div className="d-flex justify-content-center">
                    <div className="logo-container d-flex justify-content-center align-items-center">
                        <img src={logol} alt="Logo" />
                    </div>
                </div>
                <div className="mb-3 box1">
                    <label className="form-label">Nombre de usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Usuario"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <label className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button className="btn btn-primary" onClick={log}>Ingresar</button>
                    <Link to="/" className="btn btn-outline-info">Registrarse</Link>
                    <Link to="/CargarImagen" className="btn btn-outline-info">Test Foto</Link>
                </div>
            </div>
        </div>
    )
}

export default InicioSesion;
