import { useSearchParams, Link, useNavigate } from 'react-router-dom';

const PagoStatus = () => {
    const [searchParams] = useSearchParams();

    const paymentId = searchParams.get("payment_id");
    const status = searchParams.get("status");

    // approved, rejected, pending

    if(status === "approved"){
        return (
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
        );
    }else{
        if(status === "rejected" ){
            return (
                <div className="container-pago-status">

                    <h1>Tu pago ha sido rechazado</h1>

                    <div className="detalles-compra">
                        <p>El estado de tu pago es: <strong>{status}</strong></p>
                        <p>Tu número de operación es: <strong>{paymentId}</strong></p>
                    </div>

                    <Link to="/">Volver al inicio</Link>
                    <Link to={"/campanias"}>Volver a Campañas</Link>

                </div>
            );
        }else{
            <div className="container-pago-status">

                <h1>Tu pago esta pendiente</h1>

                <div className="detalles-compra">
                    <p>El estado de tu pago es: <strong>{status}</strong></p>
                    <p>Tu número de operación es: <strong>{paymentId}</strong></p>
                </div>

                <Link to="/">Volver al inicio</Link>
                <Link to={"/campanias"}>Volver a Campañas</Link>
            </div>
        }
    }
};

export default PagoStatus;