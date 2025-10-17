import { useState } from 'react';
import './PerfilCampania.css'
import { useNavigate } from "react-router-dom";

const PerfilCampania = () => {
    const navigate = useNavigate();
    
    return (
        <div className="perfil-campania">
            <div className='conteiner-donaciones'>
                <div className='porcentaje'>
                    <h2>20%</h2>
                </div>
                <div className='lista-boton'>
                    <h3>lista donaciones</h3>
                    <button onClick={()=>navigate("/donar")}>Donar</button>
                </div>
                <div className='lista-donadores'>
                    <p>nombreUsuario | fecha | monto</p>
                    <p>nombreUsuario | fecha | monto</p>
                    <p>nombreUsuario | fecha | monto</p>
                </div>
            </div>
            <div className='conteiner-informacion'>
                <h1>Nombre Campania</h1>
                <h3>Usuario Owner</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>   
            </div>
        </div>
    );
};

export default PerfilCampania;