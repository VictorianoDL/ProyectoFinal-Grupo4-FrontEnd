import { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

const ComponentLogoPerfil = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const { setId , userName, setUserName, setName, setLastName, setEmail, setAccessToken, accessToken } = useUser();

    if(accessToken == null && isLogged == false){
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
