import { useMemo } from "react";
import CampaniaCard from "./campaniaCard";

type Campania = {
    id_campania: number;
    nombre: string;
    descripcion: string;
    fecha_inicio: Date;
};

type Props = {
    campanias: Campania[]; 
};

const CampaniasRecientes = ({ campanias }: Props) => {

    const recientes = useMemo(() => {
        return [...(campanias || [])]
            .filter(c => c && c.fecha_inicio) // quitar items sin fecha
            .sort((a, b) => {
                const da = new Date(a.fecha_inicio).getTime();
                const db = new Date(b.fecha_inicio).getTime();
                return db - da; // descendente
            })
            .slice(0, 5);
    }, [campanias]);

    if (!recientes.length) {
        return (
            <div className="campanias-recientes">
                <h1>Recientes</h1>
                <div className="campanias-grid">
                    <div className="fila">
                        <div className={`CampaniaCard cuadrado cardSinContenido`}>
                            <h2>Cargando...</h2>
                        </div> 
                        <div className={`CampaniaCard rectangulo cardSinContenido`}>
                            <h2>Cargando...</h2>
                        </div> 
                    </div>

                    <div className="fila">
                        <div className={`CampaniaCard rectangulo cardSinContenido`}>
                            <h2>Cargando...</h2>
                        </div> 
                        <div className={`CampaniaCard cuadrado cardSinContenido`}>
                            <h2>Cargando...</h2>
                        </div> 
                    </div>
                </div>
            </div>
        )
    }else{
        return (
            <div className="campanias-recientes">
                <h1>Recientes</h1>
                <div className="campanias-grid">
                    <div className="fila">
                        <CampaniaCard className="cuadrado" campanias={recientes[0]} />
                        <CampaniaCard className="rectangulo" campanias={recientes[1]} />
                    </div>

                    <div className="fila">
                        <CampaniaCard className="rectangulo" campanias={recientes[2]} />
                        <CampaniaCard className="cuadrado" campanias={recientes[3]} />
                    </div>
                </div>
            </div>
        );
    }
}

export default CampaniasRecientes;