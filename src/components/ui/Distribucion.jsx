import React,{ useEffect, useState } from "react";


export const Distribucion = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false); // Estado para manejar la expansión

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/distribucion`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return response.json();
      })
      .then((responseData) => {
        if (Array.isArray(responseData)) {
          setData(responseData);
        } else {
          console.error("La respuesta no es un array:", responseData);
          setData([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-2 w-full mx-auto">
      <h1 className="uppercase mb-2">Distribución por Ubicación</h1>
      <table className="border-collapse border border-gray-300 text-gray-600 w-full">
        <thead>
          <tr className="bg-gray-100 text-xs">
            <th className="border border-gray-300 px-4 py-2">Ubicación</th>
            <th className="border border-gray-300 px-4 py-2">Total Personas</th>
            <th className="border border-gray-300 px-4 py-2">Ingresos de Personal</th>
            <th className="border border-gray-300 px-4 py-2">Personal en Otras Áreas</th>
            <th className="border border-gray-300 px-4 py-2">Total de UM</th>
            <th className="border border-gray-300 px-4 py-2">Ingresos de UM</th>
            <th className="border border-gray-300 px-4 py-2">UM en Otras Áreas</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <React.Fragment key={index}>
                {/* Fila principal */}
                <tr
                  className="hover:bg-gray-50 text-xs cursor-pointer"
                  onClick={() => setExpanded(expanded === index ? null : index)}
                >
                  <td className="text-[12px] text-cyan-600 border border-gray-300 px-4 py-2 text-center">Animon</td>
                  <td className="text-[12px] border border-gray-300 px-4 py-2 text-center">{item.total_personas}</td>
                  <td className="text-[12px] border border-gray-300 px-4 py-2 text-center">{item.entrada_personas}</td>
                  <td className="text-[12px] border border-gray-300 px-4 py-2 text-center">{item.salida_personas}</td>
                  <td className="text-[12px] border border-gray-300 px-4 py-2 text-center">{item.total_unidades_moviles}</td>
                  <td className="text-[12px] border border-gray-300 px-4 py-2 text-center">{item.entrada_unidades_moviles}</td>
                  <td className="text-[12px] border border-gray-300 px-4 py-2 text-center">{item.salida_unidades_moviles}</td>
                </tr>
                
               
                {/* {expanded === index && (
                  <tr className="bg-gray-50 text-xs">
                    <td className="text-[9px] text-gray-500 border border-gray-200 px-4 py-2 text-center">Bocamina Terry</td>
                    <td className="text-[9px] text-gray-500 border border-gray-200 px-4 py-2 text-center">{item.total_personas}</td>
                    <td className="text-[9px] text-gray-500 border border-gray-200 px-4 py-2 text-center">{item.entrada_personas}</td>
                    <td className="text-[9px] text-gray-500 border border-gray-200 px-4 py-2 text-center">{item.salida_personas}</td>
                    <td className="text-[9px] text-gray-500 border border-gray-200 px-4 py-2 text-center">{item.total_unidades_moviles}</td>
                    <td className="text-[9px] text-gray-500 border border-gray-200 px-4 py-2 text-center">{item.entrada_unidades_moviles}</td>
                    <td className="text-[9px] text-gray-500 border border-gray-200 px-4 py-2 text-center">{item.salida_unidades_moviles}</td>
                  </tr>
                )} */}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4 text-gray-500">
                No hay datos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
