import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "../../views/Login"
import { Dashboard } from "../../views/Dashboard"

import '../css/NavegationRoute.css'
import { NotFound } from "../../views/NotFound"

export const NavegationRoute = () =>{

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="personal" element={<h1>Personal en Mina</h1>} />
                    <Route path="asistencias" element={<h1>Marcador Asistencia</h1>} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}