import './Donar.css'
import { useCampaña } from '../../../Context/CampañaContext';
import { useUser } from '../../../Context/UserContext';
import { use, useEffect } from 'react';

const Donar = () => {
    const {accessToken} = useUser();
    const { 
        idCamp   , nameCamp   , descripcion   , tipo   , objetivo   , recaudado   , fecha_inicio  , activo, ownerUsuario, ownerEmail,
        setIdCamp, setNameCamp, setDescripcion, setTipo, setObjetivo, setRecaudado, setFechaInicio, setActivo, setOwnerUsuario, setOwnerEmail
    } = useCampaña();


    const handleDonar = async () => {
        
        let avisoElem = document.getElementById("aviso") as HTMLElement;
        const montoStr = (document.getElementById("monto") as HTMLInputElement).value;
        const monto = Number(montoStr);
        if (!monto || monto <= 0) {
            avisoElem.innerText = "Ingrese un monto válido";
            return;
        }

        const campaniaId = Number(idCamp);
        if (!campaniaId || Number.isNaN(campaniaId)) {
            avisoElem.innerText = "No hay campaña seleccionada";
            return;
        }

        const payload = {
            monto, 
            fecha: new Date().toISOString(), 
            campaniaId
        };

        try{
            const res = await fetch('http://localhost:3000/donaciones', {
                method: 'POST',
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json',
                    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
                },
                body: JSON.stringify(payload),
            });

            if(res.ok){
               avisoElem.innerText = "Todo salio correctamente ¡Gracias por tu donación!"; 
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