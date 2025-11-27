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

    const handleDonar = async () => {
        // 1. Validación básica antes de llamar al servidor
        if (!montoInput || Number(montoInput) <= 0) {
            alert("Por favor ingresa un monto válido mayor a 0");
            return;
        }

        const campaniaId = Number(idCamp);
        if (!campaniaId || Number.isNaN(campaniaId)) {
            alert("ID de campaña inválido.");
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
                    console.log("Redirigiendo a Mercado Pago...", data.url);
                    window.location.href = data.url; 
                } else {
                    console.error("El servidor no devolvió la URL de pago");
                    alert("Hubo un error al generar el link de pago.");
                }
            } else {
                console.error("Error del servidor:", res.statusText);
                alert("No se pudo conectar con el servicio de pagos.");
            }
        } catch (err) {
            console.error("Error de red:", err);
            alert("Error de conexión.");
        } finally {
            setLoading(false);
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
                </div>

                <button onClick={handleDonar} disabled={loading}>
                    {loading ? "Procesando..." : "Ir a Pagar con Mercado Pago"}
                </button>
                
                <p id="aviso">
                    Serás redirigido a Mercado Pago de forma segura.
                </p>   
            </div>
        </div>
    );
}

export default Donar;