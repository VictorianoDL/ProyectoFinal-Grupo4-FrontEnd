import { useState } from "react";

const images = [
    "/imagenes/carrucel1.jpg",
    "/imagenes/carrucel2.jpg",
    "/imagenes/carrucel3.jpg",
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