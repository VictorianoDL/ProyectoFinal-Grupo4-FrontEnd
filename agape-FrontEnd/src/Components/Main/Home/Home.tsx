import { useNavigate } from "react-router-dom";
import Carrucel from "./Carrucel";
import CasillaInfo from "./CasillaInfo";
import './Home.css'


const image = [
    "https://st.depositphotos.com/67109346/56769/v/450/depositphotos_567692978-stock-illustration-concept-cohesion-five-outstretched-hands.jpg",
    "https://img.freepik.com/vector-premium/icono-red-social-establece-vector-conexion-comunidad-simbolo-conexion-global-signo-conexion-global-icono-red_268104-13390.jpg?w=360"
];

const descripcion = [
    `Agápe: amor que transforma.
    En Agápe creemos que ayudar es un acto de amor puro.
    Nuestra plataforma conecta a personas solidarias con causas reales, permitiendo donar de manera segura, simple y transparente.
    Cada aporte, por pequeño que parezca, tiene el poder de cambiar una vida.
    Sumate a nuestra comunidad y descubrí lo que podemos lograr juntos.
    Porque cuando damos sin esperar nada a cambio, el mundo se vuelve un lugar mejor.` ,

    `
    Agápe es una página web creada con un propósito claro: hacer que donar sea más fácil, confiable y humano.
    Inspirados en la palabra griega agápe, que significa amor incondicional, buscamos fomentar una red de solidaridad 
    donde cada persona pueda contribuir al bienestar de otros.`   
];

const Home = () => {
    const navigate = useNavigate();
    
    return (
        <div className="home">
            <Carrucel />
            <button className="aCampanias" onClick={() => navigate("/campanias")}>ir a campañas</button>
            <div className="Casillas-Informacion">
                <CasillaInfo imageUrl={image[1]} description={descripcion[1]} row={true}/>
                <CasillaInfo imageUrl={image[0]} description={descripcion[0]} row={false} />
            </div>
        </div>
    );
};

export default Home;