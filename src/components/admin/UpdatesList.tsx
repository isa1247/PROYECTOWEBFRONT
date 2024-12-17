import React from 'react';

interface Update {
  icon: string;
  title: string;
  subject: string;
  description: string;
  time: string;
}

interface UpdatesListProps {
  updates: Update[];
}

function UpdatesList({ updates }: UpdatesListProps) {
  return (
    <section className="flex flex-col p-4 w-full max-w-sm flex-none bg-gray-100 min-h-0 overflow-auto">
      <h1 className="font-semibold mb-3">Últimas Actualizaciones</h1>
      <ul>
        {updates.map((update, index) => (
          <li key={index}>
            <article
              tabIndex={0}
              className="cursor-pointer border rounded-md p-3 bg-white flex text-gray-700 mb-2 hover:border-green-500 focus:outline-none"
            >
              <span className="flex-none pt-1 pr-2">
                <img
                  className="h-8 w-8 rounded-md"
                  src={update.icon}
                  alt="Icono"
                />
              </span>
              <div className="flex-1">
                <header className="mb-1">
                  {update.title}{' '}
                  <span className="font-semibold">"{update.subject}"</span>
                </header>
                <p className="text-gray-600">{update.description}</p>
                <footer className="text-gray-500 mt-2 text-sm">
                  {update.time}
                </footer>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default UpdatesList;
