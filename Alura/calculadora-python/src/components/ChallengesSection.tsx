import React, { useState } from 'react';
import { learningChallenges } from '../data/pythonCodes';
import { Trophy, ChevronDown, ChevronUp, Sparkles, Code2 } from 'lucide-react';

export const ChallengesSection: React.FC = () => {
  const [openHintIndex, setOpenHintIndex] = useState<number | null>(null);

  const toggleHint = (idx: number) => {
    setOpenHintIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4" />
            <span>Próximos Passos de Aprendizado</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Desafios Práticos para Expandir sua Calculadora
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Depois de rodar o código básico, tente fazer estas melhorias para fixar o conteúdo.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {learningChallenges.map((challenge, idx) => {
          const isOpen = openHintIndex === idx;

          return (
            <div
              key={challenge.title}
              className="p-5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-sky-400">
                    Nível: {challenge.difficulty}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    Desafio 0{idx + 1}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">
                  {challenge.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {challenge.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-900">
                <button
                  type="button"
                  onClick={() => toggleHint(idx)}
                  className="flex items-center justify-between w-full text-xs text-slate-400 hover:text-amber-300 transition-colors py-1 cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isOpen ? 'Ocultar Dica' : 'Ver Dica de Implementação'}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                {isOpen && (
                  <div className="mt-2.5 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 font-mono leading-relaxed">
                    💡 {challenge.hint}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
