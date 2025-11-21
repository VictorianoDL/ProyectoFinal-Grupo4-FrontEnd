import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Campania = {
    id_campania: number;
    nombre: string;
    descripcion: string;
    fecha_inicio: Date;
};

type Props = {
    campanias: Campania[]; 
};

const BuscarCampañas = ({ campanias }: Props) => {
    const [query, setQuery] = useState<string>("");
    const navigate = useNavigate();

    const resultadosFiltrados = campanias.filter(c => c.nombre.toLowerCase().includes(query.toLowerCase()));

    return (
        <div>
            <div id="buscarCampañas">
                <h1>Buscar Campañas</h1>
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
                
            <div className="buscarCampañas">
                {resultadosFiltrados.length > 0 ? (
                    resultadosFiltrados.map(campania => (
                <div
                    key={campania.id_campania}
                    className="resultadoCard"
                    onClick={() => navigate(`/perfil-campania/${campania.id_campania}`)}
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