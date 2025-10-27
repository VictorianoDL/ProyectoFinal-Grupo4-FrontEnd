import { useState } from "react";

const images = [
    "https://media.istockphoto.com/id/1477731413/es/foto/manos-de-voluntarios-apiladas-en-c%C3%ADrculo.jpg?s=612x612&w=0&k=20&c=fFGdy30is3dIdDTiQWf_J0AIYMX19OumwmZD8ROEXLQ=",
    "https://fotos.perfil.com/2024/11/12/trim/987/555/comedor-amaras-1909855.jpg",
    "https://parqueindustrialburzaco.com/wp-content/uploads/2025/01/CAUSA-COMUN-1.jpeg",
    "https://mediolanumaproxima.org/wp-content/uploads/2016/03/Tu-ayuda-suma_donacion_Mediolanum_aproxima.jpg"
];

const Carrucel = () => {

    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(false);

    function irIzquierda() {
        setFade(true);
        setTimeout(() => {
            setIndex(index - 1 === -1 ? index + images.length - 1 : index - 1);
            setFade(false);
        }, 300);
    }

    function irDerecha() {
        setFade(true);
        setTimeout(() => {
            setIndex(index + 1 === images.length ? index - images.length + 1 : index + 1);
            setFade(false);
        }, 300);
    }

    return (
        <div className="Carrucel">
            <button id="Izquierda" onClick={irIzquierda}></button>
            <button id="Derecha" onClick={irDerecha}></button>
            <img
                src={images[index]}
                alt=""
                className={fade ? "fade" : ""}
            />
        </div>
    );
};

export default Carrucel;