import { createContext, useState, type ReactNode, useContext } from "react";

interface UserContextType {
    id: number;
    setId: (id: number) => void;
    userName: string;
    setUserName: (userName: string) => void;
    name: string;
    setName: (name: string) => void;
    lastName: string;
    setLastName: (lastName: string) => void;
    email: string;
    setEmail: (email: string) => void;
}

// Creamos el contexto con un valor por defecto
const UserContext = createContext<UserContextType | undefined>(undefined);

// Creamos el provider para envolver la app
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [id, setId] = useState(0);
    const [userName, setUserName] = useState("Invitado");
    const [name, setName] = useState("Name");
    const [lastName, setLastName] = useState("Last Name");
    const [email, setEmail] = useState("ejemplo@email.com");


    return (
        <UserContext.Provider value={{ id, setId, userName, setUserName, name, setName, lastName, setLastName, email, setEmail }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personalizado para usar el contexto fácilmente
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser debe usarse dentro de un UserProvider");
    }
    return context;
};