import { RotateCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApi } from '../../context/EventosContextProvider'; // Importar el contexto

export const Header = () => {
    const { fetchEventos } = useApi(); // Obtener la función que recarga los datos

    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [period, setPeriod] = useState('');
    const [interval, setIntervalTime] = useState(5); // Intervalo en minutos

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            const period = hours >= 12 ? 'PM' : 'AM';
            const hours12 = hours % 12 || 12;

            setTime(`${hours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            setPeriod(period);
        };

        updateTime();
        const clockInterval = setInterval(updateTime, 1000);

        return () => clearInterval(clockInterval);
    }, []);

    useEffect(() => {
      if (interval) {
          const newTimer = setInterval(() => {
              console.log(`Actualizando datos cada ${interval} minutos...`);
              refreshData(); // Asegúrate de que está definida
          }, interval * 60000);
  
          return () => clearInterval(newTimer);
      }
    }, [interval]);
  

    const refreshData = () => {
        console.log('Recargando los datos...');
        fetchEventos(); // Llamar manualmente a la API cuando se haga clic en el botón
    };

    return (
        <div className="flex justify-between items-center bg-white shadow-md rounded-lg mb-4 p-3 mt-4 w-full">
            <h1 className="text-2xl font-semibold text-gray-500">
                Personal en Mina | <span className="text-xs">Protocolo AAAA</span>
            </h1>
            <span className="text-4xl text-gray-600">
                {time} <span className="text-lg font-medium">{period}</span>
            </span>
            <div className="flex space-x-4 items-center">
                <select
                    value={interval}
                    onChange={(e) => setIntervalTime(Number(e.target.value))}
                    className="bg-gray-100 text-gray-800 border px-4 py-2 rounded-md"
                >
                    <option value={5}>5 minutos</option>
                    <option value={10}>10 minutos</option>
                </select>
                <RotateCw
                    size={44}
                    strokeWidth={2.25}
                    onClick={refreshData}
                    className="text-white bg-cyan-500 p-1.5 w-15 rounded-xs cursor-pointer 
                               hover:bg-cyan-400 hover:scale-105 transition-all duration-200 
                               active:opacity-50"
                />
            </div>
        </div>
    );
};
