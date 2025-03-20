import React from 'react';
import {
    LayoutDashboard,
    UserRoundPlus,
    CircleChevronRight,
    CircleChevronLeft,
    PackagePlus
} from "lucide-react";
import { NavLink } from 'react-router-dom';

export const Slader = ({ isCollapsed, setIsCollapsed }) => {
    const activeClass = "bg-cyan-500 text-white";
    const inactiveClass = "hover:bg-gray-200 text-gray-600";

    // Obtener el rol desde localStorage
    const role = localStorage.getItem("role");

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <aside className={`bg-white shadow-lg h-screen fixed flex flex-col items-center transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="flex items-center justify-around pt-6 pr-2">
                <div className="flex items-start space-x-1">
                    {!isCollapsed && <h2 className="text-xl font-medium pr-8">New Project</h2>}
                </div>
                <button onClick={toggleCollapse} className="text-gray-600 flex items-center pl-2 rounded-lg font-medium">
                    {isCollapsed ? <CircleChevronRight className='hover:text-sky-400 cursor-pointer' /> : <CircleChevronLeft className='text-sky-400 hover:text-gray-500 cursor-pointer' />}
                </button>
            </div>
            <nav className="mt-5">
                <ul className="space-y-2">
                    <li> 
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `flex items-center p-3 mx-3 text-xs rounded-lg font-medium ${isActive ? activeClass : inactiveClass}`
                            }
                            end
                        >
                            <LayoutDashboard className="mr-2 ml-2" />
                            {!isCollapsed && "Dashboard"}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/personal"
                            className={({ isActive }) =>
                                `flex items-center p-3 mx-3 text-xs rounded-lg font-medium ${isActive ? activeClass : inactiveClass}`
                            }
                        >
                            <UserRoundPlus className="mr-2 ml-2"/>
                            {!isCollapsed && "Personal en mina"}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/asistencias"
                            className={({ isActive }) =>
                                `flex items-center p-3 mx-3 text-xs rounded-lg font-medium ${isActive ? activeClass : inactiveClass}`
                            }
                        >
                            <PackagePlus className="mr-2 ml-2"/>
                            {!isCollapsed && "Marcadores de asistencia"}
                        </NavLink>
                    </li>

                    {/* Mostrar solo si el usuario es admin */}
                    {role === "admin" && (
                        <li>
                            <NavLink
                                to="/dashboard/registrartrabajadores"
                                className={({ isActive }) =>
                                    `flex items-center p-3 mx-3 text-xs rounded-lg font-medium ${isActive ? activeClass : inactiveClass}`
                                }
                            >
                                <PackagePlus className="mr-2 ml-2"/>
                                {!isCollapsed && "Registrar Trabajadores"}
                            </NavLink>
                        </li>

                        
                    )}

                    {role === "admin" && (
                        <li>
                            <NavLink
                                to="/dashboard/registrarbeacons"
                                className={({ isActive }) =>
                                    `flex items-center p-3 mx-3 text-xs rounded-lg font-medium ${isActive ? activeClass : inactiveClass}`
                                }
                            >
                                <PackagePlus className="mr-2 ml-2"/>
                                {!isCollapsed && "Registrar Beacons"}
                            </NavLink>
                        </li>
                    )}

                    {role === "admin" && (
                        <li>
                            <NavLink
                                to="/dashboard/asignacionbeacons"
                                className={({ isActive }) =>
                                    `flex items-center p-3 mx-3 text-xs rounded-lg font-medium ${isActive ? activeClass : inactiveClass}`
                                }
                            >
                                <PackagePlus className="mr-2 ml-2"/>
                                {!isCollapsed && "Registrar Asignaciones"}
                            </NavLink>
                        </li>
                    )}
                 
                    <li>
                        <NavLink
                            to="/dashboard/historial"
                            className={({ isActive }) =>
                                `flex items-center p-3 mx-3 text-xs rounded-lg font-medium ${isActive ? activeClass : inactiveClass}`
                            }
                        >
                            <PackagePlus className="mr-2 ml-2"/>
                            {!isCollapsed && "Historial"}
                        </NavLink>
                    </li>
                   
                </ul>
            </nav>
        </aside>
    );
};
