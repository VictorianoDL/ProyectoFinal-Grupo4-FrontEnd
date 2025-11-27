import { createContext, useState, type ReactNode, useContext } from "react";

interface CampañaContextType {
    idCamp: number;
    setIdCamp: (id: number) => void;
    nameCamp: string;
    setNameCamp: (name: string) => void;
    descripcion: string;
    setDescripcion: (descripcion: string) => void;
    tipo: string;
    setTipo: (tipo: string) => void;
    objetivo: number;
    setObjetivo: (objetivo: number) => void;
    recaudado: number;
    setRecaudado: (recaudado: number) => void;
    fecha_inicio: Date;
    setFechaInicio: (fecha_inicio: Date) => void;
    activo: boolean;
    setActivo: (activo: boolean) => void;

    ownerId: number;
    setOwnerId: (id: number) => void;
    ownerUsuario: string;
    setOwnerUsuario: (ownerUsuario: string) => void;
    ownerEmail: string;
    setOwnerEmail: (ownerEmail: string) => void;
}

// Creamos el contexto con un valor por defecto
const CampañaContext = createContext<CampañaContextType | undefined>(undefined);

// Creamos el provider para envolver la app
export const CampañaProvider = ({ children }: { children: ReactNode }) => {
    const [idCamp, setIdCamp] = useState(0);
    const [nameCamp, setNameCamp] = useState("Camapaña Name");
    const [descripcion, setDescripcion] = useState("Descripcion de la campaña");
    const [tipo, setTipo] = useState("Tipo");
    const [objetivo, setObjetivo] = useState(0);
    const [recaudado, setRecaudado] = useState(0);
    const [fecha_inicio, setFechaInicio] = useState(new Date ("2025-5-12"));
    const [activo, setActivo] = useState(false);
    const [ownerId, setOwnerId] = useState(0);
    const [ownerUsuario, setOwnerUsuario] = useState("Usuario Owner");
    const [ownerEmail, setOwnerEmail] = useState("Email Usuario");

    return (
        <CampañaContext.Provider value={{ idCamp, setIdCamp, nameCamp, setNameCamp, descripcion,setDescripcion,tipo,setTipo,objetivo
                                        ,setObjetivo,recaudado,setRecaudado,fecha_inicio,setFechaInicio,activo,setActivo, ownerUsuario
                                        , setOwnerUsuario, ownerEmail, setOwnerEmail, ownerId, setOwnerId}}>
            {children}
        </CampañaContext.Provider>
    );
};

// Hook personalizado para usar el contexto fácilmente
export const useCampaña = (): CampañaContextType => {
    const context = useContext(CampañaContext);
    if (!context) {
        throw new Error("useCampaña debe usarse dentro de un UserProvider");
    }
    return context;
};