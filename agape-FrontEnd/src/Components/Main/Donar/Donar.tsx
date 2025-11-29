import { useState } from 'react';
import { useCampaña } from '../../../Context/CampañaContext';
import { useUser } from '../../../Context/UserContext';
import "./Donar.css";

const urlBack = import.meta.env.VITE_URL_BACKEND;

const Donar = () => {
    const { accessToken } = useUser();
    const { idCamp, nameCamp, ownerEmail } = useCampaña();

    const [montoInput, setMontoInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleDonarMercadoPago = async () => {
        let p = document.getElementById("aviso") as HTMLParagraphElement;
        p.className = "colorRojoError";

        // 1. Validación básica antes de llamar al servidor
        if (!montoInput || Number(montoInput) <= 0) {
            p.innerText = "Por favor ingresa un monto válido Mayor a 0";
            return;
        }

        const campaniaId = Number(idCamp);
        if (!campaniaId || Number.isNaN(campaniaId)) {
            alert("ID de campaña inválido. Por Favor vuelva a la pestaña anterior");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(urlBack+"/mercadopago/create_preference", {
                method: 'POST',
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${accessToken}`, 
                },
                body: JSON.stringify({
                    amount: Number(montoInput), 
                    campaignId: String (idCamp) 
                })
            });

            if (res.ok) {
                const data = await res.json();
                if (data.url) {
                    window.location.href = data.url; 
                } else {
                    console.error("El servidor no devolvió la URL de pago");
                    p.innerText = "Hubo un error al generar el link de pago.";
                }
            } else {
                console.error("Error del servidor:", res.statusText);
                p.innerText = "No se pudo conectar con el servicio de pagos.";
            }

        } catch (err) {
            console.error("Error de red:", err);
            p.innerText = "Error de conexión.";
        } finally {
            setLoading(false);
        }
    }; 
    
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
            const res = await fetch(urlBack+'/donaciones', {
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
                    <input 
                        id='monto' 
                        type="number" 
                        placeholder='Ej: 1000' 
                        value={montoInput}
                        onChange={(e) => setMontoInput(e.target.value)}
                    />
                    <p id="aviso"></p> 
                </div>

                <div id='conteinerBotones'>
                    <button onClick={handleDonarMercadoPago} disabled={loading}>
                        {loading ? "Procesando..." : "Ir a Pagar con Mercado Pago"}
                    </button>
                    <button onClick={handleDonar} disabled={loading}>
                        {loading ? "Procesando..." : "Donar Comun"}
                    </button>
                </div>
                
            </div>
        </div>
    );
}

export default Donar;