import React, { useState, useEffect } from 'react';
import { RotateCcw, Delete, Terminal, Sparkles, Check, Info } from 'lucide-react';

interface InteractiveCalculatorProps {
  onInspectElement?: (elementId: string) => void;
  activeInspected?: string | null;
}

export const InteractiveCalculator: React.FC<InteractiveCalculatorProps> = ({
  onInspectElement,
  activeInspected,
}) => {
  const [expression, setExpression] = useState<string>('0');
  const [lastCalculation, setLastCalculation] = useState<string | null>(null);
  const [log, setLog] = useState<string>('janela.mainloop() aguardando cliques...');
  const [hasError, setHasError] = useState<boolean>(false);
  const [inspectMode, setInspectMode] = useState<boolean>(true);

  // Helper to append character
  const handleButton = (val: string) => {
    setHasError(false);
    if (val === 'C') {
      setExpression('0');
      setLastCalculation(null);
      setLog('limpar() -> visor.delete(0, tk.END)');
      return;
    }

    if (val === '⌫') {
      if (expression.length <= 1 || expression === '0' || hasError) {
        setExpression('0');
      } else {
        setExpression((prev) => prev.slice(0, -1));
      }
      setLog('visor.delete(len(visor.get()) - 1, tk.END)');
      return;
    }

    if (val === '=') {
      try {
        const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/');
        // Check for division by zero
        if (sanitized.includes('/0') && !sanitized.includes('/0.')) {
          setHasError(true);
          setExpression('Erro: Div/0');
          setLog('ZeroDivisionError: Não é possível dividir por zero!');
          return;
        }

        // Safe basic math evaluator for standard arithmetic
        // eslint-disable-next-line no-new-func
        const result = Function(`'use strict'; return (${sanitized})`)();
        const formatted = Number.isFinite(result) ? String(Number(result.toFixed(6))) : 'Erro';
        
        setLastCalculation(expression + ' = ' + formatted);
        setExpression(formatted);
        setLog(`eval("${sanitized}") -> ${formatted}`);
      } catch {
        setHasError(true);
        setExpression('Erro');
        setLog('SyntaxError: Expressão matemática inválida!');
      }
      return;
    }

    if (val === '%') {
      try {
        const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/');
        // eslint-disable-next-line no-new-func
        const evaluated = Function(`'use strict'; return (${sanitized})`)();
        const percentResult = evaluated / 100;
        const formatted = Number.isFinite(percentResult) ? String(Number(percentResult.toFixed(6))) : 'Erro';
        setLastCalculation(`${expression}% = ${formatted}`);
        setExpression(formatted);
        setLog(`porcentagem(${expression}) -> ${formatted}`);
      } catch {
        setHasError(true);
        setExpression('Erro');
        setLog('Erro: Expressão inválida para porcentagem!');
      }
      return;
    }

    // Adding digit or operator
    setExpression((prev) => {
      if (prev === '0' && !['+', '-', '*', '/', '.', '(', ')'].includes(val)) {
        return val;
      }
      if (hasError) {
        return val;
      }
      return prev + val;
    });

    setLog(`clicar("${val}") -> visor.insert(tk.END, "${val}")`);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture if user is typing in an input
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') {
        return;
      }

      if (/^[0-9]$/.test(e.key)) {
        handleButton(e.key);
      } else if (['+', '-', '*', '/'].includes(e.key)) {
        handleButton(e.key);
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleButton('=');
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleButton('⌫');
      } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
        handleButton('C');
      } else if (e.key === '.' || e.key === ',') {
        handleButton('.');
      } else if (e.key === '%') {
        handleButton('%');
      } else if (e.key === '(' || e.key === ')') {
        handleButton(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expression, hasError]);

  const buttonRows = [
    [
      { label: 'C', type: 'clear', pythonAction: 'limpar()' },
      { label: '⌫', type: 'delete', pythonAction: 'visor.delete(len-1)' },
      { label: '%', type: 'percent', pythonAction: 'porcentagem()' },
      { label: '/', type: 'operator', pythonAction: 'clicar("/")' },
    ],
    [
      { label: '7', type: 'num', pythonAction: 'clicar("7")' },
      { label: '8', type: 'num', pythonAction: 'clicar("8")' },
      { label: '9', type: 'num', pythonAction: 'clicar("9")' },
      { label: '*', type: 'operator', pythonAction: 'clicar("*")' },
    ],
    [
      { label: '4', type: 'num', pythonAction: 'clicar("4")' },
      { label: '5', type: 'num', pythonAction: 'clicar("5")' },
      { label: '6', type: 'num', pythonAction: 'clicar("6")' },
      { label: '-', type: 'operator', pythonAction: 'clicar("-")' },
    ],
    [
      { label: '1', type: 'num', pythonAction: 'clicar("1")' },
      { label: '2', type: 'num', pythonAction: 'clicar("2")' },
      { label: '3', type: 'num', pythonAction: 'clicar("3")' },
      { label: '+', type: 'operator', pythonAction: 'clicar("+")' },
    ],
    [
      { label: '0', type: 'num', pythonAction: 'clicar("0")' },
      { label: '.', type: 'num', pythonAction: 'clicar(".")' },
      { label: '(', type: 'paren', pythonAction: 'clicar("(")' },
      { label: '=', type: 'equals', pythonAction: 'calcular()' },
    ],
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Simulation Top Bar Controls */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="font-semibold text-slate-200">Simulador Python Tkinter</span>
          <span>·</span>
          <span>Interativo em Tempo Real</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setInspectMode(!inspectMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors ${
              inspectMode
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Destaque os componentes de código ao passar o mouse"
          >
            <Info className="w-3.5 h-3.5" />
            <span>{inspectMode ? 'Modo Raio-X Ativo' : 'Modo Raio-X'}</span>
          </button>
        </div>
      </div>

      {/* Main Tkinter Window Mockup */}
      <div className="flex-1 flex flex-col items-center justify-center py-2">
        <div
          className={`w-full max-w-[340px] bg-slate-900 rounded-xl overflow-hidden shadow-2xl border transition-all duration-300 ${
            activeInspected === 'window'
              ? 'ring-2 ring-amber-400 border-amber-400/80 shadow-amber-500/10'
              : 'border-slate-700/80'
          }`}
          onMouseEnter={() => inspectMode && onInspectElement?.('janela-principal')}
        >
          {/* Native Window Titlebar (Tkinter OS window style) */}
          <div className="bg-slate-800/90 px-4 py-2.5 flex items-center justify-between border-b border-slate-700/60 select-none">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              <span className="ml-2 text-xs font-medium text-slate-300">
                Calculadora Python (tk.Tk)
              </span>
            </div>
            <span className="text-[11px] text-slate-400 tabular-nums font-mono">320×420</span>
          </div>

          {/* Calculator Body (janela container) */}
          <div className="p-4 bg-slate-900 flex flex-col gap-3">
            {/* Display (tk.Entry) */}
            <div
              className={`relative bg-slate-950 rounded-lg p-3 text-right border transition-all duration-200 cursor-text ${
                activeInspected === 'visor'
                  ? 'border-amber-400 ring-2 ring-amber-400/50 bg-slate-950'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
              onMouseEnter={() => inspectMode && onInspectElement?.('visor-entry')}
            >
              {inspectMode && (
                <div className="absolute top-1 left-2 text-[10px] uppercase font-mono text-slate-400 tracking-wider">
                  tk.Entry (Visor)
                </div>
              )}
              
              {/* Previous calculation preview */}
              <div className="text-[11px] font-mono text-slate-300 h-4 truncate">
                {lastCalculation || '\u00A0'}
              </div>

              {/* Main value */}
              <div
                className={`text-3xl font-mono font-bold tracking-tight truncate select-all ${
                  hasError ? 'text-rose-400' : 'text-slate-100'
                }`}
              >
                {expression}
              </div>
            </div>

            {/* Keypad Grid (grade_botoes) */}
            <div
              className={`grid grid-cols-4 gap-2 pt-1 transition-all rounded-lg p-1.5 ${
                activeInspected === 'keypad'
                  ? 'ring-2 ring-amber-400/80 bg-amber-500/5'
                  : ''
              }`}
              onMouseEnter={() => inspectMode && onInspectElement?.('layout-grade')}
            >
              {buttonRows.map((row, rIdx) => (
                <React.Fragment key={rIdx}>
                  {row.map((btn) => {
                    const isOperator = btn.type === 'operator' || btn.type === 'percent';
                    const isEquals = btn.type === 'equals';
                    const isClear = btn.type === 'clear' || btn.type === 'delete';

                    let btnClasses =
                      'h-12 rounded-lg font-semibold text-base transition-all active:scale-95 flex items-center justify-center cursor-pointer select-none border ';

                    if (isEquals) {
                      btnClasses +=
                        'bg-sky-600 hover:bg-sky-500 text-white border-sky-500/40 shadow-lg shadow-sky-950/50';
                    } else if (isOperator) {
                      btnClasses +=
                        'bg-slate-800 hover:bg-slate-700 text-sky-400 border-slate-700';
                    } else if (isClear) {
                      btnClasses +=
                        'bg-slate-800 hover:bg-slate-700 text-rose-400 border-slate-700';
                    } else {
                      btnClasses +=
                        'bg-slate-800/80 hover:bg-slate-700/80 text-slate-100 border-slate-700/60 hover:text-white';
                    }

                    return (
                      <button
                        key={btn.label}
                        type="button"
                        onClick={() => handleButton(btn.label)}
                        className={btnClasses}
                        title={`Clique para disparar ${btn.pythonAction}`}
                        onMouseEnter={() => {
                          if (inspectMode) {
                            if (isEquals) onInspectElement?.('funcoes-logica');
                            else onInspectElement?.('layout-grade');
                          }
                        }}
                      >
                        {btn.label}
                      </button>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>

            {/* Quick Helper under calculator */}
            <div className="text-[11px] text-slate-300 text-center flex items-center justify-center gap-2 pt-1">
              <span>Dica: Você também pode usar as teclas do seu teclado físico</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal / Python Event Stream Feedback */}
      <div className="mt-3 bg-slate-950 rounded-lg p-3 border border-slate-800/80 text-xs font-mono">
        <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1.5 pb-1 border-b border-slate-800">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-slate-300 font-semibold">Execução Interna Python</span>
          </div>
          <span className="text-slate-300">Chamadas de Função</span>
        </div>
        <div className="text-emerald-400 truncate flex items-center gap-2">
          <span className="text-slate-400">&gt;&gt;&gt;</span>
          <span className="text-slate-200">{log}</span>
        </div>
      </div>
    </div>
  );
};
