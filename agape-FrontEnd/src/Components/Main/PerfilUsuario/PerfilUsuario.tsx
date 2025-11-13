import { useEffect, useState } from 'react';
import { useUser } from "../../../Context/UserContext";
import { useCampaña } from '../../../Context/CampañaContext';
import './PerfilUsuario.css'


// fetch para traer donaciones de un usuario

// fetch y post para actualizar datos de campaña

// acomodar cuando se toca en "Perfil de campaña", se ve por unos segundos que no hay ninguna campaña y se puede tocar el boton crear campaña


const PerfilUsuario = () => {
    const [query, setQuery] = useState('');
    
    const { id,    userName,    name,    lastName,    email   , accessToken, profilePic} = useUser();
    const { setId, setUserName, setName, setLastName, setEmail } = useUser();
    const { idCamp,    nameCamp,    descripcion,    tipo,    objetivo,    recaudado,    fecha_inicio,   activo    } = useCampaña();
    const { setIdCamp, setNameCamp, setDescripcion, setTipo, setObjetivo, setRecaudado, setFechaInicio, setActivo } = useCampaña();
    const [ haveCampania, setHaveCampania ] = useState(false);

    const [ isOpenModal, setIsOpenModal ] = useState(false);
    const [ isEditing, setIsEditing ] = useState(false);
  
    const [activeTab, setActiveTab] = useState("usuario");

    useEffect(() => {
        if (activeTab === "campania") {
            const fetchCampaña = async () => {
                try {
                    const res = await fetch(`http://localhost:3000/campanias/owner/` + id, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" }
                    });
                    if (res.ok){
                        const data = await res.json();
                        setActivo(data.activo);
                        setDescripcion(data.descripcion);
                        setFechaInicio(data.fecha_inicio);
                        setIdCamp(data.id_campania);
                        setNameCamp(data.nombre);
                        setObjetivo(data.objetivo);
                        setRecaudado(data.recaudado);
                        setTipo(data.tipo);
                        
                        setHaveCampania(true);
                    }else{
                        throw new Error("No se encontro ninguna campaña, osea la respuesta del fetch campaña fue no ok");
                    } 
                }catch(err){
                    console.log("Error: " + err );
                }
            }
            fetchCampaña();
        }
    });

    // fetch donaciones hechas por el usuario

    const createCampaña = async () => {
        try{
            const res = await fetch("http://localhost:3000/campanias", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
                credentials: 'include'
                },
                body: JSON.stringify({
                    nombre: (document.getElementById("name") as HTMLInputElement).value,
                    descripcion: (document.getElementById("descripcion") as HTMLInputElement).value,
                    tipo: (document.getElementById("tipo") as HTMLInputElement).value,
                    objetivo: Number((document.getElementById("objetivo") as HTMLInputElement).value),
                    recaudado: 0,
                    fecha_inicio: new Date(),
                    activo: true
                })
            });
            if (res.ok){
                const data = await res.json();

                setActivo(data.activo);
                setDescripcion(data.descripcion);
                // setFechaInicio(data.fecha_inicio);
                setIdCamp(data.id_campania);
                setNameCamp(data.nombre);
                setObjetivo(data.objetivo);
                setRecaudado(data.recaudado);
                setTipo(data.tipo);

                document.getElementById("aviso")!.innerText = "Campaña creada con exito";
                setHaveCampania(true);
                setIsOpenModal(false);
            }else{
                throw new Error("ALgo salio mal xd " + res.statusText);
            }    
        }catch(err){
            document.getElementById("aviso")!.innerText = "Error al crear campaña: " + err;
        }
    };            
            
    const updateUsuario = async () => {
        try{
            const body = {
                nombre: (document.getElementById("name") as HTMLInputElement).value,
                apellido: (document.getElementById("lastName") as HTMLInputElement).value,
                nombreUsuario: (document.getElementById("userName") as HTMLInputElement).value,
                email: (document.getElementById("email") as HTMLInputElement).value
            };
            if(body.nombre === "" || body.apellido === "" || body.nombreUsuario === "" || body.email === ""){
                throw new Error("Por favor complete todos los campos. Si no desea cambiar un campo, deje el mismo valor.");
            }
            if(body.nombre === name && body.apellido === lastName && body.nombreUsuario === userName && body.email === email){
                throw new Error("Los datos son iguales a los anteriores, no hay nada para actualizar.");        
            }

            const res = await fetch("http://localhost:3000/usuarios/" + id, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
                credentials: 'include'
                },
                body: JSON.stringify({...body})
            });
            if (res.ok){
                setIsOpenModal(false);
            }else{
                throw new Error("No se pudo actualizar el usuario: " + res.statusText);
            }
        }catch(err){
            document.getElementById("aviso")!.innerText = "Error al actualizar usuario: " + err;
        }
    };

    const updateCampaña = async () => {

    };

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
                    src={profilePic ?? "https://t4.ftcdn.net/jpg/01/24/65/69/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg"}
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

                {haveCampania ? 
                <button className='botonEditar' onClick={() => { setIsEditing(true); setIsOpenModal(true); }}>Editar informacion</button>
                : 
                <>
                    {activeTab === "usuario" ?
                    <button className='botonEditar' onClick={() => { setIsEditing(true); setIsOpenModal(true); }}>Editar informacion</button>
                    :
                    <></>}
                </>}
                
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
                                <dd>{fecha_inicio.toString()}</dd>

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
                            <button onClick={()=>setIsOpenModal(true)}>Crear Campaña</button>
                        </> 
                        }  
                    </div>
                )}

            </div>
            
            {/* Modal de Editar y crear */}
            {isOpenModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <form className="modal-form">
                            {isEditing ? 
                            <>
                                <h2> Editar {activeTab === "usuario" ? "Usuario" : "Campaña"} </h2>
                                {activeTab === "usuario" ?
                                <>  
                                    <label id='label-group'>
                                        <span>{name}</span>
                                        <input id="name" type="text" placeholder="Nombre" defaultValue={name} />
                                    </label>
                                    <label id='label-group'>
                                        <span>{lastName}</span>
                                        <input id="lastName" type="text" placeholder="Apellido" defaultValue={lastName} />
                                    </label>
                                    <label id='label-group'>
                                        <span>{userName}</span>
                                        <input id="userName" type="text" placeholder="Nombre de Usuario" defaultValue={userName} />
                                    </label>
                                    <label id='label-group'>
                                        <span>{email}</span>
                                        <input id="email" type="email" placeholder="Email" defaultValue={email} />
                                    </label>    
                                </>
                                :
                                <>
                                    <label id='label-group'>
                                        <span>{nameCamp}</span>
                                        <input id="name" type="text" placeholder="Nombre de la Campaña" defaultValue={nameCamp} />
                                    </label>
                                    <label id='label-group'>
                                        <span>{tipo}</span>
                                        <input id="tipo" type="text" placeholder="Tipo" defaultValue={tipo} />
                                    </label>
                                    <label id='label-group'>
                                        <span>{objetivo}</span>
                                        <input id="objetivo" type="number" placeholder="Objetivo" defaultValue={objetivo} />
                                    </label>
                                    <textarea id="descripcion" name="descripcion" required defaultValue={descripcion} />
                                </>}  
                            </>       
                            : 
                            <>
                                <h2>Crear Campaña</h2>
                                <input id="name" type="text" placeholder="Nombre de la Campaña" />
                                <input id="tipo" type="text" placeholder="Tipo" />
                                <input id="objetivo" type="number" placeholder="Objetivo" />
                                <textarea id="descripcion" name="descripcion" required />                                
                            </> 
                            }   
                        </form>
                        <p id="aviso"></p>
                        <div className='modal-buttons'>
                            {isEditing ? 
                            <>
                                <button onClick={() => {updateUsuario()}}>Guardar Cambios</button>
                            </>  
                            : 
                            <>
                                <button onClick={() => {createCampaña()}}>Crear Campaña</button>
                            </>
                            }
                            <button onClick={()=>{ setIsEditing(false); setIsOpenModal(false); }}>Cancelar</button>
                        </div>
                        
                    </div>
                </div>
            )}

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

        </div>
    );
}

export default PerfilUsuario;
