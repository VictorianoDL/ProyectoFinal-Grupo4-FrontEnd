import { FaFacebookF, FaGlobe, FaInstagram } from "react-icons/fa";
import "./Footer.css"
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    return (

        <footer>
            <div className="footer-container">

                <div className="footer-brand">
                    <h2>Agape</h2>
                    <p>Donaciones Economicas ❤️<br />
                    Victoriano Feijoo - Massimo Romairone</p>
                </div>

                <div className="footer-links">
                    <h3>Enlaces</h3>
                    <ul>
                        <li><button onClick={() => navigate("/")} className="footer-link-btn">Home</button></li>
                        <li><button onClick={() => navigate("/campanias")} className="footer-link-btn">Campañas</button></li>
                        <li><button onClick={() => navigate("/usuario")} className="footer-link-btn">Usuario</button></li>
                        <li><button onClick={() => navigate("/perfil-campania")} className="footer-link-btn">Perfil de Campaña</button></li>
                        <li><button onClick={() => navigate("/contacto")} className="footer-link-btn">Contacto</button></li>
                    </ul>
                </div>

                <div className="footer-social">
                    <h3>Síguenos</h3>
                     <div className="social-icons">
                        <a href="#" aria-label="Sitio web"><FaGlobe /></a>
                        <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="#" aria-label="Instagram"><FaInstagram /></a>
                    </div>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2025 Agape: Donaciones Economicas. Todos los derechos reservados.</p>
            </div>
        </footer>

    );
};

export default Footer;