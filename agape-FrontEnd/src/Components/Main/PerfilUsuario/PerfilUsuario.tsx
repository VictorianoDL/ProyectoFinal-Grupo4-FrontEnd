import { useState } from 'react';
import { useUser } from "../../../Context/UserContext";
import { useCampaña } from '../../../Context/CampañaContext';
import './PerfilUsuario.css'

// crear endpoint para buscar una campaña con el id de usuario
// fetch para traer donaciones de un usuario
// fetch para traer datos su de una campaña
// fetch y post para actualizar datos de usuario
// fetch y post para actualizar datos de campaña

// acomodar los estilos del boton editar para que este encima de los div de informacion de campaña y usuario
// achicar las dimensiones del modal de edicion


const PerfilUsuario = () => {
    
    const { id,    userName,    name,    lastName,    email   } = useUser();
    const { setId, setUserName, setName, setLastName, setEmail} = useUser();
    const { idCamp,    nameCamp,    descripcion,    tipo,    objetivo,    recaudado,    fecha_inicio,   activo    } = useCampaña();
    const { setIdCamp, setNameCamp, setDescripcion, setTipo, setObjetivo, setRecaudado, setFechaInicio, setActivo } = useCampaña();
    const [ isOpen, setIsOpen ] = useState(false);
    const [ haveCampania, setHaveCampania ] = useState(false);


    const fetchCampaña = async () => { 
        try{
            const res = await fetch("http://localhost:3000/campanias", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                // acomodar esto
                body: JSON.stringify(1),
            });
            if (res.ok){
                const data = await res.json();
                // setIdCamp(data.id);
                // setNameCamp(data.name);
                // setDescripcion(data.descripcion);
                // setTipo(data.tipo);
                // setObjetivo(data.objetivo);
                // setRecaudado(data.recaudado);
                // setFechaInicio(data.fecha_inicio);
                // setActivo(data.activo);

                setHaveCampania(true);
            }else{
                throw new Error("ALgo salio mal xd");
            } 
        }catch(err){
            console.error("Error " + err );
        }
    }
    fetchCampaña();

    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState("usuario");
    const [modalOpen, setModalOpen] = useState(false);

    // const [formState, setFormState] = useState<Partial<Usuario & Campania>>({});


    // const donaciones = [
    //     { campaña: "Campaña1", monto: 100, fecha: "2023-10-01" },
    //     { campaña: "Campaña Solidaria", monto: 250, fecha: "2023-11-10" },
    //     { campaña: "Ayuda Animal", monto: 150, fecha: "2023-12-05" }
    // ];

    // const donacionesFiltradas = donaciones.filter(donacion =>donacion.campaña.toLowerCase().includes(query.toLowerCase()));


    // interface Campania {
    //     nombre: string;
    //     descripcion: string;
    //     tipo: string;
    //     total: string;
    // }

    // const [datosUsuario, setDatosUsuario] = useState({
    //     nombre: 'Nombre1234',
    //     apellido: 'Apellido1234',
    //     username: 'Usuario1234',
    //     email: 'Email1234@gmail.com',
    //     password: '********'
    // });

    // const [datosCampania, setDatosCampania] = useState({
    //     nombre: 'Campania1234',
    //     descripcion: 'Descripcion1234',
    //     tipo: 'Tipo1234',
    //     total: '12345'
    // });


    return (
        <div className="perfilUsuario">
            <div className="container1Usuario">
                <img 
                    src="https://t4.ftcdn.net/jpg/01/24/65/69/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg"
                    alt="LogoUsuario" 
                    className="fotoUsuario"
                />

                <div className='container2Usuario'>
                    <h2>{userName}</h2>
                    <p>{email}</p>
                </div>
            </div>

            <div className="navPerfil">
                <h2
                    className={activeTab === "usuario" ? "active" : ""}
                    onClick={() => setActiveTab("usuario")}>Perfil de Usuario
                </h2>

                <h2
                    className={activeTab === "campania" ? "active" : ""}
                    onClick={() => setActiveTab("campania")}>Perfil de Campaña
                </h2>
            </div>

            <div className='linea'></div>
            
            <div className="tabContent">

                <button className='botonEditar' onClick={() => {}}>
                    Editar
                </button>


                {activeTab === "usuario" && (
                    <div className='usuarioContent'>
                        <dl className='datosUsuario'>
                            <dt>Nombre:</dt>
                            <dd>{name}</dd>

                            <dt>Apellido:</dt>
                            <dd>{lastName}</dd>

                            <dt>Nombre de Usuario:</dt>
                            <dd>{userName}</dd>

                            <dt>Email:</dt>
                            <dd>{email}</dd>
                        </dl>
                    </div>
                )}

                {activeTab === "campania" && (
                    <div className='campaniaContent'>
                        {haveCampania ? 
                        <>
                            <dl className='datosCampania'>
                                <dt>Fecha de Creacion:</dt>
                                <dd>{fecha_inicio.getDate()}</dd>

                                <dt>Nombre:</dt>
                                <dd>{nameCamp}</dd>

                                <dt>Descripcion:</dt>
                                <dd>{descripcion}</dd>

                                <dt>Tipo</dt>
                                <dd>{tipo}</dd>

                                <dt>Objetivo:</dt>
                                <dd>{objetivo}</dd>

                                <dt>Recaudado:</dt>
                                <dd>{recaudado}</dd>
                            </dl> 
                        </>
                        :
                        <>  
                            <h1>No tienes una campaña</h1>
                            <h2>¿Deseas crear una campaña?</h2>
                            <button>Crear Campaña</button>
                        </> 
                        }  
                    </div>
                )}

            </div>

            {/* <div>
                <h2>Donaciones Hechas</h2>

                <input
                    type="text"
                    placeholder="Buscar donación..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <div className='donacionesRecibidas'>
                    {donacionesFiltradas.length > 0 ? (
                        donacionesFiltradas.map((donacion, index) => (
                            <div key={index} className='donacionesUsuario'>
                                <p><strong>Campaña:</strong> {donacion.campaña}</p>
                                <p><strong>Monto:</strong> ${donacion.monto}</p>
                                <p><strong>Fecha:</strong> {donacion.fecha}</p>
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron resultados.</p>
                    )}
                </div>
            </div> */}

            {/* {modalOpen && (
                <div className="modalOverlay">
                    <div className="modal">
                    <div className="modalHeader">
                        <h1>{activeTab === 'usuario' ? 'Editar Usuario' : 'Editar Campaña'}</h1>
                    </div>

                    {activeTab === 'usuario' ? (
                        <>
                        
                        </>
                    ) : (
                        <>
                        
                        </>
                    )}

                    <div className='modal-buttons'>
                        <button>Cancelar</button>
                    </div>
                </div>
            </div>
            )} */}

        </div>
    );
}

export default PerfilUsuario;
