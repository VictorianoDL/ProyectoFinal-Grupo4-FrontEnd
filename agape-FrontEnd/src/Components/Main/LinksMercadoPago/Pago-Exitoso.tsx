import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useCampaña } from '../../../Context/CampañaContext';

const PagoExitoso = () => {
    const {
        idCamp, nameCamp
    } = useCampaña();
    const [searchParams] = useSearchParams();

    const paymentId = searchParams.get("payment_id");
    const status = searchParams.get("status");
    const paymentType = searchParams.get("payment_type");

    return (
        <div className="container-pago-exitoso">

            <h1>¡Gracias por tu aporte!</h1>
            <h2>{nameCamp} Te lo agradece</h2>

            <div className="detalles-compra">
                <p>El estado de tu pago es: <strong>{status}</strong></p>
                <p>Tu número de operación es: <strong>{paymentId}</strong></p>
            </div>

            <p>Te hemos enviado un comprobante a tu correo.</p>

            <Link to="/">Volver al inicio</Link>
            <Link to={"/perfil-campania/"+idCamp}>Volver al perfil de la campaña</Link>
        </div>
    );
};



export default PagoExitoso;