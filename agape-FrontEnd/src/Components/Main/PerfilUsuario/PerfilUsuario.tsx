import { useState } from 'react';
import './PerfilUsuario.css'

const PerfilUsuario = () => {
    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState("usuario");
    const [modalOpen, setModalOpen] = useState(false);
    const [formState, setFormState] = useState<Partial<Usuario & Campania>>({});

    const donaciones = [
        { campaña: "Campaña1", monto: 100, fecha: "2023-10-01" },
        { campaña: "Campaña Solidaria", monto: 250, fecha: "2023-11-10" },
        { campaña: "Ayuda Animal", monto: 150, fecha: "2023-12-05" }
    ];

    const donacionesFiltradas = donaciones.filter(donacion =>donacion.campaña.toLowerCase().includes(query.toLowerCase()));

    interface Usuario {
        nombre: string;
        apellido: string;
        username: string;
        email: string;
        password: string;
    }

    interface Campania {
        nombre: string;
        descripcion: string;
        tipo: string;
        total: string;
    }

    const [datosUsuario, setDatosUsuario] = useState({
        nombre: 'Nombre1234',
        apellido: 'Apellido1234',
        username: 'Usuario1234',
        email: 'Email1234@gmail.com',
        password: '********'
    });

    const [datosCampania, setDatosCampania] = useState({
        nombre: 'Campania1234',
        descripcion: 'Descripcion1234',
        tipo: 'Tipo1234',
        total: '12345'
    });



    function closeModal() {
        setModalOpen(false);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    }

    function handleSave() {
        if (activeTab === 'usuario') setDatosUsuario({ ...(formState as Usuario) });
        else setDatosCampania({ ...(formState as Campania) });
        setModalOpen(false);
    }






    return (
        <div>
            <div className="container1Usuario">
                <img 
                    src="https://t4.ftcdn.net/jpg/01/24/65/69/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg"
                    alt="LogoUsuario" 
                    className="fotoUsuario"
                />

                <div className='container2Usuario'>
                    <h2>Usuario1234</h2>
                    <p>example@gmail.com</p>
                </div>
                
                <button
                    className='botonEditar'
                    onClick={() => {
                        if (activeTab === 'usuario') setFormState({ ...datosUsuario });
                        else setFormState({ ...datosCampania });
                        setModalOpen(true);
                    }}
                >Editar
                </button>

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
                {activeTab === "usuario" && (

                <div className='usuarioContent'>
                    <dl className='datosUsuario'>
                        <dt>Nombre:</dt>
                        <dd>Nombre1234</dd>

                        <dt>Apellido:</dt>
                        <dd>Apellido1234</dd>

                        <dt>Nombre de Usuario</dt>
                        <dd>Usuario1234</dd>

                        <dt>Email:</dt>
                        <dd>Email1234@gmail.com</dd>

                        <dt>Contraseña:</dt>
                        <dd>********</dd>
                    </dl>
                
                    
                </div>
                )}

            
                {activeTab === "campania" && (

                <div className='campaniaContent'>
                    <dl className='datosCampania'>
                        <dt>Nombre:</dt>
                        <dd>Campania1234</dd>

                        <dt>Descripcion:</dt>
                        <dd>Descripcion1234</dd>

                        <dt>Tipo</dt>
                        <dd>Tipo1234</dd>

                        <dt>Total a Recaudar:</dt>
                        <dd>12345</dd>

                        <dt>Fecha de Creacion:</dt>
                        <dd>12-34-56</dd>
                    </dl> 
                </div>
                )}
            </div>

            <div>
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
            </div>

            {modalOpen && (
                <div className="modalOverlay">
                    <div className="modal">
                    <div className="modalHeader">
                        <h1>{activeTab === 'usuario' ? 'Editar Usuario' : 'Editar Campaña'}</h1>
                    </div>

                    {activeTab === 'usuario' ? (
                        <>
                        <div>
                            <label>Nombre</label>
                            <input name="nombre" value={formState.nombre || ''} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Apellido</label>
                            <input name="apellido" value={formState.apellido || ''} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Nombre de usuario</label>
                            <input name="username" value={formState.username || ''} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Email</label>
                            <input name="email" value={formState.email || ''} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Contraseña</label>
                            <input name="password" value={formState.password || ''} onChange={handleChange} />
                        </div>
                        </>
                    ) : (
                        <>
                        <div>
                            <label>Nombre</label>
                            <input name="nombre" value={formState.nombre || ''} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Descripción</label>
                            <textarea className='inputDesc' name="descripcion" value={formState.descripcion || ''} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Tipo</label>
                            <input name="tipo" value={formState.tipo || ''} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Total a recaudar</label>
                            <input name="total" value={formState.total || ''} onChange={handleChange} />
                        </div>
                        </>
                    )}

                    <div className='modal-buttons'>
                        <button onClick={handleSave}>Guardar</button>
                        <button onClick={closeModal}>Cancelar</button>
                    </div>
                </div>
            </div>
            )}

        </div>
    );
}

export default PerfilUsuario;
