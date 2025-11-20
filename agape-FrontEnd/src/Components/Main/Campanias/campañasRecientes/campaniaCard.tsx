import { useNavigate } from "react-router-dom";

const CampaniaCard = ({id_campania, nombre, descripcion, className }: {id_campania:number; nombre: string; descripcion: string; className?:string }) => {
    const navigate = useNavigate();
    return (
        <div className={`CampaniaCard${className ? ` ${className}` : ''}`} onClick={() => navigate("/perfil-campania/"+id_campania)}>
            <h2>{nombre}</h2>
            <p>{descripcion}</p>
        </div>
    );
}
export default CampaniaCard;