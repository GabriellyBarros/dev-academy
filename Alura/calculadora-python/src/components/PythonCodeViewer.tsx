import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, CheckCircle2 } from 'lucide-react';
import {
  pythonCalculatorCodeBasic,
  pythonCalculatorCodeExplicit,
  pythonCalculatorCodeConsole,
} from '../data/pythonCodes';

interface PythonCodeViewerProps {
  activeSnippetId: 'basic' | 'explicit' | 'console';
  onSelectSnippet: (id: 'basic' | 'explicit' | 'console') => void;
  activeInspected?: string | null;
}

export const PythonCodeViewer: React.FC<PythonCodeViewerProps> = ({
  activeSnippetId,
  onSelectSnippet,
  activeInspected,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const getCode = () => {
    switch (activeSnippetId) {
      case 'basic':
        return pythonCalculatorCodeBasic;
      case 'explicit':
        return pythonCalculatorCodeExplicit;
      case 'console':
        return pythonCalculatorCodeConsole;
      default:
        return pythonCalculatorCodeBasic;
    }
  };

  const getFilename = () => {
    switch (activeSnippetId) {
      case 'basic':
        return 'calculadora_tkinter.py';
      case 'explicit':
        return 'calculadora_funcoes.py';
      case 'console':
        return 'calculadora_terminal.py';
    }
  };

  const currentCode = getCode();
  const filename = getFilename();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([currentCode], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Helper to colorize Python code lines simply and reliably
  const renderHighlightedLine = (line: string, index: number) => {
    // Check if line relates to inspected item
    let isHighlightedSection = false;
    const trimmed = line.trim();

    if (activeInspected === 'import-tkinter' && (trimmed.startsWith('import tkinter') || trimmed.startsWith('from tkinter'))) {
      isHighlightedSection = true;
    } else if (activeInspected === 'janela-principal' && (trimmed.includes('tk.Tk(') || trimmed.includes('janela.title') || trimmed.includes('janela.geometry'))) {
      isHighlightedSection = true;
    } else if (activeInspected === 'visor-entry' && (trimmed.includes('tk.Entry(') || trimmed.includes('visor.pack('))) {
      isHighlightedSection = true;
    } else if (activeInspected === 'funcoes-logica' && (trimmed.startsWith('def calcular') || trimmed.startsWith('def limpar') || trimmed.startsWith('def clicar') || trimmed.includes('eval('))) {
      isHighlightedSection = true;
    } else if (activeInspected === 'layout-grade' && (trimmed.includes('grade_botoes') || trimmed.includes('.grid(') || trimmed.includes('layout_botoes'))) {
      isHighlightedSection = true;
    } else if (activeInspected === 'mainloop' && trimmed.includes('janela.mainloop()')) {
      isHighlightedSection = true;
    }

    // Tokenizer regex for comments, strings, keywords, numbers
    const parts = line.split(/(#.*$|"""[\s\S]*?"""|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:def|class|import|from|as|return|if|elif|else|while|for|in|try|except|raise|with|pass|break|continue|and|or|not|is|lambda|global|True|False|None)\b|\b(?:print|len|str|int|float|eval|input|range|enumerate)\b|\b\d+\.?\d*\b)/g);

    return (
      <div
        key={index}
        className={`table-row leading-relaxed font-mono text-[13px] transition-colors ${
          isHighlightedSection
            ? 'bg-amber-500/15 text-slate-100 font-semibold'
            : 'hover:bg-slate-900/70'
        }`}
      >
        <span className="table-cell select-none text-right pr-4 text-slate-400 text-xs w-10 py-0.5">
          {index + 1}
        </span>
        <span className="table-cell whitespace-pre py-0.5 pr-4">
          {parts.map((token, tIdx) => {
            if (!token) return null;

            if (token.startsWith('#') || token.startsWith('"""')) {
              return (
                <span key={tIdx} className="text-emerald-400/90 italic">
                  {token}
                </span>
              );
            }

            if (token.startsWith('"') || token.startsWith("'")) {
              return (
                <span key={tIdx} className="text-amber-300">
                  {token}
                </span>
              );
            }

            if (
              /^(def|class|import|from|as|return|if|elif|else|while|for|in|try|except|raise|with|pass|break|continue|and|or|not|is|lambda|global)$/.test(
                token
              )
            ) {
              return (
                <span key={tIdx} className="text-sky-400 font-medium">
                  {token}
                </span>
              );
            }

            if (/^(True|False|None)$/.test(token)) {
              return (
                <span key={tIdx} className="text-rose-400 font-medium">
                  {token}
                </span>
              );
            }

            if (/^(print|len|str|int|float|eval|input|range|enumerate)$/.test(token)) {
              return (
                <span key={tIdx} className="text-purple-400">
                  {token}
                </span>
              );
            }

            if (/^\d+\.?\d*$/.test(token)) {
              return (
                <span key={tIdx} className="text-orange-300">
                  {token}
                </span>
              );
            }

            if (token.includes('tk.') || token.includes('messagebox.')) {
              return (
                <span key={tIdx} className="text-cyan-300">
                  {token}
                </span>
              );
            }

            return <span key={tIdx} className="text-slate-200">{token}</span>;
          })}
        </span>
      </div>
    );
  };

  const lines = currentCode.split('\n');

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
      {/* Code Header Bar with Mode Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900 border-b border-slate-800">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => onSelectSnippet('basic')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeSnippetId === 'basic'
                ? 'bg-sky-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tkinter Visual (Padrão)
          </button>
          <button
            type="button"
            onClick={() => onSelectSnippet('explicit')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeSnippetId === 'explicit'
                ? 'bg-sky-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Funções Matemáticas (+, -, *, /)
          </button>
          <button
            type="button"
            onClick={() => onSelectSnippet('console')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeSnippetId === 'console'
                ? 'bg-sky-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Terminal / Console
          </button>
        </div>

        {/* Action Buttons: Copy & Download */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors whitespace-nowrap"
            title="Copiar todo o código para a área de transferência"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copiar Código</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-sky-600 hover:bg-sky-500 text-white transition-colors whitespace-nowrap shadow-sm"
            title={`Baixar ${filename}`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>

      {/* Code Filename Banner */}
      <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-sky-400" />
          <span className="text-slate-200 font-medium">{filename}</span>
          <span>·</span>
          <span>Python 3.8+ (Sem dependências externas)</span>
        </div>
        <span className="text-[11px] text-slate-400">{lines.length} linhas</span>
      </div>

      {/* Code Editor Body */}
      <div className="flex-1 overflow-auto p-4 bg-slate-950 font-mono">
        <div className="table w-full">
          {lines.map((line, idx) => renderHighlightedLine(line, idx))}
        </div>
      </div>

      {/* Bottom helper info */}
      <div className="p-2.5 bg-slate-900/80 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span>💡 Dica: Código pronto para colar no VS Code, PyCharm, IDLE ou Bloco de Notas.</span>
        <span className="text-sky-400 hidden sm:inline">100% nativo com Tkinter</span>
      </div>
    </div>
  );
};
