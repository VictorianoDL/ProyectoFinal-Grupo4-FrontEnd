import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Campanias from "./Campanias/Campanias";
import PerfilCampania from "./PerfilCampania/PerfilCampania";

const Main = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/campanias" element= {<Campanias />} />
        <Route path="/perfil-campaña" element= {<PerfilCampania />} />

        {/* 
        
        <Route path="/login" element= {<login />} />
        <Route path="/register" element= {<register />} />
        <Route path="/contacto" element= {<Contacto />} />
        */}

        <Route path="*" element= {<h1>404 ERROR - No existe pagina</h1>} /> 
        
      </Routes>
    </div>
  );
};

export default Main;