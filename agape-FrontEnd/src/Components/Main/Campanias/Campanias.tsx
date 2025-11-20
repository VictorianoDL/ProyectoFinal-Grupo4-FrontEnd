import CampaniRecientes from "./CampañasRecientes/CampaniasRecientes";
import CampaniasPorFinalizar from "./CampañasPorFinalizar/campaniaPorFinalizar";
import BuscarCampañas from "./BuscarCampaña/BuscarCampañas";
import "./Campanias.css";

import { useEffect, useState } from "react";

const Campanias = () => {
    const [campaniasArray, setCampanias] = useState<[]>([]);

    useEffect(() => {
        const fetchCampanias = async () => {
            try {
                const res = await fetch("http://localhost:3000/campanias");
                if (!res.ok) {
                    console.error("Error en la respuesta:", res.status, res.statusText);
                    return;
                }
                const data = await res.json();
                console.log(data);
                setCampanias(data);
            } catch (err) {
                console.error("Error al cargar campañas", err);
            }
        };
        fetchCampanias();
    }, []);

    return (
        <div>
            <CampaniRecientes campanias={campaniasArray} />
            <CampaniasPorFinalizar campanias={campaniasArray} />
            <BuscarCampañas />
        </div>
    );
};

export default Campanias;



{/* <h2 id="h2">Recientes</h2>
            <div className="campanias">
                <div className="campanias-grid" onClick={() => { }}>
                    <div className="fila">
                        <CampaniaCard className="cuadrado" {...campanias[0]} />
                        <CampaniaCard className="rectangulo" {...campanias[1]} />
                    </div>

                    <div className="fila">
                        <CampaniaCard className="rectangulo" {...campanias[2]} />
                        <CampaniaCard className="cuadrado" {...campanias[3]} />
                    </div>
                </div>
            </div> */
        
        
        
        // const campanias = [
    //     { id: '1', nombre: 'Campaña 1', descripcion: 'Descripción de la campaña 1' },
    //     { id: '2', nombre: 'Campaña 2', descripcion: 'Descripción de la campaña 2' },
    //     { id: '3', nombre: 'Campaña 3', descripcion: 'Descripción de la campaña 3' },
    //     { id: '4', nombre: 'Campaña 4', descripcion: 'Descripción de la campaña 4' },
    // ];
}