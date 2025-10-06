import  CampaniasPorFinalizar  from "./campañasPorFinalizar/campaniaPorFinalizar";
import CampaniaCard from "./campañasRecientes/campaniaCard";
import "./campañasRecientes/campanias.css";
import "./campañasPorFinalizar/campaniasPorFinalizar.css";
import BuscarCampañas from "./buscarCampaña/buscarCampañas";

const Campanias = () => {
  const campanias = [ 
    { id: '1', nombre: 'Campaña 1', descripcion: 'Descripción de la campaña 1' },
    { id: '2', nombre: 'Campaña 2', descripcion: 'Descripción de la campaña 2' },
    { id: '3', nombre: 'Campaña 3', descripcion: 'Descripción de la campaña 3' },
    { id: '4', nombre: 'Campaña 4', descripcion: 'Descripción de la campaña 4' },

  ]; 

  return (
    <div>
      <h2>Recientes</h2>
      <div className="campanias">
        <div className="campanias-grid" onClick={() => {}}>
          <div className="fila">
            <CampaniaCard className="cuadrado" {...campanias[0]} />
            <CampaniaCard className="rectangulo" {...campanias[1]} />
          </div>

          <div className="fila">
            <CampaniaCard className="rectangulo" {...campanias[2]} />
            <CampaniaCard className="cuadrado" {...campanias[3]} />
          </div>
        </div>
      </div>

        <CampaniasPorFinalizar/>

        <BuscarCampañas/>
    
    </div>
  );
};

export default Campanias;