import { useState, useEffect, createContext } from "react";
import useAuth from "../hooks/useAuth.jsx";
import clienteAxios from "../config/axios.jsx";

const PacientesContext = createContext();

const PacientesProvider = ({ children }) => {
    const { auth } = useAuth();
    const [pacientes, setPacientes] = useState([]);
    const [pacienteEdit, setPacienteEdit] = useState({});

    const authRequest = (callback) => {
        const token = localStorage.getItem("apv_session");

            if (!token) {
                return;
            }

            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                callback(config);
            } catch (error) {
                console.log(error.response.data.msg);
            }
    }

    useEffect(() => {
        const traerPacientes = async () => {

            authRequest(async config => {
                const { data } = await clienteAxios.get("/pacientes", config);
                setPacientes(data)
            })
        };
        traerPacientes();
    }, [auth]);
    

    const guardarPaciente = async (paciente) => {

        authRequest(async config => {
            const { data } = await clienteAxios.post("/pacientes", paciente, config);
            const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
            setPacientes([pacienteAlmacenado, ...pacientes]);
        })
    }

    const editarPaciente = async (paciente) => {

        authRequest(async config => {
            const { _id, ...datosPaciente } = paciente; //Para no mandar el id
            const { data } = await clienteAxios.put(`/pacientes/${_id}`, datosPaciente, config);
            
            const arr = pacientes.filter(pacienteActual => pacienteActual._id !== _id);
            setPacientes([paciente, ...arr]);

            setPacienteEdit({});
        })
    };
    
    const eliminarPaciente = async (paciente) => {

        authRequest(async config => {
            const { data } = await clienteAxios.delete(`/pacientes/${paciente._id}`, config);
            
            const pacientesNew = pacientes.filter(pacienteActual => pacienteActual._id !== paciente._id);
            setPacientes(pacientesNew);
        })
    };

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                pacienteEdit,
                setPacienteEdit,
                editarPaciente,
                eliminarPaciente,
            }}
        >
            {children}
        </PacientesContext.Provider>
    );
};

export { PacientesProvider };

export default PacientesContext;
