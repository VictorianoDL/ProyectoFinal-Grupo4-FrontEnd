import './Donar.css'
import { useCampaña } from '../../../Context/CampañaContext';
import { useUser } from '../../../Context/UserContext';

const Donar = () => {
    const {accessToken} = useUser();
    const { 
        idCamp   , nameCamp   , descripcion   , tipo   , objetivo   , recaudado   , fecha_inicio  , activo, ownerUsuario, ownerEmail,
        setIdCamp, setNameCamp, setDescripcion, setTipo, setObjetivo, setRecaudado, setFechaInicio, setActivo, setOwnerUsuario, setOwnerEmail
    } = useCampaña();

    const handleDonar = async () => {
        // Lógica para procesar la donación: DNACION NO FUNCIONA
        const monto = (document.getElementById("monto") as HTMLInputElement).value;
        try{
            const res = await fetch('http://localhost:3000/donaciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${accessToken}`,
                    credentials: 'include' 
                },
                body: JSON.stringify({monto: monto, campaniaId: idCamp})
            });
            if(res.ok){

            }else{
                throw new Error("Respuesta fue no ok " + res.statusText);    
            }
        }catch(err){
            console.log(err);
        }
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
                    <input id='monto' type="number" placeholder='Monto' />

                    <h4>Num. Tarjeta</h4>
                    <input type="number" placeholder='XXXX XXXX XXXX XXXX' />
                </div>
                <button onClick={handleDonar}>Donar</button>
                <p id="aviso"></p>   
            </div>
        </div>
    );
}
export default Donar;