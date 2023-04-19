import usePacientes from "../hooks/usePacientes.jsx";

import Paciente from "./Paciente.jsx";

const ListadoPacientes = () => {
    const { pacientes } = usePacientes();

    const listaPacientes = pacientes.map(
        (paciente) => (
            <Paciente paciente={paciente} key={paciente._id} />
        )
    );

    return (
        <>
            {pacientes.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
                    <p className="text-xl text-center mt-5 mb-10">
                        Administra tus
                        <span className="text-indigo-600 font-bold"> Pacientes y Citas</span>
                    </p>
                    <div>{listaPacientes}</div>
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
                    <p className="text-xl text-center mt-5 mb-10">
                        Comienza agregando pacientes
                        <span className="text-indigo-600 font-bold"> y aparecerán en este lugar</span>
                    </p>
                </>
            )}

        </>
    );
};

export default ListadoPacientes;
