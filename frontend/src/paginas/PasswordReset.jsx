 import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/axios.jsx";

import Swal from "sweetalert2";

const PasswordReset = () => {
    const [email, setEmail] = useState("");

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        if ([email].includes("")) {
            Toast.fire({
                icon: 'error',
                title: 'Introducir un email.'
            })
            return;
        }

        //Enviar mail
        try {
            const url = '/veterinarios/password-reset/';
            const {data} = await clienteAxios.post(url ,{email});
            Toast.fire({
                icon: 'success',
                title: data.msg
            })

        } catch (error) {
            console.log(error);
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
                    Recupera el Acceso y no Pierdas tus
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
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Enviar Instrucciones"
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
                </nav>
            </div>
        </>
    );
};

export default PasswordReset;
