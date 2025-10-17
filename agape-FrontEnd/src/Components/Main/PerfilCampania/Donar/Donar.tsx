import './Donar.css'

const Donar = () => {
    return (
        <div className='donar'> 
            <div className='donarContainer'>
                <div className='datosCampañaContainer'>
                    <h1>FOTO</h1>
                    <div>
                        <h2>Nombre Campaña</h2>
                        <p>Usuario Owner</p>
                    </div>
                    
                </div>    
                <div className='montoContainer'>
                    <h4>Indica el donativo</h4>
                    <input type="number" placeholder='Monto' />

                    <h4>Num. Tarjeta</h4>
                    <input type="number" placeholder='XXXX XXXX XXXX XXXX' />
                </div>
                <button>Donar</button>    
            </div>
        </div>
    );
}
export default Donar;