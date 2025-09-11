
type CasillaInfoProps = {
        imageUrl: string;
        description: string;
        row: boolean;
    };

const CasillaInfo = ({imageUrl,description,row}:CasillaInfoProps) => {
    if(row){
        return (
            <div className="CasillaInfo" style={{flexDirection: 'row'}}>
                <img src={imageUrl} alt="imagen" />
                <div id="bloque"></div>
                <p> {description} </p>
            </div>
        );
    }else{
        return (
            <div className="CasillaInfo" style={{flexDirection: 'row-reverse'}}>
                <img src={imageUrl} alt="imagen" />
                <p> {description} </p>
            </div>
        );
    }
};

export default CasillaInfo;