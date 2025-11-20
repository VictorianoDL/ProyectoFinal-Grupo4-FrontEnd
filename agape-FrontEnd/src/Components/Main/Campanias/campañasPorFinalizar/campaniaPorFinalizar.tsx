import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

type Campania = {
    id_campania: number;
    nombre: string;
    tipo: string;
    objetivo: number;
    recaudado: number;
};

type Props = {
    campanias: Campania[];
    threshold?: number;
    limit?: number;
};

const CampaniasPorFinalizar = ({ campanias, threshold = 0.8, limit = 5 }: Props) => {
    const navigate = useNavigate();

    const porFinalizar = useMemo(() => {
        if (!campanias || campanias.length === 0) return [];

        return (
            campanias.map((c) => {
                const objetivo = Number(c.objetivo) || 0;
                const recaudado = Number(c.recaudado) || 0;
                const porcentaje = objetivo > 0 ? Math.min(100, Math.round((recaudado / objetivo) * 100)) : 0;
                const faltante = Math.max(0, objetivo - recaudado);
                return { ...c, porcentaje, faltante };
            })
                // filtrar: entre threshold (ej 80%) y 99% (todavía no alcanzada)
                .filter((c) => c.porcentaje >= Math.round(threshold * 100) && c.porcentaje < 100)
                // ordenar las más cercanas al objetivo primero
                .sort((a, b) => b.porcentaje - a.porcentaje)
                .slice(0, limit)
        );
    }, [campanias, threshold, limit]);



    if (!campanias || campanias.length === 0) {
        return <div>No hay campañas disponibles.</div>;
    }

    if (porFinalizar.length === 0) {
        return <div>No hay campañas cerca de su objetivo.</div>;
    }

    return (
        <div className="segundoContainer">
            <h2>A nada de llegar al objetivo!</h2>
            {porFinalizar.map((campania) => (
                <div
                    key={campania.id_campania}
                    className="barraContainer"
                    onClick={() => navigate(`/perfil-campania/${campania.id_campania}`)}
                    style={{ cursor: "pointer" }}
                >



                    <div className="barraFondo">
                        <div
                            className="barraRelleno"
                            style={{ width: `${campania.porcentaje}%` }}
                        >
                            <div>
                                <div className="barraNombre">{campania.nombre}</div>
                                <div className="meta">
                                    <small>Faltan: ${campania.faltante}</small>
                                </div>
                            </div>
                            <div className="barraPorcentaje">{campania.porcentaje}%</div>
                        </div>
                    </div>

                    



                </div>
            ))}
        </div>
    );
};

export default CampaniasPorFinalizar;



{/* <div className="segundoContainer">
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
        </div> */}

