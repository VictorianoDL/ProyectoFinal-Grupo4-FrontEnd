import CampaniaCard from "./campañasRecientes/campaniaCard";
import "./campañasRecientes/styles/campanias.css";

const Campanias = () => {
  const campanias = [ 
    { id: '1', nombre: 'Campaña 1', descripcion: 'Descripción de la campaña 1' },
    { id: '2', nombre: 'Campaña 2', descripcion: 'Descripción de la campaña 2' },
    { id: '3', nombre: 'Campaña 3', descripcion: 'Descripción de la campaña 3' },
    { id: '4', nombre: 'Campaña 4', descripcion: 'Descripción de la campaña 4' },

  ]; 

  return (
    <div className="campanias">
      <h1>Recientes</h1>
      <div className="campanias-grid">
        {campanias.map(campania => (
          <CampaniaCard key={campania.id} {...campania} />
        ))}
      </div>
    </div>
  );
};

export default Campanias;