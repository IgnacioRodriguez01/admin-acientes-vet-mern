import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../config/axios.jsx";

import Swal from "sweetalert2";

const ConfirmarCuenta = () => {
    const params = useParams();
    const {token} = params;

    const [cargando, setCargando] = useState(false);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
    }) //add target

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                setCargando(true);
                const url = `/veterinarios/confirmar/${token}`;
                const {data} = await clienteAxios.get(url, {});
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
            setCargando(false)
        }
        confirmarCuenta();
    }, [])
    

    

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Confirma tu Cuenta y Comienza a Administrar tus
                    <span className="text-black"> Pacientes</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {/* !cargando && <Alerta alerta={alerta} /> */}
            </div>
        </>
    );
};

export default ConfirmarCuenta;
