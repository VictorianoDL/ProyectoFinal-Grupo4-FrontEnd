import { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

const ComponentLogoPerfil = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const { id, setId } = useUser();
    const { userName, setUserName } = useUser();
    const { name, setName } = useUser();
    const { lastName, setLastName } = useUser();
    const { email, setEmail } = useUser();
    
    const imagenClick = () => {
        if (isLogged) {

            navigate("/usuario");

        } else {
            setIsOpen(true);
            // setIsRegister(false);
        }
    };

    const Ingresar = async () => {
        let contraseniaName = document.getElementById("contraseniaUser") as HTMLInputElement;
        let userEmail = document.getElementById("emailUser") as HTMLInputElement;

        if(!isRegister){
            // logearse
            try {
                // Fetch de prueba
                // const res = await fetch("http://localhost:3000/usuarios/1");

                // Este deberia ir
                const res = await fetch("http://localhost:3000/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                    body: JSON.stringify({ email: userEmail.value, contraseña: contraseniaName.value }),
                });

                
                if (res.ok){
                    const data = await res.json();

                    setId(data.user.id);
                    setUserName(data.user.nombreUsuario);
                    setName(data.user.nombre);
                    setLastName(data.user.apellido);
                    setEmail(data.user.email);

                    setIsLogged(true);
                    setIsOpen(false);

                
                } else {
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
                    nombreUsuario: userNameTag.value,
                    nombre: userName.value,
                    apellido: userLastName.value,
                    email:userEmail.value,
                    contraseña:contraseniaName.value
                }

                const res = await fetch("http://localhost:3000/auth/register", {
                    // Acomodar esto
                    method: "POST",
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
                  throw new Error("???");
                } 
            } catch (err) {
                let p = document.getElementById("aviso") as HTMLParagraphElement;
                // acomodar esto
                p.innerText = "Error al iniciar sesión  " + err;
                console.error("Error al iniciar sesión  " + err );
            } 
        }  
    };

    const handleGoogleLogin = async (credentialResponse: any) => {
        try {
            const token = credentialResponse.credential;
            const res = await fetch("http://localhost:3000/auth/google/callback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
                credentials: "include"
            });

            if(res.ok){
                const data = await res.json();
                setId(data.user.id);
                setUserName(data.user.nombreUsuario);
                setName(data.user.nombre);
                setLastName(data.user.apellido);
                setEmail(data.user.email);
                setIsLogged(true);
                setIsOpen(false);
            } else {
                console.error("Error al iniciar sesión con Google");
            }
        } catch (err) {
            console.error("Error en Google Login:", err);
        }
    }

    const loginWithGoogle = useGoogleLogin({
        onSuccess: handleGoogleLogin,
        onError: () => console.error("Error de Google Login"),
    });

    return (
        <div className="ComponentLogo-Perfil">
            <div className="conteinerImg">
                {isLogged ? <h2>{userName}</h2> : <h2>Iniciar Sesión</h2>}
                <img
                    src="https://t4.ftcdn.net/jpg/01/24/65/69/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg"
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
                        <form className="modal-form">
                            {!isRegister ? 
                                <>
                                    <input id="emailUser" type="email" placeholder="Email"/>
                                    <input id="contraseniaUser" type="text" placeholder="Contraseña"/>
                                    <p id="aviso"></p>
                                    
                                    <div className="modal-buttons">
                                        <button type="button" onClick={() => Ingresar()}>
                                            Ingresar
                                        </button>

                                        <button type="button" onClick={() => setIsOpen(false)}>
                                            Cerrar
                                        </button>
                                    </div>

                                    <a onClick={() => setIsRegister(true)}>Registrarse</a>

                                    <GoogleLogin
                                        onSuccess={async (credentialResponse) => {
                                            console.log('Google credentialResponse:', credentialResponse);
                                            // credentialResponse.credential contiene el ID token (JWT) en el flujo "credential"
                                            const idToken = (credentialResponse as any)?.credential;
                                            if (!idToken) {
                                            console.error('No id_token recibido desde Google');
                                            return;
                                            }
                                            try {
                                            const res = await fetch("http://localhost:3000/auth/google/callback", {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({ token: idToken }),
                                                credentials: "include",
                                            });
                                            if (!res.ok) {
                                                console.error('Error en backend Google callback:', await res.text());
                                                return;
                                            }
                                            const data = await res.json();
                                            // actualizar UserContext igual que haces en login normal
                                            setId(data.user.id_Usuario ?? data.user.id ?? 0);
                                            setUserName(data.user.nombreUsuario);
                                            setName(data.user.nombre);
                                            setLastName(data.user.apellido);
                                            setEmail(data.user.email);
                                            setIsLogged(true);
                                            setIsOpen(false);
                                            } catch (err) {
                                            console.error('Error al enviar token a backend:', err);
                                            }
                                        }}
                                        onError={() => console.error('Error en GoogleLogin componente')}
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
                        </form>
                    </div> 
                </div>
            )}
        </div>
    );
};

export default ComponentLogoPerfil;
