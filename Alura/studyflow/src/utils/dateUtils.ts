import { StudyGoalStatus } from '../types/studyGoal';

export function formatDateBR(dateString: string): string {
  if (!dateString) return 'Sem prazo definido';
  // dateString is typically YYYY-MM-DD
  const parts = dateString.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
  }
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('pt-BR');
  } catch {
    return dateString;
  }
}

export function getDeadlineInfo(deadline: string, status: StudyGoalStatus): {
  text: string;
  badgeClass: string;
  isOverdue: boolean;
} {
  if (status === 'concluido') {
    return {
      text: 'Meta concluída',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      isOverdue: false,
    };
  }

  if (!deadline) {
    return {
      text: 'Sem data limite',
      badgeClass: 'bg-stone-100 text-stone-600 border-stone-200',
      isOverdue: false,
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [year, month, day] = deadline.split('-').map(Number);
  const targetDate = new Date(year, (month || 1) - 1, day || 1);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    const absDays = Math.abs(diffDays);
    return {
      text: `Atrasado (${absDays === 1 ? '1 dia' : `${absDays} dias`})`,
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200 font-medium',
      isOverdue: true,
    };
  } else if (diffDays === 0) {
    return {
      text: 'Vence hoje!',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300 font-medium',
      isOverdue: false,
    };
  } else if (diffDays === 1) {
    return {
      text: 'Vence amanhã',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
      isOverdue: false,
    };
  } else if (diffDays <= 7) {
    return {
      text: `Faltam ${diffDays} dias`,
      badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
      isOverdue: false,
    };
  } else {
    return {
      text: `Prazo: ${formatDateBR(deadline)}`,
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
      isOverdue: false,
    };
  }
}
