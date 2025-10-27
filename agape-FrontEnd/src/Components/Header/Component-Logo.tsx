import { useNavigate, Route, Routes } from "react-router-dom";

const ComponentLogo = () => {
    const navigate = useNavigate();

    return (
        <div className="ComponentLogo">
            <img src="../Logos/Agape - Logo AZUL Min.png" alt="Logo" />
            <div>
                <div className="navegadorDiv">
                    <button onClick={() => navigate("/")}><h2>Home</h2></button>
                    <button onClick={() => navigate("/campanias")}><h2>Campañas</h2></button>
                    <button onClick={() => navigate("/contacto")}><h2>Contacto</h2></button>
                </div>

                <Routes>    
                    <Route path="/" element= {<h3>Home</h3>} />
                    <Route path="/campanias" element= {<h3>Campañas</h3>} />
                    <Route path="/contacto" element= {<h3>Contacto</h3>} />
                    <Route path="/usuario" element= {<h3>Perfil de Usuario</h3>} />
                    <Route path="/perfil-campania" element= {<h3>Perfil de Campania</h3>} />
                    <Route path="/donar" element= {<h3>Donacion</h3>} />
                </Routes> 
            </div>
              

        </div>
    );
}

export default ComponentLogo;