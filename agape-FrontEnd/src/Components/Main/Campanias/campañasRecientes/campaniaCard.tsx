const CampaniaCard = ({ nombre, descripcion }: { nombre: string; descripcion: string; }) => {
    return (
        <div className="CampaniaCard">
            <h2>{nombre}</h2>
            <p>{descripcion}</p>
        </div>
    );
}

export default CampaniaCard;