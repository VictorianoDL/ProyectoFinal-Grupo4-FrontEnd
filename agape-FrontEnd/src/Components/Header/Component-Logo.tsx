import { Route, Routes } from "react-router-dom";

const ComponentLogo = () => {
    return (
        <div className="ComponentLogo">
            <img src="../Logos/Agape - Logo AZUL Min.png" alt="Logo" />
            <Routes>    
                <Route path="/" element= {<h3>Home</h3>} />
                <Route path="/campanias" element= {<h3>Campañas</h3>} />
                <Route path="/usuario" element= {<h3>Perfil de Usuario</h3>} />
                {/* agregar mas rutas */}
                <Route path="/perfil-campaña" element= {<h3>Perfil de Campania</h3>} />
                <Route path="/Contacto" element= {<h3>Contacto</h3>} />
            </Routes>             
        </div>
    );
}

export default ComponentLogo;