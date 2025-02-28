import { Outlet } from "react-router-dom"
import { Slader } from "../components/ui/SladerOp"


export const Dashboard = () => {
    
    return(

        <div>
            <Slader />
            <div>
                <Outlet />
            </div>
        </div>
    )
}