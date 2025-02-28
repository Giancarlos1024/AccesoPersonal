import { Mail,Lock } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"


export const Login = () =>{

    const navigate = useNavigate()

    const handleAutenticacion = (e) => {
        e.preventDefault()
        navigate("/dashboard")

    }

    return(
        <div className="bg-black p-0 h-dvh flex justify-center items-center">
            <div className="rounded-lg w-5xl  h-130 flex flex-row justify-center items-center border-0">
                <section className="w-1/2 max-md:hidden bg-white rounded-s-lg h-full flex flex-col justify-center items-center">
                    <h1 className="text-5xl font-bold flex items-center gap-2">
                    <span className="text-yellow-500 text-6xl">👋</span> HOLA
                    </h1>
                    <p className="text-xl text-gray-600 leading-20 italic mt-2">¡Crea tu cuenta en segundos!</p>

                    <button className="bg-[#FDD383] cursor-pointer py-3 px-8 rounded-4xl 
                    transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:scale-95 hover:bg-gray-100">
                    Registrar
                    </button>
                </section>

                <section className="w-1/2 border-1  max-[768px]:w-full max-[768px]:mx-15 text-white border-gray-500 rounded-tr-lg rounded-br-lg  h-full flex justify-center items-center">
                    <form onSubmit={handleAutenticacion} className="w-full relative max-[768px]:w-auto  px-8">
                        <div className="flex justify-center -mt-0 mb-5">
                            <img src="https://img.freepik.com/fotos-premium/ilustracion-logotipo-leon-icono-emblema-leon-impresion-logotipografica_911620-21708.jpg" className="w-40 rounded-full" alt="logo" />
                        </div>
                        <h1 className="text-lg text-center mb-3">Inicie sesión para continuar</h1>
                        <div className="w-auto   relative flex justify-center items-center mb-4">
                            <Mail className="absolute right-2 max-[768px]:right-3" />
                            <input 
                            className="text-sm border rounded-sm border-gray-500 p-2 w-full transition-all duration-300 ease-in-out 
                                         focus:border-yellow-100 focus:ring-2 focus:ring-yellow-100" 
                            type="email" 
                            placeholder="Ingrese su correo" 
                            />
                        </div>

                        <div className="w-full  relative flex justify-center items-center mb-2">
                            <Lock className="absolute right-2 max-[768px]:right-3" />
                            <input 
                            className="text-sm border rounded-sm border-gray-500 p-2 w-full transition-all duration-300 ease-in-out 
                                         focus:border-yellow-100 focus:ring-2 focus:ring-yellow-100" 
                            type="password" 
                            placeholder="Ingrese su contraseña" 
                            />                        </div>
                        <div className="pl-0">
                            <NavLink to="/recoverpassword" className="text-xs text-white font-light hover:text-[#FDD383]" >¿ Olvidaste tu contraseña ?</NavLink>
                        </div>
                        <div className="my-2 text-xs flex justify-start items-center">
                            <input className="border rounded-sm p-1 mr-1 w-4 h-4" type="checkbox"/> Recordame
                        </div>
                        <div className="w-full text-center">
                            <button className="bg-[#FDD383]  hover:bg-gray-100 text-black cursor-pointer py-3 px-10 rounded-4xl 
                            transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:scale-95">
                            Iniciar Sesión
                            </button>
                        </div>
                        <p className="text-xs mt-5 text-center max-[768px]:text-xs  max-[768px]:mt-2  max-[768px]:text-center text-white">Copyright @2025 IDS Latam SAC - Control de Acceso + Cultura Digital</p>
                    </form>
                    
                </section>
                
            </div>
            

        </div>

    )
}