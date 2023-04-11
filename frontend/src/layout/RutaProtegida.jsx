import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth.jsx"

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const RutaProtegida = () => {
    const {auth, cargando}= useAuth();

    console.log(cargando, auth);
    if(cargando) return 'cargando...'

  return (
    <>
        <Header />
        { auth?._id ? 
        (
          <main className="container mx-auto mt-10">
            <Outlet />
          </main>
        ) 
        : <Navigate to='/' /> }
        <Footer />
    </>

  )
}

export default RutaProtegida