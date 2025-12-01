import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import './Pago-Status.css'

const PagoStatus = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const paymentId = searchParams.get("payment_id");
    const status = searchParams.get("status");

    switch(status){
        case "approved":{
            return(
                <div className="container-pago-status">

                    <h1>¡Gracias por tu aporte!</h1>

                    <div className="detalles-compra">
                        <p>El estado de tu pago es: <strong>{status}</strong></p>
                        <p>Tu número de operación es: <strong>{paymentId}</strong></p>
                    </div>

                    <p>Te hemos enviado un comprobante a tu correo.</p>

                    <Link to="/">Volver al inicio</Link>
                    <Link to={"/campanias"}>Volver a Campañas</Link>

                </div>
            )
        }
        case "rejected":{
            return(
                <div className="container-pago-status">

                    <h1>Tu pago ha sido rechazado</h1>

                    <div className="detalles-compra">
                        <p>El estado de tu pago es: <strong>{status}</strong></p>
                        <p>Tu número de operación es: <strong>{paymentId}</strong></p>
                    </div>

                    <Link to="/">Volver al inicio</Link>
                    <Link to={"/campanias"}>Volver a Campañas</Link>

                </div>
            )
        }
        case "in_process":{
            return(
                <div className="container-pago-status">

                    <h1>Tu pago esta pendiente</h1>

                    <div className="detalles-compra">
                        <p>El estado de tu pago es: <strong>{status}</strong></p>
                        <p>Tu número de operación es: <strong>{paymentId}</strong></p>
                    </div>

                    <Link to="/">Volver al inicio</Link>
                    <Link to={"/campanias"}>Volver a Campañas</Link>

                </div>     
            )
        }
        default: navigate(`/`)
    }
};

export default PagoStatus;