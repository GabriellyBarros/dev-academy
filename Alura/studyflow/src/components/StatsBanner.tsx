import React from 'react';
import { CheckCircle2, Clock, ListTodo, Target } from 'lucide-react';
import { StudyGoal } from '../types/studyGoal';

interface StatsBannerProps {
  goals: StudyGoal[];
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ goals }) => {
  const total = goals.length;
  const completed = goals.filter((g) => g.status === 'concluido').length;
  const inProgress = goals.filter((g) => g.status === 'em_andamento').length;
  const pending = goals.filter((g) => g.status === 'pendente').length;

  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs mb-8 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Progresso Geral */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-indigo-600" />
              Progresso dos Estudos
            </span>
            <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
              {percentage}% Concluído
            </span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/50">
            <div
              className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="text-xs text-slate-500 mt-2">
            {total === 0 ? (
              'Comece cadastrando seu primeiro objetivo para dar início à sua jornada!'
            ) : percentage === 100 ? (
              '🎉 Incrível! Você concluiu todos os seus objetivos cadastrados!'
            ) : percentage >= 50 ? (
              '👏 Excelente ritmo! Você já superou a metade das suas metas.'
            ) : (
              '🌱 Um passo de cada vez. O segredo do aprendizado é a constância!'
            )}
          </p>
        </div>

        {/* Cartões de Métricas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 shrink-0">
          {/* Total */}
          <div className="bg-slate-50/80 hover:bg-slate-50 border border-slate-200/70 rounded-xl p-3 text-center sm:text-left transition-colors">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-slate-500 text-xs font-medium mb-1">
              <ListTodo className="w-3.5 h-3.5 text-slate-600" />
              Total
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-800">
              {total}
            </div>
            <div className="text-[11px] text-slate-400">
              {total === 1 ? 'objetivo' : 'objetivos'}
            </div>
          </div>

          {/* Concluídos */}
          <div className="bg-emerald-50/60 hover:bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center sm:text-left transition-colors">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-700 text-xs font-medium mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Concluídos
            </div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-800">
              {completed}
            </div>
            <div className="text-[11px] text-emerald-600/80">
              {completed === 1 ? 'finalizado' : 'finalizados'}
            </div>
          </div>

          {/* Em andamento */}
          <div className="bg-sky-50/60 hover:bg-sky-50 border border-sky-100 rounded-xl p-3 text-center sm:text-left transition-colors">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-sky-700 text-xs font-medium mb-1">
              <Clock className="w-3.5 h-3.5 text-sky-600" />
              Em andamento
            </div>
            <div className="text-xl sm:text-2xl font-bold text-sky-800">
              {inProgress}
            </div>
            <div className="text-[11px] text-sky-600/80">
              foco ativo
            </div>
          </div>

          {/* Pendentes */}
          <div className="bg-amber-50/60 hover:bg-amber-50 border border-amber-100 rounded-xl p-3 text-center sm:text-left transition-colors">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-amber-700 text-xs font-medium mb-1">
              <Target className="w-3.5 h-3.5 text-amber-600" />
              Pendentes
            </div>
            <div className="text-xl sm:text-2xl font-bold text-amber-800">
              {pending}
            </div>
            <div className="text-[11px] text-amber-600/80">
              a iniciar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
