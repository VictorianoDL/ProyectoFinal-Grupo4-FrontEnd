import "./Footer.css"

const Footer = () => {
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
            <li><a href="#">Home</a></li>
            <li><a href="#">Campañas</a></li>
            <li><a href="#">Contacto</a></li>
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