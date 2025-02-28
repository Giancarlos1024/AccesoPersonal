import { NavLink } from "react-router-dom"


export const Slader = () => {

    return(

        <nav>
            <NavLink to="/" >Login</NavLink>
            <NavLink to="dashboard" >Dashboard</NavLink>
            <NavLink to="personal" >Personal en Mina</NavLink>
            <NavLink to="asistencias" >Marcadores de Asistencias</NavLink>
        </nav>
    )
}