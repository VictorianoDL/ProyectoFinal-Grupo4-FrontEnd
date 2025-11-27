import { useEffect, useState } from 'react';
import './PerfilCampania.css'
import { useNavigate, useParams } from "react-router-dom";
import { useCampaña } from '../../../Context/CampañaContext';
import UltimasDons from './UltimasDons';
import { useUser } from '../../../Context/UserContext';

const urlBack = import.meta.env.VITE_URL_BACKEND;

const PerfilCampania = () => {
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    const parsedRouteId = params.id ? parseInt(params.id, 10) : undefined;
    const routeId: number | undefined = typeof parsedRouteId === 'number' && !Number.isNaN(parsedRouteId) ? parsedRouteId : undefined;
    const [ loadingCampania, setLoadingCampania] = useState(true);

    const {
        id
    } = useUser();
    const { 
        idCamp   , nameCamp   , descripcion   , tipo   , objetivo   , recaudado   ,  ownerUsuario, ownerEmail, ownerId,
        setIdCamp, setNameCamp, setDescripcion, setTipo, setObjetivo, setRecaudado, setFechaInicio, setActivo, setOwnerUsuario, setOwnerEmail, setOwnerId
    } = useCampaña();

    useEffect(() => {
        const fetchCampaña = async (searchId: number) => { 
            try{
                const res = await fetch(urlBack+"/campanias/" + searchId, {
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

                    setOwnerId(data.usuario.id_Usuario);
                    setOwnerUsuario(data.usuario.nombre);
                    setOwnerEmail(data.usuario.email);

                    setLoadingCampania(false);
                }else{
                    // si no existe la campaña, redirigir a la ruta 404 (la ruta "*" en Main)
                    navigate('/404', { replace: true });
                } 
            }catch(err){
                // en caso de error de red también redirigir a 404
                console.log("Error: " + err );
                navigate('/404', { replace: true });
            }
        };

       const idToFetch =
            routeId !== undefined
                ? routeId
                : (typeof idCamp === 'number' && !Number.isNaN(idCamp) ? idCamp : undefined);

        if (typeof idToFetch === 'number') {
            fetchCampaña(idToFetch);
        }
    }, [routeId, idCamp, setActivo, setDescripcion, setFechaInicio, setIdCamp, setNameCamp, setObjetivo, setRecaudado, setTipo]);


    const recaudadoPorcentaje = (recaudado / objetivo) * 100;


    if(loadingCampania){
        return(
            <div className="perfil-campania">
                <div className='barra-overlay'>
                    <div className='barra-content'>

                        <div className='barra-porcentaje'>

                            <div className='barra'>
                                <div className='progress'>NaN</div>
                            </div>

                            <div className='info'>
                                <p>Recaudado: --- </p>
                                <p>Objetivo: --- </p>
                            </div>

                        </div>

                    </div>
                </div>

                <div className='conteiner-donaciones'>  
                    <div className='lista-boton'>
                        <h3>Ultimas Donaciones</h3>
                    </div>
                    <div className='lista-donadores'>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr id='tr-header'>
                                        <th>Donante</th>
                                        <th>Fecha</th>
                                        <th>Monto</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td colSpan={4}>Cargando...</td></tr>
                                </tbody>
                            </table>
                        </div>   
                    </div>
                </div>
    
                <div className='conteiner-informacion'>
                    <h3>Dueño: -- </h3>
                    <h1>Cargando Datos...</h1>
                    <p>Tipo: ---</p>
                    <p> Descripcion </p>
                </div>
            </div>
        )
    }else{
         return (
            <div className="perfil-campania">
                <div className='barra-overlay'>
                    <div className='barra-content'>

                        <div className='barra-porcentaje'>

                            <div className='barra'>
                                <div className='progress' style={{ width: `${
                                    (recaudadoPorcentaje <= 100) ? recaudadoPorcentaje : 100
                                }%` }}>{Math.round(recaudadoPorcentaje)}%</div>
                            </div>

                            <div className='info'>
                                <p>Recaudado: ${recaudado} </p>
                                <p>Objetivo: ${objetivo} </p>
                            </div>

                        </div>
                        

                        <button onClick={()=>{
                            if ((ownerId === 0) || (ownerId !== id)) {
                                navigate("/donar")
                            }else{
                                alert("No puedes donar a tu propia campaña")
                            }
                        }    
                        }>Donar</button>

                    </div>
                </div>
                
                <div className='conteiner-donaciones'>  
                    <div className='lista-boton'>
                        <h3>Ultimas Donaciones</h3>
                    </div>
                    <div className='lista-donadores'>
                        <UltimasDons />    
                    </div>
                </div>
    
                <div className='conteiner-informacion'>
                    <h3>Dueño: {ownerEmail}</h3>
                    <h1>{nameCamp}</h1>
                    <p>Tipo: {tipo}</p>
                    <p>{descripcion}</p>
                </div>

            </div>
        );
    }
   
};

export default PerfilCampania;