import { useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios.jsx";

import { Alerta } from "../components/alerta.jsx";

const Registrar = () => {
    const [alerta, setAlerta] = useState({});
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repPassword, setRepPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([nombre, email, password, repPassword].includes("")) {
            setAlerta({ msg: "Hay campos vacios.", error: true });
            return;
        }
        if (password !== repPassword) {
            setAlerta({ msg: "Los passwords deben ser iguales.", error: true });
            return;
        }
        if (password.length <= 6) {
            setAlerta({
                msg: "El password debe tener al menos 6 caracteres.",
                error: true,
            });
            return;
        }

        setAlerta({ error: false });

        // Crear usuario en la API
        try {
            const res = await clienteAxios.post('/veterinarios', {nombre, email, password});
            setAlerta({msg:'Creado correctamente. Revisa tu email.'})
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error: true});
        }
    };

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Crea tu cuenta y Administra tus
                    <span className="text-black"> Pacientes</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                
                {alerta.msg && <Alerta alerta={alerta} />}
                
                <form action="" onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Nombre
                        </label>
                        <input
                            type="text"
                            placeholder="Tu nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email de registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
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
                        value="Crear cuenta"
                        className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10"
                    />
                </form>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link
                        to="/"
                        className="block text-center my-5 text-gray-500 hover:text-gray-800"
                    >
                        ¿Ya tienes una cuenta? Inicia sesión
                    </Link>
                </nav>
            </div>
        </>
    );
};

export default Registrar;
