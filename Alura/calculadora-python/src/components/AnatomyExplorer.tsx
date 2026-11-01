import React from 'react';
import { componentExplanations, ComponentExplanation } from '../data/pythonCodes';
import { ChevronRight, Lightbulb, HelpCircle, Eye } from 'lucide-react';

interface AnatomyExplorerProps {
  selectedId: string;
  onSelectComponent: (id: string) => void;
}

export const AnatomyExplorer: React.FC<AnatomyExplorerProps> = ({
  selectedId,
  onSelectComponent,
}) => {
  const activeItem =
    componentExplanations.find((item) => item.id === selectedId) ||
    componentExplanations[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* List of Component Tabs (Left / 4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-2">
        <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1 px-1">
          Estrutura do Código em 6 Partes
        </div>
        {componentExplanations.map((item) => {
          const isSelected = item.id === selectedId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectComponent(item.id)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 group cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 border-sky-500/80 shadow-md ring-1 ring-sky-500/20'
                  : 'bg-slate-900/50 hover:bg-slate-900/90 border-slate-800 text-slate-300 hover:text-slate-100'
              }`}
            >
              <span
                className={`font-mono text-xs font-bold px-2 py-1 rounded transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                    : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                }`}
              >
                {item.number}
              </span>

              <div className="flex-1 min-w-0">
                <div
                  className={`text-sm font-semibold truncate ${
                    isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                  }`}
                >
                  {item.title}
                </div>
                <div className="text-xs text-slate-400 truncate mt-0.5">
                  {item.summary}
                </div>
              </div>

              <ChevronRight
                className={`w-4 h-4 shrink-0 transition-transform mt-1 ${
                  isSelected
                    ? 'text-sky-400 translate-x-0.5'
                    : 'text-slate-600 group-hover:text-slate-400'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Detailed Card for Active Component (Right / 8 cols) */}
      <div className="lg:col-span-8 bg-slate-900/80 rounded-2xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold px-2.5 py-1 bg-sky-500/20 text-sky-300 rounded border border-sky-500/30">
              Parte {activeItem.number}
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {activeItem.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Destacado no simulador e código</span>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="my-5">
          <div className="text-xs text-slate-400 mb-1.5 font-medium flex items-center justify-between">
            <span>Trecho de código correspondente:</span>
            <span className="font-mono text-[11px] text-sky-400">Python 3</span>
          </div>
          <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-sm text-sky-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
            <code>{activeItem.codeSnippet}</code>
          </pre>
        </div>

        {/* Content Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          {/* O que faz */}
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>O que esta parte faz?</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeItem.summary}
            </p>
          </div>

          {/* Por que é essencial */}
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 mb-2">
              <span className="text-sm">⚙️</span>
              <span>Por que é fundamental?</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeItem.whyItMatters}
            </p>
          </div>
        </div>

        {/* Beginner Tip Callout */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-amber-300 block mb-1">
              Dica para Iniciantes:
            </span>
            <span className="text-slate-300 leading-relaxed">
              {activeItem.beginnerTip}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
