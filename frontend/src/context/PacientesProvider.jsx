import { useState, useEffect, createContext } from "react";
import useAuth from "../hooks/useAuth.jsx";
import clienteAxios from "../config/axios.jsx";

const PacientesContext = createContext();

const PacientesProvider = ({ children }) => {
    const { auth } = useAuth();
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        const traerPacientes = async () => {
            const token = localStorage.getItem("apv_session");

            if (!token) {
                console.log("pacientes false");
                return;
            }
            console.log("pacientes true");
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                const { data } = await clienteAxios.get("/pacientes", config);
                setPacientes(data)
            } catch (error) {
                console.log(error.response.data.msg);
            }
        };
        traerPacientes();
    }, [auth]);

    const guardarPaciente = async (paciente) => {
        try {
            const token = localStorage.getItem("apv_session");
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await clienteAxios.post("/pacientes", paciente, config);
            const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
            setPacientes([pacienteAlmacenado, ...pacientes]);
        } catch (error) {
            console.log(error.response.data.msg);
        }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
            }}
        >
            {children}
        </PacientesContext.Provider>
    );
};

export { PacientesProvider };

export default PacientesContext;
