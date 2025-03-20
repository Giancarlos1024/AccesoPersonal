import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function HistorialListWithPagination({ historial, totalItems, currentPage, setCurrentPage, itemsPerPage, setModalOpen  }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    
    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/50 bg-opacity-50">
            <div className="bg-white p-5 mx-30 rounded-lg shadow-xl w-auto max-h-[100vh] relative">
                <h2 className="text-xl font-semibold mb-4 text-center">Lista de Historial</h2>
                <button
                    onClick={() => setModalOpen(false)}
                    className="absolute cursor-pointer text-xl right-5 top-0 mt-4 px-5 py-2 text-black rounded-lg transition duration-300"
                >
                    x
                </button>


                <table className="w-full border-collapse shadow-md ">
                        <thead>
                            <tr className="bg-sky-600 text-left">
                                <th className="px-4 py-3 text-white text-xs">Nombre</th>
                                <th className="px-4 py-3 text-white text-xs">DNI</th>
                                <th className="px-4 py-3 text-white text-xs">MAC</th>
                                <th className="px-4 py-3 text-white text-xs">Puesto</th>
                                <th className="px-4 py-3 text-white text-xs">Compañía</th>
                                <th className="px-4 py-3 text-white text-xs">Área</th>
                                <th className="px-4 py-3 text-white text-xs">Asistencia</th>
                                <th className="px-4 py-3 text-white text-xs">Fecha</th>
                                <th className="px-4 py-3 text-white text-xs">Punto de Control</th>
                                <th className="px-4 py-3 text-white text-xs">Tipo de Beacon</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historial && historial.length > 0 ? (
                                historial.map((item, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="px-4 py-2 text-xs">{item["NOMBRES Y APELLIDOS"]}</td>
                                        <td className="px-4 py-2 text-xs">{item.DNI}</td>
                                        <td className="px-4 py-2 text-xs">{item["MAC BEACON"]}</td>
                                        <td className="px-4 py-2 text-xs">{item.PUESTO}</td>
                                        <td className="px-4 py-2 text-xs">{item.COMPAÑIA}</td>
                                        <td className="px-4 py-2 text-xs">{item.AREA}</td>
                                        <td className="px-4 py-2 text-xs">{item.ASISTENCIA}</td>
                                        <td className="px-4 py-2 text-xs">{item.FECHA}</td>
                                        <td className="px-4 py-2 text-xs">{item["PUNTO CONTROL"]}</td>
                                        <td className="px-4 py-2 text-xs">{item["TIPO DE BEACON"]}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center py-4 text-gray-500">
                                        No hay datos disponibles
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>

                {/* Paginación */}
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between mt-4">
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                        <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of{' '}
                        <span className="font-medium">{totalItems}</span> results
                    </p>
                    <nav className=" inline-flex items-center space-x-0 border border-gray-300 rounded-lg">
                        {/* Botón Anterior */}
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="cursor-pointer px-3 py-2 rounded-l-lg border-r border-gray-300 disabled:opacity-50"
                        >
                            <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                        </button>

                        {/* Números de Página */}
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`cursor-pointer px-3 py-2 text-sm border-r border-gray-300 ${
                                    currentPage === index + 1 ? "cursor-pointer bg-cyan-500 text-white font-bold" : "text-gray-700"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        {/* Botón Siguiente */}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="cursor-pointer px-3 py-2 rounded-r-lg border-gray-300 disabled:opacity-50"
                        >
                            <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}
