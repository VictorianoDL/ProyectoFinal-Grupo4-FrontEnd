import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";


const ComponentLogoPerfil = () => {  
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const { setId , userName, setUserName, name, setName, setLastName, setEmail, setAccessToken, accessToken, profilePic, setProfilePic } = useUser();

    useEffect(() => { setIsLogged(!!accessToken); }, [accessToken]);

    const imagenClick = () => {
        if (isLogged) {
            navigate("/usuario");
        } else {
            setIsOpen(true);
        }
    };

    const Ingresar = async () => {
        let contraseniaName = document.getElementById("contraseniaUser") as HTMLInputElement;
        let userEmail = document.getElementById("emailUser") as HTMLInputElement;

        if(!isRegister){
            // logearse
            try {
                const res = await fetch("/auth/login", {
                    method: "POST",
                    credentials: 'include',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: userEmail.value, contraseña: contraseniaName.value }),
                });

                
                if (res.ok){
                    const data = await res.json();

                    // guardar access_token en contexto para usar en futuras peticiones
                    if (data.access_token) {
                        setAccessToken(data.access_token);
                    }

                    // si backend devuelve foto, guardarla en contexto (persistirá)
                    if (data.user?.picture) setProfilePic(data.user.picture);

                    setId(data.user.id);
                    setUserName(data.user.nombreUsuario);
                    setName(data.user.nombre);
                    setLastName(data.user.apellido);
                    setEmail(data.user.email);

                    setIsLogged(true);
                    setIsOpen(false);

                }else{
                    throw new Error("Credenciales inválidas");
                } 

            } catch (err) {
                let p = document.getElementById("aviso") as HTMLParagraphElement;
                p.innerText = "Error al iniciar sesión  " + err;
                console.error("Error al iniciar sesión  " + err );
            }  
        }else{
            // registrarse
            let userNameTag = document.getElementById("TagUser") as HTMLInputElement;
            let userName = document.getElementById("nameUser") as HTMLInputElement;
            let userLastName = document.getElementById("lastNmaeUser") as HTMLInputElement;
            try {

                let body = {
                    nombreUsuario:userNameTag.value,
                    nombre: userName.value,
                    apellido: userLastName.value,
                    email:userEmail.value,
                    contraseña:contraseniaName.value
                }

                const res = await fetch("/auth/register", {
                    method: "POST",
                    credentials: 'include',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });

                if (res.ok){

                    setUserName(userNameTag.value);
                    setName(userName.value);
                    setLastName(userLastName.value);
                    setEmail(userEmail.value);

                    setIsLogged(true);
                    setIsRegister(false);
                    setIsOpen(false);

                } else {
                    throw new Error("El usuario ya esta registrado");
                } 
            } catch (err) {
                let p = document.getElementById("aviso") as HTMLParagraphElement;
                p.innerText = "Error al registrarse  " + err;
                console.error("Error al registrarse  " + err );
            } 
        }  
    };

    const handleGoogleSuccess = async (credentialResponse: any) => {
        const credential = credentialResponse?.credential || credentialResponse?.access_token;
        if (!credential) return;

        const parseJwt = (token: string | undefined | null) => {
            try {
                if (!token) return null;
                const base64Url = token.split('.')[1];
                if (!base64Url) return null;
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(
                    atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
                );
                return JSON.parse(jsonPayload);
            } catch {
                return null;
            }
        };

        const payload = parseJwt(credential);
        console.log("Decoded payload:", payload);

        if (payload?.picture) {
            setProfilePic(payload.picture);
        }

        if (!payload?.picture && credentialResponse?.access_token) {
            try {
                const userinfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: { Authorization: `Bearer ${credentialResponse.access_token}` },
                });
                if (userinfoRes.ok) {
                    const profile = await userinfoRes.json();
                    console.log("userinfo profile:", profile);
                    if (profile.picture) {
                        setProfilePic(profile.picture);
                    }
                } else {
                    console.warn("userinfo fetch failed:", await userinfoRes.text());
                }
            } catch (err) {
                console.error("Error fetching userinfo:", err);
            }
        }

        try {
            const res = await fetch("/auth/google", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ credential }),
            });

            if (!res.ok) throw new Error(await res.text());

            const body = await res.json();

            if (body.access_token) setAccessToken(body.access_token);

            if (body.user) {
                if (body.user.picture) {
                    setProfilePic(body.user.picture);
                }
                setId(body.user.id);
                setUserName(body.user.nombreUsuario);
                setName(body.user.nombre);
                setLastName(body.user.apellido);
                setEmail(body.user.email);

                setIsLogged(true);
                setIsRegister(false);
                setIsOpen(false);
            }
        } catch (err) {
            console.error("Google login error:", err);
        }
    };

    const DesLoguearse = async () => {
        try{
            const res = await fetch("/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            if(res.ok){
                setId(0);
                setUserName("Invitado");
                setName("Name");
                setLastName("Last Name");
                setEmail("ejemplo@email.com");
                setAccessToken(null);
                setProfilePic(null);
                setIsLogged(false);
                setIsOpen(false);
                window.location.replace("/");
            }
        }catch{
            throw new Error("hubo un error al desloguearse");
        }   
    }

    return (
        <div className="ComponentLogo-Perfil">
            <div className="conteinerImg">
                <div>
                    {isLogged ?
                    <>
                        <h1>{userName}</h1>
                        <a onClick={()=>setIsOpen(true)}>Cerrar sesion</a>
                    </> 
                    : 
                    <h2>Iniciar Sesión</h2>}                   
                </div>
                <img
                    src={isLogged && profilePic ? profilePic : "https://t4.ftcdn.net/jpg/01/24/65/69/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg"}
                    alt="Logo"
                    onClick={imagenClick}
                    style={{ cursor: "pointer" }}
                />
            </div>

            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div>
                            <img src="../Logos/Agape - Logo AZUL Completo.png" alt="Logo" />
                        </div>
                        <form className="modal-form" >
                            {
                                isLogged ? 
                                <>
                                    <h1>{name}</h1>
                                    <h2>Estas a punto de cerrar sesion</h2>
                                    <h2>¿De verdad quieres hacerlo?</h2>
                                    <div className="modal-buttons">
                                        <button type="button" onClick={() => DesLoguearse()}>
                                            Si
                                        </button>
                                        <button type="button" onClick={() => setIsOpen(false)}>
                                            No
                                        </button>
                                    </div>
                                </>
                                :
                                <>
                                    {!isRegister ? 
                                    <>
                                        <input id="emailUser" type="email" placeholder="Email" />
                                        <input id="contraseniaUser" type="text" placeholder="Contraseña" autoComplete="off"/>
                                        <p id="aviso"></p>
 
                                        <div className="modal-buttons">
                                            <button type="button" onClick={() => Ingresar()}>
                                                Ingresar
                                            </button>

                                            <button type="button" onClick={() => setIsOpen(false)}>
                                                Cerrar
                                            </button>
                                        </div>

                                        <button onClick={() => setIsRegister(true)} className="btnRegister">Registrarse</button>

                                        
                                        <GoogleLogin
                                            onSuccess={(credentialResponse) => {
                                                handleGoogleSuccess(credentialResponse);
                                            }}
                                            onError={() => console.error('GoogleLogin error')} 
                                        />
                                    </>
                                    :
                                    <>                                      
                                        <input id="TagUser" type="text" placeholder="Nombre de usuario" />
                                        <input id="nameUser" type="text" placeholder="Nombre" />
                                        <input id="lastNmaeUser" type="text" placeholder="Apellido" />
                                        <input id="emailUser" type="email" placeholder="Email" />
                                        <input id="contraseniaUser" type="password" placeholder="Contraseña" /> 
                                        <p id="aviso"></p>

                                        <div className="modal-buttons">
                                            <button type="button" onClick={() => Ingresar()}>
                                                Ingresar
                                            </button>

                                            <button type="button" onClick={() => {setIsOpen(false),setIsRegister(false)}}>
                                                Cerrar
                                            </button>
                                        </div>   
                                    </>
                                    }
                                </>    
                            }
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ComponentLogoPerfil;
