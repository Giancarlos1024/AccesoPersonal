import { useState, useContext } from "react";
import AsignacionListWithPagination from "../../components/ui/AsignacionListWithPagination";
import { AsignacionContext } from "../../context/AsignacionContextProvider";


export const AsignacionBeacons = () =>{
const {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    macToDelete,
    dniOptions,
    macBeacon,
    setMacToDelete,
    asignacionbeacons,
    handleDeleteBeacon,
    errors,
    status,
    statusdeletebeacon,
  } = useContext(AsignacionContext);


  // console.log("estado", status);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <section className="flex w-full gap-2">
        <div className="bg-white w-full p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Registro de Asignaciones</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                name="dni"
                list="dniList"
                value={formData.dni}
                onChange={handleChange}
                placeholder="DNI (8 digits)"
                className="p-2 border rounded w-full"
              />
             <datalist id="dniList">
                {dniOptions.map((option, index) => (
                <option key={index} value={option.DNI} />
                ))}
            </datalist>
              {errors.dni && <p className="text-red-500 text-sm">{errors.dni}</p>}
            </div>
            <input
                name="MacAddressiB"
                list="MacAddressiBList"
                value={formData.MacAddressiB}
                onChange={handleChange}
                placeholder="MacAddressiB"
                className={`p-2 border rounded w-full ${errors.MacAddressiB ? "border-red-500" : ""}`}
              />
              <datalist id="MacAddressiBList">
                {macBeacon.map((mac, index) => (
                <option key={index} value={mac.MacAddressiB} />
                ))}
            </datalist>
            {errors.MacAddressiB && <p className="text-red-500 text-sm">{errors.MacAddressiB}</p>}
          </div>
          <div className="mt-4 flex space-x-2">
            <button onClick={handleSubmit} className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded">
              Insertar
            </button>
          </div>
          {status && <div className="mt-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">{status}</div>}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Eliminar Asignación</h2>
          <input
            type="text"
            value={macToDelete}
            onChange={(e) => setMacToDelete(e.target.value)}
            placeholder="MAC asignacion"
            list="beaconsList"
            className="p-2 border rounded w-full mb-2"
          />
          {/* <datalist id="beaconsList">
            {asignacionbeacons.map((asignacion, index) => (
              <option key={index} value={asignacion.MacAddressiB} />
            ))}
          </datalist> */}
          <button
            onClick={handleDeleteBeacon}
            className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded mb-2"
          >
            Eliminar
          </button>
          {statusdeletebeacon && (
          <div className="p-2 bg-green-200 text-green-800 rounded-md mb-4">
            {statusdeletebeacon}
          </div>
          )}
        </div>
      </section>


      {/* TABLA */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold my-4 text-center">Lista de Asignaciones</h2>
        <AsignacionListWithPagination 
        asignacion={asignacionbeacons}
        totalItems={asignacionbeacons.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};
