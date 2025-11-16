import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";

const ComponentLogo = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    if (typeof window !== "undefined") {
        document.body.classList.toggle("menu-open", isMenuOpen);
    }

    return (
        <div className="ComponentLogo">
            <button className="hamburger-menu" onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes size={23}/> : <FaBars size={23}/>}
            </button>

            <div
                className={`menu-backdrop ${isMenuOpen ? "open" : ""}`}
                onClick={handleCloseMenu}
            />

            <div className="headerContainer2">
                <img src="../Logos/Agape - Logo AZUL Min.png" alt="Logo" />

                <div className={`navegadorDiv ${isMenuOpen ? 'open' : ''}`}>
                    <Link to="/" onClick={handleCloseMenu}>
                        <h2>Home</h2>
                    </Link>
                        
                    <Link to="/campanias" onClick={handleCloseMenu}>
                        <h2>Campañas</h2>
                    </Link>
                        
                    <Link to="/contacto" onClick={handleCloseMenu}>
                        <h2>Contacto</h2>
                    </Link>
                </div>  
            </div>
        </div>
    );
}

export default ComponentLogo;