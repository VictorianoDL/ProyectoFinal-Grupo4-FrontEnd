import './App.css'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './Components/Main/Main'

import { UserProvider, useUser } from "./Context/UserContext";
import { CampañaProvider, useCampaña } from "./Context/CampañaContext"; 
import { useEffect } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './Components/Main/Home/Home'
import Campanias from './Components/Main/Campanias/Campanias'
import Contacto from './Components/Main/Contacto/Contacto'
import PerfilCampania from './Components/Main/PerfilCampania/PerfilCampania'
import Donar from './Components/Main/Donar/Donar'
import PerfilUsuario from './Components/Main/PerfilUsuario/PerfilUsuario'

function AppInner() {
    const { setId , setUserName, setName, setLastName, setEmail, setAccessToken } = useUser();
    
    useEffect(() => {
        const tryRefresh = async () => {
            try {
                const res = await fetch("/auth/refresh", {
                    method: "POST",
                    credentials: "include",
                });
                if (res.ok) {
                    const data = await res.json();
                    setAccessToken(data.access_token);

                    try {
                        
                        const userRes = await fetch("/auth/me", {
                            method: "GET",
                            headers: {
                                'Authorization': `Bearer ${data.access_token}`,
                                'Content-Type': 'application/json'
                            },
                            credentials: 'include'
                        });
                        
                        if (userRes.ok) {
                            const userData = await userRes.json();
                            setId(userData.id_Usuario);
                            setUserName(userData.nombreUsuario);
                            setName(userData.nombre);
                            setLastName(userData.apellido);
                            setEmail(userData.email);

                        }else {
                            setAccessToken(null);
                        }
                    } catch (err) {
                        console.error("Error al obtener datos del usuario:", err);
                    }
            
                } else {
                    setAccessToken(null);
                }
            } catch (err) {
                setAccessToken(null);
            }
        };
        tryRefresh();
    }, [setAccessToken]);

    return (
        <>
            <Header />
            <Main />
            <Footer /> 
        </>
    );
}

function App() {
    return (
        <>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
                <UserProvider>
                    <CampañaProvider>
                        <BrowserRouter>
                            <AppInner />
                        </BrowserRouter>
                    </CampañaProvider>
                </UserProvider>
            </GoogleOAuthProvider>
        </>
    )
}

export default App
