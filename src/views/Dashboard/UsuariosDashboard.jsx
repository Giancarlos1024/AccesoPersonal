import { useContext, useState } from "react";
import { UsersContext } from "../../context/UsersProvider";
import UserListWithPagination from "../../components/ui/UserListWithPagination";


export const UsuariosDashboard = () => {
  const {
    formData,
    setFormData,
    dniToDelete,
    setDniToDelete,
    dniOptions,
    users,
    errors,
    status,
    statusdeleteworker,
    handleChange,
    handleSubmit,
    handleDelete
  } = useContext(UsersContext);

  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //  // Filtrar usuarios por cualquier campo (ignorando mayúsculas/minúsculas)
  //  const filteredUsers = usersArray.length > 0 ? usersArray.filter((user) => {
  //   const term = searchTerm.toLowerCase();
  //   return (
  //     (user.FirstName && user.FirstName.toLowerCase().includes(term)) ||
  //     (user.SecondName && user.SecondName.toLowerCase().includes(term)) ||
  //     (user.LastName && user.LastName.toLowerCase().includes(term)) ||
  //     (user.SecondLastName && user.SecondLastName.toLowerCase().includes(term)) ||
  //     (user.DNI && user.DNI.toLowerCase().includes(term)) ||
  //     (user.Company && user.Company.toLowerCase().includes(term)) ||
  //     (user.Position && user.Position.toLowerCase().includes(term))
  //   );
  // }) : [];


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      <section className="flex w-full gap-2">
        <div className="bg-white w-full p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Registrar Workers</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* ... (los inputs del formulario de registro) */}
            <div>
              <input
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="First Name"
                className="p-2 border rounded w-full"
              />
              {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
            </div>
            <div>
              <input
                name="secondname"
                value={formData.secondname}
                onChange={handleChange}
                placeholder="Second Name"
                className="p-2 border rounded w-full"
              />
            </div>
            <div>
              <input
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                className="p-2 border rounded w-full"
              />
              {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
            </div>
            <div>
              <input
                name="secondlastname"
                value={formData.secondlastname}
                onChange={handleChange}
                placeholder="Second Last Name"
                className="p-2 border rounded w-full"
              />
              {errors.secondlastname && <p className="text-red-500 text-sm">{errors.secondlastname}</p>}
            </div>
            <div>
              <input
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                placeholder="DNI (8 digits)"
                className="p-2 border rounded w-full"
              />
              {errors.dni && <p className="text-red-500 text-sm">{errors.dni}</p>}
            </div>
            <div>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company"
                className="p-2 border rounded w-full"
              />
              {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
            </div>
            <div>
              <input
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Position"
                className="p-2 border rounded w-full"
              />
              {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
            </div>
            <div >
              <input
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Area"
                className="p-2 border rounded w-full"
              />
              {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button onClick={handleSubmit} className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded">
              Enviar
            </button>
            <button
              onClick={() => {
                setFormData({
                  firstname: "",
                  secondname: "",
                  lastname: "",
                  secondlastname: "",
                  dni: "",
                  company: "",
                  position: "",
                  area:""
                });
                setErrors({});
                setStatus("");
              }}
              className="border cursor-pointer px-4 py-2 rounded"
            >
              Limpiar
            </button>
          </div>
          {status && (
            <div className="mt-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
              {status}
            </div>
          )}
        </div>
        
        <div className="bg-white w-1/3 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Eliminar Worker</h2>
          <input
            type="text"
            list="dniList"
            value={dniToDelete}
            onChange={(e) => setDniToDelete(e.target.value)}
            placeholder="User DNI"
            className="p-2 border rounded w-full mb-2"
          />
          <datalist id="dniList">
            {dniOptions.map((option, index) => (
              <option key={index} value={option.DNI} />
            ))}
          </datalist>
          <button onClick={handleDelete} className="bg-blue-500 cursor-pointer  text-white px-4 py-2 rounded mb-2">
            Eliminar
          </button>
          {statusdeleteworker && (
          <div className="p-2 bg-green-200 text-green-800 rounded-md mb-4">
            {statusdeleteworker}
          </div>
          )}
        </div>
       
      </section>
      {/* <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre, DNI, empresa o cargo..."
          className="w-full p-2 border rounded"
        />
      </div> */}

      {/* Tabla de Usuarios */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Lista de Workers</h2>

        <UserListWithPagination
          users={users}
          totalItems={users.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />


      </div>

    </div>
  );
};
