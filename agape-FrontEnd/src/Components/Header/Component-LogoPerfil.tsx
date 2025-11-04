import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

// interface GooglePayload {
//   email: string;
//   name: string;
//   picture: string;
// }

const ComponentLogoPerfil = () => {  
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const { setId , userName, setUserName, name, setName, setLastName, setEmail, setAccessToken, accessToken } = useUser();

    if(accessToken != null && isLogged == false){
        setIsLogged(true)
    }
    
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
                const res = await fetch("http://localhost:3000/auth/login", {
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

                    setId(data.user.id);
                    setUserName(data.user.nombreUsuario);
                    setName(data.user.nombre);
                    setLastName(data.user.apellido);
                    setEmail(data.user.email);

                    setIsLogged(true);
                    setIsOpen(false);

                    console.log("Usuario logeado:", data);

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

                const res = await fetch("http://localhost:3000/auth/register", {
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

                }else{
                    throw new Error("???");
                } 
            } catch (err) {
                let p = document.getElementById("aviso") as HTMLParagraphElement;
                // acomodar esto
                p.innerText = "Error al registrarse  " + err;
                console.error("Error al registrarse  " + err );
            } 
        }  
    };

    // const handleLoginSuccess = (credentialResponse: any) => {
    //     console.log('Google Credential:', credentialResponse);
    //         // Aquí puedes enviar el token a tu backend o guardar el usuario

    //     const decoded: GooglePayload = jwtDecode(credentialResponse.credential);
    //     console.log("Usuario logeado:", decoded);


    // };

    const DesLoguearse = async () => {
        try{
            const res = await fetch("http://localhost:3000/auth/logout", {
                method: "POST",
                credentials: "include", // importante: incluye la cookie httpOnly
            });
            if(res.ok){
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
                    src={isLogged ? "https://upload.wikimedia.org/wikipedia/commons/b/bf/Foto_Perfil_.jpg" : "https://t4.ftcdn.net/jpg/01/24/65/69/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg"}
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

                                        {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>    
                                            
                                                <GoogleLogin
                                                onSuccess={handleLoginSuccess}
                                                onError={() => console.log('Login Failed')}
                                                />
                                            
                                        </GoogleOAuthProvider> */}
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
