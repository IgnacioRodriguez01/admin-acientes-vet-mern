import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/axios.jsx";

import Swal from "sweetalert2";

const PasswordNew = () => {
    const params = useParams();
    const {token} = params;

    const [tokenValido, setTokenValido] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [password, setPassword] = useState("");
    const [repPassword, setRepPassword] = useState("");

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
    })

    useEffect(() => {
        const confirmarToken = async () => {
            try {
                const url = `/veterinarios/password-reset/${token}`;
                const {data} = await clienteAxios.get(url ,{});
                setTokenValido(true);
            } catch (error) {
                console.log(error);
                Toast.fire({
                    icon: 'error',
                    title: 'Enlace no válido'
                })
            }
        }
        confirmarToken();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if ([password, repPassword].includes("")) {
            Toast.fire({
                icon: 'error',
                title: 'Hay campos vacios.'
            })
            return;
        }
        if (password !== repPassword) {
            Toast.fire({
                icon: 'error',
                title: 'Los passwords deben ser iguales.'
            })
            return;
        }
        if (password.length <= 6) {
            Toast.fire({
                icon: 'error',
                title: 'El password debe tener al menos 6 caracteres.'
            })
            return;
        }

        try {
            const url = `/veterinarios/password-reset/${token}`;
            const {data} = await clienteAxios.post(url ,{password});
            Toast.fire({
                icon: 'success',
                title: data.msg
            })
            setRedirect(true);
        } catch (error) {
            console.log(error);
            Toast.fire({
                icon: 'error',
                title: error.response.data.msg
            })
        }
    
    }

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Recupera el Acceso y no Pierdas tus
                    <span className="text-black"> Pacientes</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                
                <form action="" onSubmit={handleSubmit}>
                    { tokenValido && 
                        <>
                            <div className="my-5">
                                <label className="uppercase text-gray-600 block text-xl font-bold">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Tu password"
                                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="my-5">
                                <label className="uppercase text-gray-600 block text-xl font-bold">
                                    Repetir Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Repite tu password"
                                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                    onChange={(e) => setRepPassword(e.target.value)}
                                />
                            </div>
                            
                            <input
                                type="submit"
                                value="Resetear Password"
                                className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10"
                            />
                        </>
                    }
                </form>
                {redirect && 
                    <nav className="mt-10 lg:flex lg:justify-between">
                        <Link
                            to="/"
                            className="block text-center my-5 text-gray-500 hover:text-gray-800"
                        >
                            Inicia sesión
                        </Link>
                    </nav>
                }
            </div>
        </>
    );
};

export default PasswordNew;
