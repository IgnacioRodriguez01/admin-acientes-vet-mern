import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <>  
            <img className="fixed top-0 -z-10 w-screen h-screen" src="../mesh-gradient2.png" alt="" />
            <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 items-center">
                <Outlet />
            </main>
        </>
    );
};

export default AuthLayout;
