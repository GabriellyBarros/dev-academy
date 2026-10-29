import React from 'react';
import { BookOpen, Plus, RefreshCw, SearchX, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  isFiltered: boolean;
  onOpenCreate: () => void;
  onClearFilters?: () => void;
  onRestoreSamples?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  isFiltered,
  onOpenCreate,
  onClearFilters,
  onRestoreSamples,
}) => {
  if (isFiltered) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 text-center shadow-xs max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">
          Nenhum objetivo encontrado
        </h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          Não encontramos nenhum objetivo correspondente aos filtros selecionados. Tente ajustar o status ou a busca por texto.
        </p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-sm transition-colors cursor-pointer"
          >
            Limpar filtros e ver todos
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white to-indigo-50/30 rounded-3xl p-8 sm:p-14 border border-indigo-100 text-center shadow-xs max-w-xl mx-auto">
      <div className="w-16 h-16 rounded-3xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center mx-auto mb-5 shadow-xs">
        <Sparkles className="w-8 h-8" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 tracking-tight">
        Sua jornada de aprendizado começa aqui!
      </h3>
      <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
        Você ainda não possui nenhum objetivo de estudo cadastrado. Transforme o que você quer aprender em passos simples e alcançáveis.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onOpenCreate}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium text-sm transition-all shadow-md shadow-indigo-200 hover:shadow-indigo-300 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Meu Primeiro Objetivo</span>
        </button>

        {onRestoreSamples && (
          <button
            onClick={onRestoreSamples}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors cursor-pointer"
            title="Carregar sugestões de objetivos para testar"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Carregar Exemplos Iniciais</span>
          </button>
        )}
      </div>
    </div>
  );
};
