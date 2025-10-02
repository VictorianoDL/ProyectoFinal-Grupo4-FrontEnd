import { useState } from "react";

const ComponentLogoPerfil = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  

  const handleClick = () => {
    if (isLogged) {
      window.location.href = "/perfil";
    } else {
      setIsOpen(true);
      setIsRegister(false);
    }
  };

  return (
    <div className="ComponentLogo-Perfil">
      <img
        src="https://t4.ftcdn.net/jpg/01/24/65/69/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg"
        alt="Logo"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      />
      <a>Login/register</a>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="Logo-Agape-Login">
              <img
                src="../Logos/Agape - Logo AZUL Completo.png"
                alt="Logo"
              />
            </div>

            <form className="modal-form">
              {isRegister ? (
                <>
                  <input type="text" placeholder="Nombre de usuario" />
                  <input type="text" placeholder="Nombre" />
                  <input type="text" placeholder="Apellido" />
                  <input type="email" placeholder="Email" />
                  <input type="password" placeholder="Contraseña" />
                </>
              ) : (
                <>
                  <input type="email" placeholder="Email" />
                  <input type="password" placeholder="Contraseña" />
                </>
              )}

              <div className="modal-buttons">
                <button type="submit">
                  {isRegister ? "Registrarse" : "Ingresar"}
                </button>
                {!isRegister && (
                  <button type="button" onClick={() => setIsRegister(true)}>
                    Registrarse
                  </button>
                )}
                <button type="button" onClick={() => setIsOpen(false)}>
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
        )}
    </div>
  );
};

export default ComponentLogoPerfil;
