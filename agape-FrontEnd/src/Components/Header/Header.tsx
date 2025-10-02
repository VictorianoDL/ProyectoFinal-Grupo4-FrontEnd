import ComponentLogo from "./Component-Logo";
import ComponentLogoPerfil from "./Component-LogoPerfil";
import "./Header.css";

const Header = () => {

    return (
        <header>
            <ComponentLogo></ComponentLogo>
            <div id="conteinerLogo">
                <a href="/" className="Logo-Agape-Grande">
                    <img src="../Logos/Agape - Logo AZUL Completo.png" alt="Logo" />
                </a>
            </div>
            
            <ComponentLogoPerfil></ComponentLogoPerfil>
        </header>
    );
};

export default Header;