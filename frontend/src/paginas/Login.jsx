import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import clienteAxios from "../config/axios.jsx";

import Swal from "sweetalert2";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {auth, setAuth} = useAuth();

    const navigate = useNavigate();

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
    })
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([email, password].includes("")) {
            Toast.fire({
                icon: 'error',
                title: 'Hay campos vacios.'
            })
            return;
        }

        // Logear y obtener JWT
        try {
            const {data} = await clienteAxios.post('/veterinarios/login', {email, password});
            //guardar token para ser traido por el context
            setAuth(data);
            localStorage.setItem('apv_session', data.token)
            navigate('/admin'); //LLevar a otra ruta
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: error.response.data.msg
            })
        }
    };

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Inicia Sesión y Administra tus
                    <span className="text-black"> Pacientes</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                
                <form action="" onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email de Registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Tu Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <input
                        type="submit"
                        value="Iniciar Sesión"
                        className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10"
                    />
                </form>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link
                        to="/registrar"
                        className="block text-center my-5 text-gray-500 hover:text-gray-800"
                    >
                        ¿No tienes una cuenta? Regístrate
                    </Link>
                    <Link
                        to="/password-reset"
                        className="block text-center my-5 text-gray-500 hover:text-gray-800"
                    >
                        Olvidé mi password.
                    </Link>
                </nav>
            </div>
        </>
    );
};

export default Login;
