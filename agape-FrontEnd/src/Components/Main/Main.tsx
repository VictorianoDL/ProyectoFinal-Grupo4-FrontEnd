import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Campanias from "./Campanias/Campanias";
import PerfilUsuario from "./PerfilUsuario/PerfilUsuario";
import PerfilCampania from "./PerfilCampania/PerfilCampania";
import Contacto from "./Contacto/Contacto";
import Donar from "./PerfilCampania/Donar/Donar";

const Main = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/campanias" element= {<Campanias />} />
        <Route path="/usuario" element= {<PerfilUsuario />} />
        <Route path="/perfil-campania" element= {<PerfilCampania />} />
        <Route path="/donar" element= {<Donar />}/>
        <Route path="/contacto" element= {<Contacto />}/>
        

        <Route path="*" element= {<h1>404 ERROR - No existe pagina</h1>} /> 
        
      </Routes>
    </div>
  );
};

export default Main;