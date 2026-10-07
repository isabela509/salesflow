import {
    createContext,
    useContext,
    useState
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(() => {
        const guardado = localStorage.getItem("usuario");

        return guardado
            ? JSON.parse(guardado)
            : null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

    const login = (datos) => {
        setUsuario(datos.usuario);
        setToken(datos.token);

        localStorage.setItem(
            "usuario",
            JSON.stringify(datos.usuario)
        );

        localStorage.setItem(
            "token",
            datos.token
        );
    };

    const logout = () => {
        setUsuario(null);
        setToken(null);

        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{
                usuario,
                token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}