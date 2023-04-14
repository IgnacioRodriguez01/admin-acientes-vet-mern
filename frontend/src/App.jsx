import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider.jsx";
import { PacientesProvider } from "./context/PacientesProvider.jsx";

import AuthLayout from "./layout/AuthLayout.jsx";
import RutaProtegida from "./layout/RutaProtegida.jsx";

import Registrar from "./paginas/Registrar.jsx";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta.jsx";
import Login from "./paginas/Login.jsx";
import PasswordReset from "./paginas/PasswordReset.jsx";
import PasswordNew from "./paginas/PasswordNew.jsx";
import AdministrarPacientes from "./paginas/AdministrarPacientes.jsx";

function App() {

    return (
        <AuthProvider>
            <PacientesProvider>
                <Routes>
                    <Route path="/" element={<AuthLayout />}>
                        <Route index element={<Login />} />
                        <Route path="registrar" element={<Registrar />} />
                        <Route path="confirmar/:token" element={<ConfirmarCuenta />} />
                        <Route path="password-reset" element={<PasswordReset />} />
                        <Route path="password-reset/:token" element={<PasswordNew />} />
                    </Route>

                    <Route path="/admin" element={<RutaProtegida />}>
                        <Route index element={<AdministrarPacientes />}></Route>
                    </Route>
                </Routes>
            </PacientesProvider>
        </AuthProvider>
    );
}

export default App;
