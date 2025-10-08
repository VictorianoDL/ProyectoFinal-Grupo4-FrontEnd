import { useState } from "react";

const images = [
    "https://www.sportsbusinessjournal.com/resizer/c_nYy9CCdHqGGG4YJvkykyJxzng=/arc-photo-leadersgroup/arc2-prod/public/HNVJO4MINV2MWFGGD3LHF2RNTE.png",
    "https://hips.hearstapps.com/hmg-prod/images/castillo-manzanares-el-real-1636196825.jpg?resize=980:*",
    "https://media.traveler.es/photos/61376a7cf130191a954c7726/master/pass/151628.jpg",
    "https://beam-images.warnermediacdn.com/BEAM_LWM_DELIVERABLES/d8702a49-eced-457f-87b5-afe881ee72a0/d1695cce67928ee0db0a45b81fdcb0a865ff51a8.jpg?host=wbd-images.prod-vod.h264.io&partner=beamcom"
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