import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";
import { getApiUrl } from "../../Config";

interface Tarea {
  id: number;
  nombre: string;
}

interface Entrega {
  tarea_id: number;
  calificacion: number | null; // Permitir null para entregas no calificadas
  estudiante?: string; // Solo para la vista del profesor
}

interface DatosProfesor {
  estudiante: string;
  entregas: Entrega[];
  promedio_final: number;
}

// Mover la configuración de axiosInstance fuera del componente
const token = localStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: getApiUrl(""),
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const Calificaciones: React.FC = () => {
  const [esProfesor, setEsProfesor] = useState(false);
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [datosProfesor, setDatosProfesor] = useState<DatosProfesor[]>([]);
  const [entregasEstudiante, setEntregasEstudiante] = useState<Entrega[]>([]);
  const [promedioEstudiante, setPromedioEstudiante] = useState<number | null>(
    null
  );

  useEffect(() => {
    const rol = localStorage.getItem("rol");
    setEsProfesor(rol === "profesor");

    const fetchData = async () => {
      try {
        // Obtener las tareas
        const tareasResponse = await axiosInstance.get("/tareas");
        // Use tareasResponse.data.data instead of tareasResponse.data directly
        const tareasData = tareasResponse.data.data.map((tarea: any) => ({
          id: tarea.id,
          nombre: tarea.titulo // Note: changed from 'nombre' to 'titulo'
        }));
        setTareas(tareasData);
        console.log("Tareas Data:", tareasData);

        // Obtener las entregas calificadas
        const entregasResponse = await axiosInstance.get("/calificaciones");

        if (rol === "profesor") {
          // Procesar datos para el profesor
          const datos = Object.entries(entregasResponse.data.datos).map(
            ([key, estudiante]: any) => ({
              estudiante: estudiante.estudiante,
              entregas: estudiante.entregas,
              promedio_final: estudiante.promedio_final
            })
          );

          setDatosProfesor(datos);
          console.log("Datos Profesor:", datos);
        } else {

          // Procesar datos para el estudiante
          console.log("Entregas Response:", entregasResponse.data);

          // Acceder directamente a la propiedad entregas
          const entregasData = entregasResponse.data.entregas.map((entrega: any) => ({
            tarea_id: entrega.tarea_id,
            calificacion: entrega.calificacion
          }));

          setEntregasEstudiante(entregasData);
          console.log("Entregas Estudiante:", entregasData);

          const promedio = entregasResponse.data.promedio;
          setPromedioEstudiante(parseFloat(promedio.toFixed(2)));

          console.log("Entregas Estudiante:", entregasData);
          console.log("Promedio Estudiante:", promedio);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);
  if (esProfesor) {
    return (
      <div className="container mx-auto p-6">
        <Navbar />
        <br />
        <br />
        <br />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-center text-2xl font-bold mb-6">
            Calificaciones - Vista del Profesor
          </h1>

          {/* Boton para sacar excel */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Descargar Excel
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-2">Nombre del Alumno</th>
                {tareas.map((tarea) => (
                  <th key={tarea.id} className="px-4 py-2">
                    {tarea.nombre}
                  </th>
                ))}
                <th className="px-4 py-2">Promedio Final</th>
              </tr>
            </thead>
            <tbody>
              {datosProfesor.map((dato, index) => (
                <tr
                  key={index}
                  className="odd:bg-gray-100 even:bg-white hover:bg-gray-200"
                >
                  <td className="border px-4 py-2">{dato.estudiante}</td>
                  {tareas.map((tarea) => {
                    const entrega = dato.entregas.find(
                      (e) => e.tarea_id === tarea.id
                    );
                    return (
                      <td key={tarea.id} className="border px-4 py-2 text-center">
                        {entrega ? (
                          entrega.calificacion
                        ) : (
                          <input
                            type="text"
                            disabled
                            placeholder="No calificado"
                            className="w-full text-center border border-gray-300"
                          />
                        )}
                      </td>
                    );
                  })}
                  <td className="border px-4 py-2 text-center">
                    {dato.promedio_final}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Navbar />
      <br />
      <br />
      <h1 className="text-center text-2xl font-bold mb-6">
        Calificaciones - Vista del Estudiante
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-2">Tarea</th>
              <th className="px-4 py-2">Nota</th>
            </tr>
          </thead>
          <tbody>
            {tareas.map((tarea) => {
              const entrega = entregasEstudiante.find(
                (e) => e.tarea_id === tarea.id
              );
              return (
                <tr
                  key={tarea.id}
                  className="odd:bg-gray-100 even:bg-white hover:bg-gray-200"
                >
                  <td className="border px-4 py-2">{tarea.nombre}</td>
                  <td className="border px-4 py-2 text-center">
                    {entrega ? (
                      entrega.calificacion
                    ) : (
                      <input
                        type="text"
                        disabled
                        placeholder="No calificado"
                        className="w-full text-center border border-gray-300"
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {promedioEstudiante !== null && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-bold">
            Promedio General: {promedioEstudiante}
          </h3>
        </div>
      )}
    </div>
  );
};

export default Calificaciones;