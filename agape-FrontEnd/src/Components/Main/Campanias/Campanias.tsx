import CampaniRecientes from "./CampañasRecientes/CampaniasRecientes";
import CampaniasPorFinalizar from "./CampañasPorFinalizar/campaniaPorFinalizar";
import BuscarCampañas from "./BuscarCampaña/buscarCampañas";
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
            <BuscarCampañas campanias={campaniasArray} />
        </div>
    );
};

export default Campanias;