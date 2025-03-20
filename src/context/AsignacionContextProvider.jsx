
import { useState, useEffect, createContext, useCallback } from "react";

export const AsignacionContext = createContext();

export const AsignacionContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    dni: "",
    MacAddressiB: "",
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  const [macToDelete, setMacToDelete] = useState("");
  const [asignacionbeacons, setAsignacionBeacons] = useState([]); 
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [dniOptions, setDniOptions] = useState([]);
  const [macBeacon, setMacbeacon] = useState([]);

  const [statusdeletebeacon, setStatusdeletebeacon] = useState("");

    // 🚀 Mejor manejo de errores en `fetchBeacons`
   
    const fetchAsignacion = useCallback(async () => {
      try {
        const response = await fetch(`${apiUrl}/get-asignacion`);
        const data = await response.json();
        setAsignacionBeacons(data);
      } catch (error) {
        console.error("Error fetching asignaciones:", error);
      }
    }, [apiUrl]);
    
    useEffect(() => {
      fetchAsignacion();
    }, []);
    
  

    // Función para obtener la lista de DNIs (para el datalist)
    const fetchDniOptions = async () => {
        try {
        const response = await fetch(`${apiUrl}/get-dnis2`);
        const data = await response.json();
        setDniOptions(data);
        } catch (error) {
        console.error("Error fetching DNI options:", error);
        }
    };

     // Función para obtener la lista de DNIs (para el datalist)
     const fetchMacBeacon = async () => {
        try {
        const response = await fetch(`${apiUrl}/get-macbeacon`);
        const data = await response.json();
        setMacbeacon(data);
        } catch (error) {
        console.error("Error fetching DNI options:", error);
        }
    };

    useEffect(() => {
        fetchDniOptions();
        fetchMacBeacon();
    }, []);

  // 📌 Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // 📌 Validación separada para mayor claridad
  const validateForm = () => {
    let newErrors = {};
    const { dni, MacAddressiB } = formData;

    if (!dni) {
      newErrors.dni = "El campo DNI es obligatorio.";
    } else if (dni.length !== 8) {
      newErrors.dni = "Debe tener 8 caracteres.";
    }
    

    if (!MacAddressiB) {
        newErrors.MacAddressiB = "El campo MacAddressiB es obligatorio.";
    } else if (MacAddressiB.length !== 12 || !MacAddressiB.startsWith("C30000")) {
    newErrors.MacAddressiB = "Debe tener 12 caracteres y empezar con 'C30000'.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //📌 Enviar datos al backend (con mejor manejo de errores)
  
  const handleSubmit = async () => {
    try {
        const response = await fetch(`${apiUrl}/registroab`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        console.log("Raw response:", response);

        const data = await response.json();
        console.log("Response JSON:", data);

        if (!response.ok) {
            throw new Error(data.message || "Error en el registro.");
        }

        setStatus(data.message || "Asignación registrada con éxito");
        setFormData({
            dni: "",
            MacAddressiB: "",
        });

        await fetchAsignacion();

        setTimeout(() => setStatus(""), 3000);
    } catch (error) {
        console.error("Error en el registro:", error);
        setStatus(error.message);
    }
  };


  const handleDeleteBeacon = async () => {
    if (!macToDelete.trim()) {
      alert("Por favor, ingresa una dirección MAC válida.");
      return;
    }
  
    const macNormalized = macToDelete.trim().toUpperCase();
  
    try {
      const response = await fetch(`${apiUrl}/deleteasigb/${macNormalized}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("No se pudo eliminar la asignación");
      }
  
      setStatusdeletebeacon("Asignación eliminada con éxito");
      setMacToDelete("");
  
      // ⚡ Recargar datos después de la eliminación
      await fetchAsignacion();
  
    } catch (error) {
      console.error("Error eliminando asignación:", error);
      alert("Ocurrió un error eliminando la asignación. Intenta nuevamente.");
    }
  
    setTimeout(() => setStatusdeletebeacon(""), 3000);
  };
  
  return (
    <AsignacionContext.Provider value={{ 
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
        statusdeletebeacon }}>
      {children}
    </AsignacionContext.Provider>
  );
};
