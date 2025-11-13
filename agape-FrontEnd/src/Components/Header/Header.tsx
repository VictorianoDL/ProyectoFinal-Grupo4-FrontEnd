import ComponentLogo from "./Component-Logo";
import ComponentLogoPerfil from "./Component-LogoPerfil";
import "./Header.css";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();
    
    return (
        <header>
            <ComponentLogo></ComponentLogo>
            
            <div id="conteinerLogo">
                <div onClick={() => navigate("/")} className="Logo-Agape-Grande">
                    <img src="../Logos/Agape - Logo AZUL Completo.png" alt="Logo" />
                </div>
            </div>

            <ComponentLogoPerfil></ComponentLogoPerfil>
        </header>
    );
};

export default Header;