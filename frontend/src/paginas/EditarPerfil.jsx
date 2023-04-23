import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth.jsx";

import AdminNav from "../components/AdminNav.jsx";
import Swal from "sweetalert2";

const EditarPerfil = () => {
    const {auth, actualizarPerfil} = useAuth();
    const [perfil, setPerfil] = useState({}); //For controlled input with useEffect

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
    })

    useEffect(() => {
        setPerfil(auth);
    }, [auth]);

    const handleSubmit = async e => {
        e.preventDefault();

        const {nombre, web, telefono, email} = perfil

        if(!nombre && !email){
            Toast.fire({
                icon: 'error',
                title: 'El nombre y el mail son obligatorios.'
            })
            return;
        }
        if(!nombre){
            Toast.fire({
                icon: 'error',
                title: 'El nombre es obligatorio.'
            })
            return;
        }
        if(!email){
            Toast.fire({
                icon: 'error',
                title: 'El mail es obligatorio.'
            })
            return;
        }

        const msg = await actualizarPerfil(perfil);
        Toast.fire({
            icon: 'success',
            title: msg
        })
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
