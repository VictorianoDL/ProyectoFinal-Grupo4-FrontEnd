import "./campanias.css"

const CampaniaCard = ({ nombre, descripcion, className }: { nombre: string; descripcion: string; className?:string }) => {
    return (
        <div className={`CampaniaCard${className ? ` ${className}` : ''}`}>
            <h2>{nombre}</h2>
            <p>{descripcion}</p>
        </div>
    );
}

export default CampaniaCard;