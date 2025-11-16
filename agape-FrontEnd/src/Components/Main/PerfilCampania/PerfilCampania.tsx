import { useEffect, useState } from 'react';
import './PerfilCampania.css'
import { useNavigate, useParams } from "react-router-dom";
import { useCampaña } from '../../../Context/CampañaContext';

const PerfilCampania = () => {
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    const parsedRouteId = params.id ? parseInt(params.id, 10) : undefined;
    const routeId: number | undefined = typeof parsedRouteId === 'number' && !Number.isNaN(parsedRouteId)
    ? parsedRouteId : undefined;

    const { 
        idCamp   , nameCamp   , descripcion   , tipo   , objetivo   , recaudado   , fecha_inicio  , activo, ownerUsuario, ownerEmail,
        setIdCamp, setNameCamp, setDescripcion, setTipo, setObjetivo, setRecaudado, setFechaInicio, setActivo, setOwnerUsuario, setOwnerEmail
    } = useCampaña();

    useEffect(() => {
        const fetchCampaña = async (searchId: number) => { 
            try{
                const res = await fetch(`http://localhost:3000/campanias/` + searchId, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                if (res.ok){
                    const data = await res.json();
                    setActivo(data.activo);
                    setDescripcion(data.descripcion);
                    setFechaInicio(data.fecha_inicio);
                    setIdCamp(data.id_campania ?? data.id);
                    setNameCamp(data.nombre);
                    setObjetivo(data.objetivo);
                    setRecaudado(data.recaudado);
                    setTipo(data.tipo);
                    setOwnerUsuario(data.usuario.nombre);
                    setOwnerEmail(data.usuario.email);

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

    
    return (
        <div className="perfil-campania">
            <div className='barra-overlay'>
                <div className='barra-content'>

                    <div className='barra-porcentaje'>

                        <div className='barra'>
                            <div className='progress' style={{ width: `${recaudadoPorcentaje}%` }}>{Math.round(recaudadoPorcentaje)}%</div>
                        </div>

                        <div className='info'>
                            <p>Recaudado: ${recaudado} </p>
                            <p>Objetivo: ${objetivo} </p>
                        </div>

                    </div>

                    <button onClick={()=>navigate("/donar")}>Donar</button>

                </div>
            </div>
            

            <div className='conteiner-donaciones'>  
                <div className='lista-boton'>
                    <h3>Ultimas Donaciones</h3>
                </div>
                <div className='lista-donadores'>
                    <p>nombreUsuario | fecha | monto</p>
                    <p>nombreUsuario | fecha | monto</p>
                    <p>nombreUsuario | fecha | monto</p>
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
};

export default PerfilCampania;