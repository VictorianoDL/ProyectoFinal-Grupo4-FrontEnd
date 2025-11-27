import { useNavigate } from "react-router-dom";

type Campania = {
    id_campania: number;
    nombre: string;
    descripcion: string;
};

type Props = {
    campanias: Campania; 
    className?:string;
};

const CampaniaCard = ({campanias, className }: Props) => {
    const navigate = useNavigate();

    if(campanias === undefined){
        return(
            <div className={`CampaniaCard${className ? ` ${className}` : ''} cardSinContenido`}>
                <h2>Nada que Mostrar</h2>
            </div> 
        )
    }

    return (
        <div className={`CampaniaCard${className ? ` ${className}` : ''}`} onClick={() => navigate("/perfil-campania/"+campanias.id_campania)}>
            <h2>{campanias.nombre}</h2>
            <p>{campanias.descripcion}</p>
        </div>
    );
}
export default CampaniaCard;