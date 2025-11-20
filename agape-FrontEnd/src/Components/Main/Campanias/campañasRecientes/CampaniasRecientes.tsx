import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CampaniaCard from "./CampaniaCard";

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
    const navigate = useNavigate();

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
        return <div>No hay campañas recientes.</div>;
    }

    return (
        <div className="campanias-recientes">
            <h1>Recientes</h1>
            <div className="campanias-grid">
                <div className="fila">
                    <CampaniaCard className="cuadrado" {...recientes[0]} />
                    <CampaniaCard className="rectangulo" {...recientes[1]} />
                </div>

                <div className="fila">
                    <CampaniaCard className="rectangulo" {...recientes[2]} />
                    {recientes[3] ?
                    <>
                        <CampaniaCard className="cuadrado" {...recientes[3]} />
                    </>
                    :
                    <>
                    </>}
                    
                </div>
            </div>
        </div>
    );
}

export default CampaniasRecientes;

// const CampaniRecientes = ({ nombre, descripcion, className }: { nombre: string; descripcion: string; className?:string }) => {
//     const navigate = useNavigate();

//     return (
//         <div className={`CampaniaCard${className ? ` ${className}` : ''}`}}>
//             <h2>{nombre}</h2>
//             <p>{descripcion}</p>
//         </div>
//     );

{/*     <div className="campanias">
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
        </div> */}
// }

// export default CampaniRecientes;