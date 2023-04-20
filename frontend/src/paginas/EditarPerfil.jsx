import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth.jsx";

import AdminNav from "../components/AdminNav.jsx";
import { Alerta } from "../components/Alerta.jsx";

const EditarPerfil = () => {
    const {auth, actualizarPerfil} = useAuth();
    const [perfil, setPerfil] = useState({}); //For controlled input with useEffect
    const [alerta, setAlerta] = useState({})

    useEffect(() => {
        setPerfil(auth);
    }, [auth]);

    const handleSubmit = async e => {
        e.preventDefault();

        const {nombre, web, telefono, email} = perfil

        if(!nombre && !email){
            setAlerta({ msg: "El nombre y el mail son obligatorios.", error: true });
            return;
        }
        if(!nombre){
            setAlerta({ msg: "El nombre es obligatorio.", error: true });
            return;
        }
        if(!email){
            setAlerta({ msg: "El mail es obligatorio.", error: true });
            return;
        }

        const msg = await actualizarPerfil(perfil);
        setAlerta({ msg, error: false });
    }

    return (
        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">
                Editar Perfil
            </h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Modifica tus
                <span className="text-indigo-600 font-bold"> Datos</span> aquí
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    
                {alerta.msg && <Alerta alerta={alerta} />}

                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">
                                Nombre
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                value={perfil.nombre || ''}
                                onChange={ e => setPerfil({...perfil, [e.target.name] : e.target.value}) }
                            />
                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">
                                Sitio Web
                            </label>
                            <input
                                type="text"
                                name="web"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                value={perfil.web || ''}
                                onChange={ e => setPerfil({...perfil, [e.target.name] : e.target.value}) }
                            />
                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">
                                Teléfono
                            </label>
                            <input
                                type="text"
                                name="telefono"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                value={perfil.telefono || ''}
                                onChange={ e => setPerfil({...perfil, [e.target.name] : e.target.value}) }
                            />
                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                value={perfil.email || ''}
                                onChange={ e => setPerfil({...perfil, [e.target.name] : e.target.value}) }
                            />
                        </div>
                        <input
                            type="submit"
                            value="Guardar Cambios"
                            className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditarPerfil;
