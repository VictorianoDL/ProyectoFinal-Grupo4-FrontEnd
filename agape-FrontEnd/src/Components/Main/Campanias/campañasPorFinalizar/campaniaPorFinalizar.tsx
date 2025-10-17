import React from "react";
import { useNavigate } from "react-router-dom";
import "./campaniasPorFinalizar.css";

const CampaniasPorFinalizar: React.FC = () => {
  const navigate = useNavigate();

  const campanias = [
    { nombre: "Campaña 1", porcentaje: 75 },
    { nombre: "Campaña 2", porcentaje: 55 },
    { nombre: "Campaña 3", porcentaje: 90 },
    { nombre: "Campaña 4", porcentaje: 65 },
  ];

  return (
    <div className="segundoContainer">
      <h2>A nada de llegar al objetivo!</h2>
      {campanias.map((campania, index) => (
        <div key={index} className="barraContainer" onClick={() => navigate("/perfil-campania")}>
          <div className="barraFondo">
            <div
              className="barraRelleno"
              style={{ width: `${campania.porcentaje}%` }}>
                <div className="barraNombre">{campania.nombre}</div>
                <div className="barraPorcentaje">{campania.porcentaje}%</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CampaniasPorFinalizar;

        