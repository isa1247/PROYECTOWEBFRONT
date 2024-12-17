import React from 'react';

interface StatsProps {
  materiasCount: number;
  docentesCount: number;
}

function Stats({ materiasCount, docentesCount }: StatsProps) {
  return (
    <nav className="bg-gray-100 flex p-4">
      {/* Estadísticas o pestañas */}
      <section
        aria-labelledby="stats-tabs-label"
        className="mr-4 focus:outline-none"
      >
        <label
          id="stats-tabs-label"
          className="font-semibold block mb-1 text-sm"
        >
          Estadísticas
          <span className="font-normal text-gray-700">(actual)</span>
        </label>
        <ul className="flex">
          <li>
            <button className="focus:outline-none p-2 rounded-l-md border border-r-0 bg-white flex flex-col items-center w-24">
              <p className="font-semibold text-lg">{materiasCount}</p>
              <p className="text-sm uppercase text-gray-600">Materias</p>
            </button>
          </li>
          <li>
            <button className="focus:outline-none p-2 border rounded-r-md bg-white flex flex-col items-center w-24">
              <p className="font-semibold text-lg">{docentesCount}</p>
              <p className="text-sm uppercase text-gray-600">Docentes</p>
            </button>
          </li>
          {/* Agrega más elementos si es necesario */}
        </ul>
      </section>
    </nav>
  );
}

export default Stats;
