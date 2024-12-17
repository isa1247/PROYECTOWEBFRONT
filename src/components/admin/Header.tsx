import React from 'react';

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <header
      aria-label="page caption"
      className="flex-none flex h-16 bg-gray-100 border-t px-4 items-center"
    >
      <h1 id="page-caption" className="font-semibold text-lg">{title}</h1>
    </header>
  );
}

export default Header;
