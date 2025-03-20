import { useState, useEffect, createContext } from "react";

export const UsersContext = createContext();
export const UsersProvider = ({ children }) => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    firstname: "",
    secondname: "",
    lastname: "",
    secondlastname: "",
    dni: "",
    company: "",
    position: "",
    area:""
  });
  const [dniToDelete, setDniToDelete] = useState("");
  const [dniOptions, setDniOptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [historial1, setHistorial1] = useState([]);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [statusdeleteworker, setStatusdeleteworker] = useState("");

  // Función para obtener la lista de DNIs (para el datalist)
  const fetchDniOptions = async () => {
    try {
      const response = await fetch(`${apiUrl}/get-dnis`);
      const data = await response.json();
      setDniOptions(data);
    } catch (error) {
      console.error("Error fetching DNI options:", error);
    }
  };
  // Función para obtener la lista completa de usuarios
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${apiUrl}/get-users`);
      const data = await response.json();
      setUsers(data); // Forzar actualización de estado
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchDniOptions();
    fetchUsers();
  }, []);
  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstname) newErrors.firstname = "First name is required.";
    if (!formData.lastname) newErrors.lastname = "Last name is required.";
    if (!formData.secondlastname) newErrors.secondlastname = "Second last name is required.";
    if (!formData.dni) {
      newErrors.dni = "DNI is required.";
    } else if (!/^[0-9]{8}$/.test(formData.dni)) {
      newErrors.dni = "DNI must be exactly 8 digits.";
    }
    if (!formData.company) newErrors.company = "Company is required.";
    if (!formData.position) newErrors.position = "Position is required.";
    if (!formData.area) newErrors.area = "Area is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      const response = await fetch(`${apiUrl}/registro-usuario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Error en el registro.");
      }
  
      setStatus(data.message || "Usuario registrado con éxito");
      setFormData({
        firstname: "",
        secondname: "",
        lastname: "",
        secondlastname: "",
        dni: "",
        company: "",
        position: "",
        area: "",
      });
  
      // Esperar a que fetchUsers termine antes de continuar
      await fetchUsers();
      await fetchDniOptions();
  
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      console.error("Error en el registro:", error);
      setStatus(error.message);
    }
  };
  const handleDelete = async () => {
    if (!dniToDelete || !/^[0-9]{8}$/.test(dniToDelete)) {
      setStatus("Ingrese un DNI válido");
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/delete-user/${dniToDelete}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("No se pudo eliminar el usuario");
      }
      setStatusdeleteworker("Worker eliminado con éxito");
      setDniToDelete("");
  
      // Esperar a que fetchUsers termine antes de continuar
      await fetchUsers();
      await fetchDniOptions();
    } catch (error) {
      setStatus(error.message);
    }
  
    setTimeout(() => setStatusdeleteworker(""), 3000);
  };
  const handleSearch = async (filters) => {
    try {
        const response = await fetch(`${apiUrl}/historial`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filters),
        });

        if (!response.ok) throw new Error("Error en la búsqueda");

        const data = await response.json();
        console.log("Resultados obtenidos:", data);

        if (Array.isArray(data)) {
            setHistorial1([...data]); // ✅ Asegurar nuevo array para forzar re-renderizado
        } else {
            setHistorial1([]); // Evitar estado no definido
        }
    } catch (error) {
        console.error("Error en la búsqueda:", error);
    }
  };



  const fetchHistorial = async () => {
    try {
        const response = await fetch(`${apiUrl}/dhistorial`);
        if (!response.ok) throw new Error("Error al obtener historial");

        const data = await response.json();
        console.log("Datos obtenidos de la API:", data);

        if (Array.isArray(data)) {
            setHistorial1([...data]); // ✅ Asegurar nuevo array
        } else {
            console.warn("La API no devolvió una lista de resultados:", data);
        }
    } catch (error) {
        console.error("Error en fetchHistorial:", error);
    }
  };

  useEffect(() => {
      fetchHistorial();
  }, []);

  
  return (
    <UsersContext.Provider
      value={{
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
        handleDelete,
        handleSearch,
        historial1,
        fetchUsers
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
