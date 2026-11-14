import React, { useState } from 'react';
import { Terminal, Laptop, HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';

export const ExecutionGuide: React.FC = () => {
  const [activeOS, setActiveOS] = useState<'windows' | 'mac' | 'linux'>('windows');

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Como Executar a Calculadora no seu Computador
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Passo a passo simples para você ver a janela abrir de verdade na sua máquina.
          </p>
        </div>

        {/* Operating System Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveOS('windows')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeOS === 'windows'
                ? 'bg-sky-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Windows
          </button>
          <button
            type="button"
            onClick={() => setActiveOS('mac')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeOS === 'mac'
                ? 'bg-sky-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            macOS
          </button>
          <button
            type="button"
            onClick={() => setActiveOS('linux')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeOS === 'linux'
                ? 'bg-sky-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Linux
          </button>
        </div>
      </div>

      {/* 3 Step Process Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        {/* Step 1 */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center text-xs">
                1
              </span>
              <span>Instalar o Python</span>
            </div>
            <h4 className="text-sm font-semibold text-white mb-2">
              Verifique se já tem o Python
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Abra o seu terminal e execute o comando abaixo para checar a versão:
            </p>
            <div className="mt-3 p-2.5 bg-slate-900 rounded font-mono text-xs text-amber-300 border border-slate-800">
              {activeOS === 'windows' ? 'python --version' : 'python3 --version'}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] text-slate-400">
            {activeOS === 'windows' ? (
              <span>⚠️ No instalador do Python, marque a caixa <strong>Add Python to PATH</strong>!</span>
            ) : (
              <span>Mac e Linux geralmente já incluem o Python 3 nativo.</span>
            )}
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center text-xs">
                2
              </span>
              <span>Salvar o Arquivo</span>
            </div>
            <h4 className="text-sm font-semibold text-white mb-2">
              Crie o arquivo calculadora.py
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clique no botão <strong>Baixar .py</strong> nesta página ou crie um novo arquivo com o nome <code>calculadora.py</code> e cole o código nele.
            </p>
            <div className="mt-3 p-2.5 bg-slate-900 rounded font-mono text-xs text-emerald-400 border border-slate-800">
              calculadora.py
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] text-slate-400">
            Pode usar o <strong>VS Code</strong>, <strong>IDLE</strong> (que vem com o Python) ou até o Bloco de Notas.
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center text-xs">
                3
              </span>
              <span>Executar o Script</span>
            </div>
            <h4 className="text-sm font-semibold text-white mb-2">
              Abra a janela no seu sistema
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              No terminal, navegue até a pasta do arquivo e digite:
            </p>
            <div className="mt-3 p-2.5 bg-slate-900 rounded font-mono text-xs text-sky-300 border border-slate-800">
              {activeOS === 'windows' ? 'python calculadora.py' : 'python3 calculadora.py'}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>A janela da calculadora surgirá na tela!</span>
          </div>
        </div>
      </div>

      {/* Linux Extra Note if Tkinter isn't preinstalled */}
      {activeOS === 'linux' && (
        <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/50 text-xs text-sky-200 flex items-start gap-3 mt-4">
          <AlertCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-sky-300 mb-1">Atenção no Ubuntu / Debian / Fedora:</strong>
            Algumas distribuições Linux separam o Tkinter. Se der erro de <code>ModuleNotFoundError: No module named 'tkinter'</code>, instale com:{' '}
            <code className="bg-slate-900 px-2 py-0.5 rounded text-amber-300 font-mono">
              sudo apt-get install python3-tk
            </code>
          </div>
        </div>
      )}
    </div>
  );
};
