import React from 'react';
import { Download } from 'lucide-react';
import { pythonCalculatorCodeBasic } from '../data/pythonCodes';

export const Navbar: React.FC = () => {
  const handleDownloadPy = () => {
    const blob = new Blob([pythonCalculatorCodeBasic], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calculadora.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-sky-400 transition-colors"
        >
          PythonCalc Studio
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <a
            href="#simulador"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Simulador
          </a>
          <a
            href="#codigo"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Código
          </a>
          <a
            href="#anatomia"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Anatomia
          </a>
          <a
            href="#executar"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Como Executar
          </a>
          <a
            href="#desafios"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Desafios
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleDownloadPy}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-500 transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar calculadora.py</span>
          </button>
        </div>
      </div>
    </header>
  );
};
