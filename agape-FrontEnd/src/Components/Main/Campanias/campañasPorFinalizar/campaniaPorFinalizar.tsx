import { useNavigate } from "react-router-dom";

type Campania = {
    id_campania: number;
    nombre: string;
    descripcion: string;
    objetivo:number;
    recaudado: number;
};

type Props = {
    campanias: Campania[];
};

const CampaniasPorFinalizar = ({ campanias }: Props) => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>A nada de llegar al objetivo!</h1>
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

