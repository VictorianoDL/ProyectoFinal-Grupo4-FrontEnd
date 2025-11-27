import { useCampaña } from '../../../Context/CampañaContext';
import { useEffect, useState } from 'react';

const urlBack = import.meta.env.VITE_URL_BACKEND;

const UltimasDons = () => {
    const { 
        idCamp
    } = useCampaña();

    let [dataDonaciones, setDataDonaciones] = useState<any[]>([]);

    useEffect (() => {
        const fetchDonaciones = async () => {
            const resDonaciones = await fetch(urlBack+"/donaciones/campania/" + idCamp, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            if (resDonaciones.ok) {
                const dataDonaciones = await resDonaciones.json();
                setDataDonaciones(dataDonaciones);
            }
        };
        fetchDonaciones();
    }, [idCamp]);
    

    return(
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
                    {dataDonaciones.length === 0 ? (
                        <tr><td colSpan={4}>No hay donaciones aún...</td></tr>
                    ) : (
                        dataDonaciones.map((donacion: any) => (
                            <tr key={donacion.id_donacion}>
                                <td>{donacion.usuario.nombre}</td>
                                <td>{new Date(donacion.fecha).toLocaleDateString()}</td>
                                <td>${donacion.monto}</td>
                                <td>{donacion.usuario.email}</td>
                            </tr>
                        ))
                    )}
                </tbody>      
            </table>
        </div>
    )
};

export default UltimasDons;