import { useState, useContext } from "react";
import { BeaconsContext } from "../../context/BeaconsContextProvider";
import BeaconListWithPagination from "../../components/ui/BeaconListWithPagination";



export const BeaconsDashboard = () => {
  const {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    macToDelete,
    setMacToDelete,
    beacons,
    handleDeleteBeacon,
    errors,
    status,
    statusdeletebeacon,
  } = useContext(BeaconsContext);
  const [searchTerm, setSearchTerm] = useState("");

  const beaconTypes = ["PERSONA", "UNIDAD MOVIL", "ACTIVOS", "OTROS"];

  // const filteredBeacons = beacons.filter(({ MacAddressiB, TypeBeacon }) =>
  //   [MacAddressiB, TypeBeacon].some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
  // );


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <section className="flex w-full gap-2">
        <div className="bg-white w-full p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Registrar Beacon</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                name="MacAddressiB"
                value={formData.MacAddressiB}
                onChange={handleChange}
                placeholder="MacAddressiB (Ej: C30000XXXXXX)"
                className={`p-2 border rounded w-full ${errors.MacAddressiB ? "border-red-500" : ""}`}
              />
              {errors.MacAddressiB && <p className="text-red-500 text-sm">{errors.MacAddressiB}</p>}
            </div>
            <select
              name="TypeBeacon"
              value={formData.TypeBeacon}
              onChange={handleChange}
              className={`p-2 border rounded w-full ${errors.TypeBeacon ? "border-red-500" : ""}`}
            >
              <option value="">Seleccione un tipo de Beacon</option>
              {beaconTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.TypeBeacon && <p className="text-red-500 text-sm">{errors.TypeBeacon}</p>}
          </div>
          <div className="mt-4 flex space-x-2">
            <button onClick={handleSubmit} className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded">
              Registrar
            </button>
            <button onClick={() => setFormData({ MacAddressiB: "", TypeBeacon: "" })} className="border cursor-pointer px-4 py-2 rounded">
              Limpiar
            </button>
          </div>
          {status && <div className="mt-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">{status}</div>}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Eliminar Beacon</h2>
          <input
            type="text"
            value={macToDelete}
            onChange={(e) => setMacToDelete(e.target.value)}
            placeholder="Ingrese la MAC del Beacon"
            list="beaconsList"
            className="p-2 border rounded w-full mb-2"
          />
          <datalist id="beaconsList">
            {beacons.map((beacon, index) => (
              <option key={index} value={beacon.MacAddressiB} />
            ))}
          </datalist>
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

      {/* BUSCADOR */}
      {/* <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por beacon o tipo..."
          className="w-full p-2 border rounded"
        />
      </div> */}

      {/* TABLA */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold my-4 text-center">Lista de Beacons</h2>
        <BeaconListWithPagination 
          beacons={beacons}
          totalItems={beacons.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};
