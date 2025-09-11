import React, { useState } from "react";
import "./buscarCampañas.css";

const BuscarCampañas: React.FC = () => {
    const [query, setQuery] = useState('');

    const campanias = [
        { nombre: 'Campaña 1', descripcion: 'Descripción de la campaña 1' },
        { nombre: 'Campaña 2', descripcion: 'Descripción de la campaña 2' },
        { nombre: 'Campaña 3', descripcion: 'Descripción de la campaña 3' },
        { nombre: 'Campaña 4', descripcion: 'Descripción de la campaña 4' },
        { nombre: 'Campaña 5', descripcion: 'Descripción de la campaña 5' },
        { nombre: 'Campaña 6', descripcion: 'Descripción de la campaña 6' },
        { nombre: 'Campaña 7', descripcion: 'Descripción de la campaña 7' }
    ];

    const resultadosFiltrados = campanias.filter(campania => campania.nombre.toLowerCase().includes(query.toLowerCase()));

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
                    resultadosFiltrados.map((campania, index) => (
                        <div key={index} className="resultadoCard" onClick={() => {}}>
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