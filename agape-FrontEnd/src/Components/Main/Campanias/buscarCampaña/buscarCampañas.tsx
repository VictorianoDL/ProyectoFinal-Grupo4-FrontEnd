import React, { useEffect, useState } from "react";
import "./buscarCampañas.css";
import { useNavigate } from "react-router-dom";

type Campania = {
    id_campania: number;
    nombre: string;
    descripcion?: string;
};

const BuscarCampañas: React.FC = () => {
    const [query, setQuery] = useState<string>("");
    const [campanias, setCampanias] = useState<Campania[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCampanias = async () => {
            try {
                const res = await fetch("http://localhost:3000/campanias");
                if (!res.ok) {
                    console.error("Error en la respuesta:", res.status, res.statusText);
                    return;
                }
                const data: Campania[] = await res.json();
                setCampanias(data);
            } catch (err) {
                console.error("Error al cargar campañas", err);
            }
        };
        fetchCampanias();
    }, []);

    const resultadosFiltrados = campanias.filter(c => c.nombre.toLowerCase().includes(query.toLowerCase()));

    return (
        <div>
            <h2>Buscar Campañas</h2>
            <input
                type="text"
                placeholder="Buscar..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <div className="buscarCampañas">
                {resultadosFiltrados.length > 0 ? (
                    resultadosFiltrados.map(campania => (
                <div
                    key={campania.id_campania}
                    className="resultadoCard"
                    onClick={() => navigate("/perfil-campania")}
                >
                    <p className="nombre">{campania.nombre}</p>
                    <p className="descripcion">{campania.descripcion}</p>
                </div>
                ))
            ) : (
                <p>No se encontraron campañas.</p>
            )}
            </div>
        </div>
    );
};

export default BuscarCampañas;