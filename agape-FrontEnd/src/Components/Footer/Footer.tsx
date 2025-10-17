import "./Footer.css"
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    return (

        <footer>
            <div className="footer-container">

                <div className="footer-brand">
                    <h2>Agape</h2>
                    <p>Donaciones Economicas ❤️</p>
                </div>

                <div className="footer-links">
                    <h3>Enlaces</h3>
                    <ul>
                        <li><p onClick={() => navigate("/")}>Home</p></li>
                        <li><p onClick={() => navigate("/campanias")}>Campañas</p></li>
                        <li><p onClick={() => navigate("/usuario")}>Usuario</p></li>
                        <li><p onClick={() => navigate("/perfil-campania")}>Perfil de Campaña</p></li>
                        <li><p onClick={() => navigate("/contacto")}>Contacto</p></li>
                    </ul>
                </div>

                <div className="footer-social">
                    <h3>Síguenos</h3>
                    <a href="#">🌐</a>
                    <a href="#">🐦</a>
                    <a href="#">📘</a>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2025 Agape: Donaciones Economicas. Todos los derechos reservados.</p>
            </div>
        </footer>

    );
};

export default Footer;