import { useNavigate } from "react-router-dom";
import Carrucel from "./Carrucel";
import CasillaInfo from "./CasillaInfo";
import './Home.css'


const image = [
    "https://images.vexels.com/media/users/3/182371/isolated/preview/2f8c7e9f42c7781c3846b435475f92af-plano-de-fruta-de-manzana.png",
    "https://images.vexels.com/media/users/3/182371/isolated/preview/2f8c7e9f42c7781c3846b435475f92af-plano-de-fruta-de-manzana.png",
    "https://images.vexels.com/media/users/3/182371/isolated/preview/2f8c7e9f42c7781c3846b435475f92af-plano-de-fruta-de-manzana.png"
];

const descripcion = [
    "ashdh jhasgjhadg jhasgd jhasgjdagh jhasgd jhasgdjgh jasgdh jhgasd jhgasjdg jhagsdajdsg jasgd jhasgdjag jhasgdjasdg jasg ja sgjasdgj jhagsdjh informancon de algo o sobre la aplicacions de doom y quierby para ciando que claor eso eheheheeeehh eso lo decia diego maradona y tambien tu puta madre",
    "segunda descripcion"    
];

const Home = () => {
    const navigate = useNavigate();
    
    return (
        <div className="home">
            <Carrucel />
            <button className="aCampanias" onClick={() => navigate("/campanias")}>ir a campañas</button>
            <div className="Casillas-Informacion">
                <CasillaInfo imageUrl={image[1]} description={descripcion[0]} row={true}/>
                <CasillaInfo imageUrl={image[2]} description={descripcion[0]} row={false} />
            </div>
        </div>
    );
};

export default Home;