

import React, { createContext, useContext, useState, useEffect } from "react";

// Creamos el contexto para las APIs
const EventosContext = createContext();

// Creamos un hook para consumir el contexto
export const useApi = () => {
  return useContext(EventosContext);
};

// Proveedor que va a envolver la aplicación
export const EventosContextProvider = ({ children }) => {
  const [datosSuperficie, setDatosSuperficie] = useState([]);
  const [datosInteriorMina, setDatosInteriorMina] = useState([]);

  // console.log("datos provenientes de eventos", datosSuperficie);

  const apiUrl = import.meta.env.VITE_API_URL;

  // Función para obtener los eventos desde la API
  const fetchEventos = async () => {
    try {
      const response = await fetch(`${apiUrl}/eventos`);
      const dataEventos = await response.json();
      // console.log("datos de eventos",dataEventos);

      // Filtrar los eventos que pertenecen a "SUPERFICIE"
      const eventosSuperficie = dataEventos.filter(
        (evento) => evento.MacAddressGw === "SUPERFICIE"
      );

      // Filtrar los eventos que pertenecen a "INTERIOR MINA"
      const eventosInteriorMina = dataEventos.filter(
        (evento) => evento.MacAddressGw === "INTERIOR MINA"
      );

      setDatosSuperficie(eventosSuperficie);
      setDatosInteriorMina(eventosInteriorMina);
    } catch (error) {
      console.error("Error al obtener eventos:", error);
    }
  };

  // Llamamos a fetchEventos inicialmente y luego cada 1 segundo
  useEffect(() => {
    fetchEventos(); // Llamar a la API inicialmente

    const intervalId = setInterval(fetchEventos, 10000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <EventosContext.Provider value={{ datosSuperficie, datosInteriorMina,fetchEventos }}>
      {children}
    </EventosContext.Provider>
  );
};

