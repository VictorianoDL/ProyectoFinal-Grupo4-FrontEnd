import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Campanias from "./Campanias/Campanias";

const Main = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/campanias" element= {<Campanias />} />
        
        {/* 
        <Route path="/perfil" element= {<Skills />} />
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