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
            </Routes>             
        </div>
    );
}

export default ComponentLogo;