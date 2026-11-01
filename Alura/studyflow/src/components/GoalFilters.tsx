import React from 'react';
import { Search, X, ArrowDownUp } from 'lucide-react';
import { GoalFilterOptions, StudyGoal, StudyGoalStatus } from '../types/studyGoal';

interface GoalFiltersProps {
  filters: GoalFilterOptions;
  onChangeFilters: (newFilters: GoalFilterOptions) => void;
  goals: StudyGoal[];
}

export const GoalFilters: React.FC<GoalFiltersProps> = ({
  filters,
  onChangeFilters,
  goals,
}) => {
  const counts = {
    todos: goals.length,
    pendente: goals.filter((g) => g.status === 'pendente').length,
    em_andamento: goals.filter((g) => g.status === 'em_andamento').length,
    concluido: goals.filter((g) => g.status === 'concluido').length,
  };

  const tabs: Array<{ id: 'todos' | StudyGoalStatus; label: string; count: number; color: string }> = [
    { id: 'todos', label: 'Todos', count: counts.todos, color: 'text-slate-600 bg-slate-100' },
    { id: 'pendente', label: 'Pendentes', count: counts.pendente, color: 'text-amber-800 bg-amber-100' },
    { id: 'em_andamento', label: 'Em andamento', count: counts.em_andamento, color: 'text-sky-800 bg-sky-100' },
    { id: 'concluido', label: 'Concluídos', count: counts.concluido, color: 'text-emerald-800 bg-emerald-100' },
  ];

  return (
    <div className="space-y-3 mb-6">
      {/* Abas de Status e Barra de Busca */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Abas */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = filters.status === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChangeFilters({ ...filters, status: tab.id })}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isActive ? 'bg-indigo-100 text-indigo-700' : tab.color
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Busca e Ordenação */}
        <div className="flex items-center gap-2">
          {/* Campo de Busca */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => onChangeFilters({ ...filters, search: e.target.value })}
              placeholder="Buscar por título ou descrição..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
            {filters.search && (
              <button
                onClick={() => onChangeFilters({ ...filters, search: '' })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
                title="Limpar busca"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Seletor de Ordenação */}
          <div className="shrink-0">
            <select
              value={filters.sortBy}
              onChange={(e) =>
                onChangeFilters({
                  ...filters,
                  sortBy: e.target.value as GoalFilterOptions['sortBy'],
                })
              }
              aria-label="Ordenar objetivos"
              className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 font-medium focus:outline-hidden focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 cursor-pointer"
            >
              <option value="deadline">📅 Prazo mais próximo</option>
              <option value="createdAt">🕒 Mais recentes</option>
              <option value="title">🔤 Ordem alfabética</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
