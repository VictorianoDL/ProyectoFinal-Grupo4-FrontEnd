import CampaniRecientes from "./CampañasRecientes/CampaniasRecientes";
import CampaniasPorFinalizar from "./CampañasPorFinalizar/campaniaPorFinalizar";
import BuscarCampañas from "./BuscarCampaña/buscarCampañas";
import { useEffect, useState } from "react";
import "./Campanias.css";

const urlBack = import.meta.env.VITE_URL_BACKEND;

const Campanias = () => {
    const [campaniasArray, setCampanias] = useState<[]>([]);

    useEffect(() => {
        const fetchCampanias = async () => {
            try {
                const res = await fetch(urlBack+"/campanias");
                if (!res.ok) {
                    console.error("Error en la respuesta:", res.status, res.statusText);
                    return;
                }
                const data = await res.json();
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