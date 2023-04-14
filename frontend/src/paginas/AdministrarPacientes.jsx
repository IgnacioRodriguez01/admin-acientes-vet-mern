import { useState } from "react";
import Formulario from "../components/Formulario.jsx";
import ListadoPacientes from "../components/ListadoPacientes.jsx";

const AdministrarPacientes = () => {
    const [mostrarForm, setMostrarForm] = useState(false);

    return (
        <div className="flex flex-col md:flex-row">
            <button
                type="button"
                className="bg-indigo-600 text-white font-bold uppercase mb-10 mx-10 p-3 rounded-md md:hidden"
                onClick={() => setMostrarForm(!mostrarForm)}
            >
                {mostrarForm ? 'Ocultar Formulario' : 'Mostrar Formulario'}
            </button>
            <div
                className={`${
                    mostrarForm ? "block" : "hidden"
                } md:block md:w-1/2 lg:w-2/5`}
            >
                <Formulario />
            </div>
            <div className="md:w-1/2 lg:w-3/5">
                <ListadoPacientes />
            </div>
        </div>
    );
};

export default AdministrarPacientes;
