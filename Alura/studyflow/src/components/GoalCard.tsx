import React from 'react';
import { Calendar, CheckCircle2, Clock, Edit3, Trash2, AlertCircle } from 'lucide-react';
import { StudyGoal, StudyGoalStatus } from '../types/studyGoal';
import { formatDateBR, getDeadlineInfo } from '../utils/dateUtils';

interface GoalCardProps {
  goal: StudyGoal;
  onEdit: (goal: StudyGoal) => void;
  onRequestDelete: (goal: StudyGoal) => void;
  onStatusChange: (id: string, newStatus: StudyGoalStatus) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onEdit,
  onRequestDelete,
  onStatusChange,
}) => {
  const deadlineInfo = getDeadlineInfo(goal.deadline, goal.status);

  const statusConfig = {
    pendente: {
      label: 'Pendente',
      icon: Clock,
      badge: 'bg-amber-50 text-amber-800 border-amber-200/80',
      dot: 'bg-amber-400',
    },
    em_andamento: {
      label: 'Em andamento',
      icon: Clock,
      badge: 'bg-sky-50 text-sky-800 border-sky-200/80',
      dot: 'bg-sky-500',
    },
    concluido: {
      label: 'Concluído',
      icon: CheckCircle2,
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
      dot: 'bg-emerald-500',
    },
  };

  const currentStatus = statusConfig[goal.status];

  return (
    <article
      className={`group relative bg-white rounded-2xl p-5 border transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between ${
        goal.status === 'concluido'
          ? 'border-emerald-200/70 bg-gradient-to-b from-white to-emerald-50/20'
          : deadlineInfo.isOverdue
          ? 'border-rose-200/80'
          : 'border-slate-200/80 hover:border-indigo-200'
      }`}
    >
      <div>
        {/* Top Header: Status Badge & Quick Status Selector */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${currentStatus.badge}`}
            >
              <span className={`w-2 h-2 rounded-full ${currentStatus.dot}`} />
              {currentStatus.label}
            </span>

            {/* Prazo Tag */}
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border ${deadlineInfo.badgeClass}`}
            >
              <Calendar className="w-3 h-3 shrink-0" />
              <span>{deadlineInfo.text}</span>
            </span>
          </div>

          {/* Quick status dropdown for ease of use */}
          <div className="relative">
            <select
              aria-label="Mudar status do objetivo"
              value={goal.status}
              onChange={(e) => onStatusChange(goal.id, e.target.value as StudyGoalStatus)}
              className="text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-1 px-2 rounded-lg cursor-pointer transition-colors focus:ring-2 focus:ring-indigo-400 focus:outline-hidden"
              title="Alterar status rapidamente"
            >
              <option value="pendente">⏳ Pendente</option>
              <option value="em_andamento">🚀 Em andamento</option>
              <option value="concluido">✅ Concluído</option>
            </select>
          </div>
        </div>

        {/* Title */}
        <h3
          className={`text-base sm:text-lg font-semibold tracking-tight text-slate-800 mb-2 leading-snug break-words ${
            goal.status === 'concluido' ? 'line-through text-slate-500' : ''
          }`}
        >
          {goal.title}
        </h3>

        {/* Description */}
        {goal.description ? (
          <p
            className={`text-sm text-slate-600 mb-4 whitespace-pre-line leading-relaxed break-words ${
              goal.status === 'concluido' ? 'text-slate-400' : ''
            }`}
          >
            {goal.description}
          </p>
        ) : (
          <p className="text-xs text-slate-400 italic mb-4">
            Sem descrição detalhada cadastrada.
          </p>
        )}
      </div>

      {/* Footer Info & Actions */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-1 text-slate-400">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span>Data limite: <strong className="text-slate-600 font-medium">{formatDateBR(goal.deadline)}</strong></span>
        </div>

        {/* Action Buttons: Editar & Excluir */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={() => onEdit(goal)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100 transition-colors font-medium cursor-pointer"
            title="Editar objetivo de estudo"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editar</span>
          </button>

          <button
            type="button"
            onClick={() => onRequestDelete(goal)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 active:bg-rose-100 transition-colors font-medium cursor-pointer"
            title="Excluir objetivo de estudo"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Excluir</span>
          </button>
        </div>
      </div>
    </article>
  );
};
