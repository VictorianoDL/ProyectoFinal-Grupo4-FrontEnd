import ComponentLogo from "./Component-Logo";
import ComponentLogoPerfil from "./Component-LogoPerfil";


const Header = () => {
    return (
        <header>
            <ComponentLogo></ComponentLogo>

            <h1>AGAPE</h1>

            <ComponentLogoPerfil></ComponentLogoPerfil>
        </header>
    );
};

export default Header;