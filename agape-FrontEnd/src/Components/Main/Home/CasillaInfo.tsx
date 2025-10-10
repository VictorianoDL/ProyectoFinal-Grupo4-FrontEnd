
type CasillaInfoProps = {
        imageUrl: string;
        description: string;
        row: boolean;
    };

const CasillaInfo = ({imageUrl,description,row}:CasillaInfoProps) => {

    const imagen = "./imagenes/img-casilla-Info.png";

    if(row){
        return (
            <div className="CasillaInfo" style={{flexDirection: 'row'}}>
                <p> {description} </p>
                <img id="cas-Row" className="img-casilla-info shadow2" src={imagen} alt="" />
                <img id="cas-Row" className="img-casilla-info shadow1" src={imagen} alt="" />
                <img id="cas-Row" className="img-casilla-info shadow0" src={imagen} alt="" />
                <img src={imageUrl} alt="imagen" />
            </div>
        );

    }else{
        return (
            <div className="CasillaInfo" style={{flexDirection: 'row-reverse'}}>
                <p> {description} </p>
                <img id="cas-RowRev" className="img-casilla-info shadow2" src={imagen} alt="" />
                <img id="cas-RowRev" className="img-casilla-info shadow1" src={imagen} alt="" />
                <img id="cas-RowRev" className="img-casilla-info shadow0" src={imagen} alt="" />
                <img src={imageUrl} alt="imagen" />
            </div>
        );

    }
};

export default CasillaInfo;