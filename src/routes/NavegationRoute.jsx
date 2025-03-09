import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "../views/Login"
import { Dashboard } from "../views/Dashboard"

import '../assets/css/NavegationRoute.css'
import { NotFound } from "../views/NotFound"
import { HomeDashboard } from "../views/Dashboard/HomeDashboard"
import { Register } from "../views/Register"
import { EventosContextProvider } from "../context/EventosContextProvider"
import { PerfilHome } from "../views/PerfilHome"
import { Settings } from "../views/Settings"
import { AuthProvider } from "../context/AuthProvider"
import { UsuariosDashboard } from "../views/Dashboard/UsuariosDashboard"
import { UsersProvider } from "../context/UsersProvider"
import { BeaconsContextProvider } from "../context/BeaconsContextProvider"
import { BeaconsDashboard } from "../views/Dashboard/BeaconsDashboard"

export const NavegationRoute = () =>{

    return(
        <BrowserRouter>
            <AuthProvider>
            <EventosContextProvider>
                <UsersProvider>
                <BeaconsContextProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/registrar" element={<Register />} />
                    
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route index element={<HomeDashboard />} />
                        <Route path="personal" element={<h1>Personal en Mina</h1>} />
                        <Route path="asistencias" element={<h1>Marcador Asistencia</h1>} />
                        <Route path="perfil" element={<PerfilHome/>} />
                        <Route path="configuracion" element={<Settings/>} />
                        <Route path="registrartrabajadores" element={<UsuariosDashboard/>} />
                        <Route path="registrarbeacons" element={<BeaconsDashboard/>} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
                </BeaconsContextProvider>
                </UsersProvider>
            </EventosContextProvider>
            </AuthProvider>
        </BrowserRouter>
        
    )
}