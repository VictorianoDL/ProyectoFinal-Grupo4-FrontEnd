import { useEffect, useState } from 'react';
import { useUser } from "../../../Context/UserContext";
import { useCampaña } from '../../../Context/CampañaContext';
import './PerfilUsuario.css'
import { useNavigate } from 'react-router-dom';

const urlBack = import.meta.env.VITE_URL_BACKEND;

const PerfilUsuario = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const { id,    userName,    name,    lastName,    email   , accessToken, profilePic} = useUser();
    const { idCamp,    nameCamp,    descripcion,    tipo,    objetivo,    recaudado,    fecha_inicio} = useCampaña();
    const { setIdCamp, setNameCamp, setDescripcion, setTipo, setObjetivo, setRecaudado, setFechaInicio, setActivo } = useCampaña();
    const [ loadingCampania, setLoadingCampania] = useState(true);
    const [ haveCampania, setHaveCampania ] = useState(false);

    const [ isOpenModal, setIsOpenModal ] = useState(false);
    const [ isEditing, setIsEditing ] = useState(false);
  
    const [activeTab, setActiveTab] = useState("usuario");

    useEffect(() => {
        if (activeTab === "campania") {
            const fetchCampaña = async () => {
                try {
                    const res = await fetch(urlBack+"/campanias/owner/" + id, {
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
                        
                        setLoadingCampania(false);
                        setHaveCampania(true);
                    }else{
                        setLoadingCampania(false);
                        throw new Error("No se encontro ninguna campaña");
                    } 
                }catch(err){
                    console.log("Error: " + err );
                }
            }
            fetchCampaña();
        }
    });

    let [dataDonaciones, setDataDonaciones] = useState<any[]>([]);

    useEffect (() => {
        const fetchDonaciones = async () => {
            const resDonaciones = await fetch(urlBack+"/donaciones/usuario/"+ id, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            if (resDonaciones.ok) {
                const dataDonaciones = await resDonaciones.json();
                console.log(dataDonaciones);
                setDataDonaciones(dataDonaciones);
            }
        };
        fetchDonaciones();
    }, [id]);

    const createCampaña = async () => {
        try{
            const res = await fetch(urlBack+"/campanias", {
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

            const res = await fetch(urlBack+"/usuarios/" + id, {
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
        try{
            const body = {
                nombre: (document.getElementById("name") as HTMLInputElement).value,
                tipo: (document.getElementById("tipo") as HTMLInputElement).value,
                objetivo: Number((document.getElementById("objetivo") as HTMLInputElement).value),
                descripcion: (document.getElementById("descripcion") as HTMLInputElement).value
            };
            if(body.nombre === "" || body.tipo === "" || body.objetivo === null || body.descripcion === ""){
                throw new Error("Por favor complete todos los campos. Si no desea cambiar un campo, deje el mismo valor.");
            }
            if(body.nombre === nameCamp && body.tipo === tipo && body.objetivo === objetivo && body.descripcion === descripcion){
                throw new Error("Los datos son iguales a los anteriores, no hay nada para actualizar.");        
            }

            const res = await fetch(urlBack+"/campanias/" + idCamp, {
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
                throw new Error("No se pudo actualizar la campaña: " + res.statusText);
            }
        }catch(err){
            document.getElementById("aviso")!.innerText = "Error al actualizar datos de campaña: " + err;
        }
    };

    const donacionesFiltradas = dataDonaciones.filter(donacion =>donacion.campania.nombre.toLowerCase().includes(query.toLowerCase()));

    const imagen = "./imagenes/img-perfil-usuario.png";

    return (
        <div className="perfilUsuario">
            <div className="headerUsuario">
                <img 
                    src={profilePic ?? "https://t4.ftcdn.net/jpg/01/24/65/69/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg"}
                    alt="LogoUsuario" 
                    className="fotoUsuario"
                />

                <div className='headerNombre'>
                    <h1>{userName}</h1>
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
                    <div className='conteinerContent'>
                        <dl className='datosContent'>
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
                    <div className='conteinerContent'>
                        {loadingCampania ?
                            <>
                                <div id="cargando">Cargando...</div>
                            </>
                            :
                            <>
                                {haveCampania ? 
                                <>
                                    <dl className='datosContent'>
                                        <dt>Fecha de Creacion:</dt>
                                        <dd>{new Date(fecha_inicio).toLocaleDateString()}</dd>

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
                                    <button onClick={() => navigate("/perfil-campania/"+idCamp)}>Ir a Mi Campaña</button>
                                </>
                                :
                                <div id='sinCampaña'>  
                                    <h1>No tienes una campaña</h1>
                                    <h2>¿Deseas crear una campaña?</h2>
                                    <button onClick={()=>setIsOpenModal(true)}>Crear Campaña</button>  
                                </div> 
                                } 
                            </>
                        }
                    </div>
                )}

            </div>
            
            {/* Modal de Editar y crear */}
            {isOpenModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <form className="modal-form modalEditar">
                            {isEditing ? 
                            <>
                                <h2> Editar {activeTab === "usuario" ? "Usuario" : "Campaña"} </h2>
                                {activeTab === "usuario" ?
                                <>  
                                    <label id='label-group'>
                                        <p>Nombre</p>
                                        <span>{name}</span>
                                        <input id="name" type="text" placeholder="Nombre" defaultValue={name} />
                                    </label>

                                    
                                    <label id='label-group'>
                                        <p>Apellido</p>
                                        <span>{lastName}</span>
                                        <input id="lastName" type="text" placeholder="Apellido" defaultValue={lastName} />
                                    </label>
                                    
                                    <label id='label-group'>
                                        <p>Nombre de Usuario</p>
                                        <span>{userName}</span>
                                        <input id="userName" type="text" placeholder="Nombre de Usuario" defaultValue={userName} />
                                    </label>
                                    
                                    <label id='label-group'>
                                        <p>Email</p>
                                        <span>{email}</span>
                                        <input id="email" type="email" placeholder="Email" defaultValue={email} />
                                    </label>    
                                </>
                                :
                                <>
                                    <label id='label-group'>
                                        <p>Nombre Campaña</p>
                                        <span>{nameCamp}</span>
                                        <input id="name" type="text" placeholder="Nombre de la Campaña" defaultValue={nameCamp} />
                                    </label>
                                    <label id='label-group'>
                                        <p>Tipo</p>
                                        <span>{tipo}</span>
                                        <input id="tipo" type="text" placeholder="Tipo" defaultValue={tipo} />
                                    </label>
                                    <label id='label-group'>
                                        <p>Objetivo</p>
                                        <span>{objetivo}</span>
                                        <input id="objetivo" type="number" placeholder="Objetivo" defaultValue={objetivo} />
                                    </label>
                                    <label id='label-group'>
                                        <p>Descripcion</p>
                                        <textarea id="descripcion" name="descripcion" required defaultValue={descripcion} />
                                    </label>
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
                                {activeTab === "campania" ?
                                <button onClick={() => {updateCampaña()}}>Guardar Cambios</button>
                                :
                                <button onClick={() => {updateUsuario()}}>Guardar Cambios</button>}
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

            <div id='donaciones-conteiner'>
                <div className='conteinerH2-Input'>
                    <h2>Donaciones Realizadas</h2>
                    <input
                        type="text"
                        placeholder="Buscar donación por nombre..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr id='tr-header'>
                                <th>Nom. Campaña</th>
                                <th>Fecha</th>
                                <th>Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataDonaciones.length > 0 ? (
                                (donacionesFiltradas.length === 0 ?
                                    <>
                                    <tr><td colSpan={4}>No se encontro ninguna donacion.</td></tr> 
                                    </>
                                    :
                                    (donacionesFiltradas.map((donacion: any) => (
                                        <tr>
                                            <td>{donacion.campania.nombre}</td>
                                            <td>{new Date(donacion.fecha).toLocaleDateString()}</td>
                                            <td>${donacion.monto}</td>
                                        </tr>
                                    )))   
                                )                                   
                            ) : (
                                <tr><td colSpan={4}>No hay donaciones aún.</td></tr>
                            )}
                        </tbody>    
                            
                    </table>
                </div>
            </div>

        </div>
    );
}

export default PerfilUsuario;
