import './Donar.css'
import { useCampaña } from '../../../Context/CampañaContext';

const Donar = () => {
    const { 
        idCamp   , nameCamp   , descripcion   , tipo   , objetivo   , recaudado   , fecha_inicio  , activo, ownerUsuario, ownerEmail,
        setIdCamp, setNameCamp, setDescripcion, setTipo, setObjetivo, setRecaudado, setFechaInicio, setActivo, setOwnerUsuario, setOwnerEmail
    } = useCampaña();

    const handleDonar = () => {
        // Lógica para procesar la donación
    };

    return (
        <div className='donar'> 
            <div className='donarContainer'>
                <div className='datosCampañaContainer'>
                    <h1>FOTO</h1>
                    <div>
                        <h2>{nameCamp}</h2>
                        <p>Dueño: {ownerEmail}</p>
                    </div>
                </div>    
                <div className='montoContainer'>
                    <h4>Indica el donativo</h4>
                    <input type="number" placeholder='Monto' />

                    <h4>Num. Tarjeta</h4>
                    <input type="number" placeholder='XXXX XXXX XXXX XXXX' />
                </div>
                <button onClick={handleDonar}>Donar</button>    
            </div>
        </div>
    );
}
export default Donar;