import "./campanias.css"
import { useNavigate } from "react-router-dom";

const CampaniaCard = ({ nombre, descripcion, className }: { nombre: string; descripcion: string; className?:string }) => {
    const navigate = useNavigate();

    return (
        <div className={`CampaniaCard${className ? ` ${className}` : ''}`} onClick={() => navigate("/perfil-campania")}>
            <h2>{nombre}</h2>
            <p>{descripcion}</p>
        </div>
    );
}

export default CampaniaCard;