import { Route, Routes, useParams } from "react-router-dom";
import Home from "./Home/Home";
import Campanias from "./Campanias/Campanias";
import PerfilUsuario from "./PerfilUsuario/PerfilUsuario";
import PerfilCampania from "./PerfilCampania/PerfilCampania";
import Contacto from "./Contacto/Contacto";
import Donar from "./Donar/Donar";

// ...existing code...

// Wrapper que valida que :id sea number; si no, muestra 404
const PerfilCampaniaWrapper = () => {
  const params = useParams<{ id?: string }>();
  const parsed = params.id ? parseInt(params.id, 10) : undefined;
  const routeId: number | undefined =
    typeof parsed === "number" && !Number.isNaN(parsed) ? parsed : undefined;

  if (routeId === undefined) {
    return <h1>404 ERROR - No existe pagina</h1>;
  }

  return <PerfilCampania />;
};

const Main = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/campanias" element= {<Campanias />} />
        <Route path="/usuario" element= {<PerfilUsuario />} />
        <Route path="/perfil-campania/:id" element= {<PerfilCampaniaWrapper />} />
        <Route path="/donar" element= {<Donar />}/>
        <Route path="/contacto" element= {<Contacto />}/>
        <Route path="*" element= {<h1>404 ERROR - No existe pagina</h1>} /> 
      </Routes>
    </div>
  );
};

export default Main;