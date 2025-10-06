import { useState } from 'react';
import './PerfilUsuario.css'

const PerfilUsuario = () => {
    const [activeTab, setActiveTab] = useState("usuario");

    return (
        <div>
            <div className="container1Usuario">
                <img 
                    src="https://t4.ftcdn.net/jpg/01/24/65/69/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg"
                    alt="LogoUsuario" 
                    className="fotoUsuario" />

                <div className='container2Usuario'>
                    <h2>Usuario1234</h2>
                    <p>example@gmail.com</p>
                </div>
            </div>

            
            <div className="navPerfil">
                <h2
                    className={activeTab === "usuario" ? "active" : ""}
                    onClick={() => setActiveTab("usuario")}
                >
                Perfil de Usuario
                </h2>
                <h2
                    className={activeTab === "campaña" ? "active" : ""}
                    onClick={() => setActiveTab("campaña")}
                >
                Perfil de Campaña
                </h2>
                
            </div>

            <div className='linea'></div>
            
            <div className="tabContent">
                {activeTab === "usuario" && (
                <div className="usuarioContent">
                    
                </div>
                )}
                {activeTab === "campaña" && (
                <div className="campañaContent">
                    
                </div>
                )}
            </div>

            
            
        </div>
    );
}

export default PerfilUsuario;