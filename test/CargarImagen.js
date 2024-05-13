import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Axios from "axios";

function CargarImagen(){
    const[user, setUser] = useState('');
    const[archivo, setArchivo] = useState();
    const[allImg, setAllmg] = useState([]);

useEffect(()=>{
    Axios.get("http://localhost:3001/getAllImg",{

    }).then((data)=>{
        if(data.data === "No imagen"){
            alert("No hay imagenes");
        }else{
            setAllmg(data.data);
        }
    })
}, []);

    const submit = (e) =>{
        e.preventDefault();

        const frmData = new FormData();
        frmData.append("file", archivo);
        frmData.append("user", user);

        Axios.post("http://localhost:3001/file",
        frmData,
        {
            headers: {'Content-Type': 'multipart/form-data'}
        }
        ).then((data)=>{
            if(data.data.alert === "Success"){
                console.log(data.data);
            }
            if(data.data.alert === "Error"){
                alert("error");
            }
            
        }).catch((error)=>{
            console.log(error);
        });
      }

    return(
        <>
        <div>
            <label>Nombre de usuario</label>
            <input type="text" placeholder="Usuario"
             value={user}  onChange={(e)=>{setUser(e.target.value)}} />
        
            <label>Archivo</label>
            <input type="file" 
            onChange={(e)=>{setArchivo(e.target.files[0])}} />
        
            <button className="btn btn-primary" 
            onClick={submit}>Enviar</button>
        </div>

        {
            allImg.map((val,key)=>{
                return(
                    <>
                    <img src={'data:image/jpeg;base64,'+val.base64} 
                    className="casr-img-top" style={{width: '18rem'}}/>
                    <h5 className="car-title">{val.user}</h5>
                    </>
                )
            })
        }
        </>
    )
}

export default CargarImagen