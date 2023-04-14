import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios.jsx";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true); //Util para timings

    //traer datos del perfil al que le corresponde el token desde ls, al context
    useEffect(() => {
      const autenticarUsuario = async () => {
        const token = localStorage.getItem('apv_session')
        
        if(!token){
            setCargando(false);
            console.log("auth false");
            return;
        }
        console.log("auth true");

        try {
            const config  ={
                headers: {
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.get('/veterinarios/perfil', config);
            setAuth(data.perfil);
            setCargando(false);
        } catch (error) {
            console.log(error.response.data.msg);
        }
      }
      autenticarUsuario();
    }, [])
    
    const cerrarSesion = () => {
        localStorage.removeItem('apv_session');
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };

export default AuthContext;
