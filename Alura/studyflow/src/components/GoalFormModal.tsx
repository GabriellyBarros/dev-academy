import React, { useState, useEffect } from 'react';
import { X, Calendar, BookOpen, AlertCircle, Sparkles } from 'lucide-react';
import { StudyGoal, StudyGoalFormData, StudyGoalStatus } from '../types/studyGoal';

interface GoalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StudyGoalFormData) => void;
  initialData?: StudyGoal | null;
}

export const GoalFormModal: React.FC<GoalFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const isEditing = Boolean(initialData);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState<StudyGoalStatus>('pendente');
  const [error, setError] = useState<string | null>(null);

  // Preenche dados quando abre em modo de edição ou limpa para novo
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setDeadline(initialData.deadline || '');
      setStatus(initialData.status);
    } else {
      // Padrão amigável: prazo sugerido em 7 dias
      const defaultDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
      setTitle('');
      setDescription('');
      setDeadline(defaultDate);
      setStatus('pendente');
    }
    setError(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Por favor, informe o título do seu objetivo de estudo.');
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      deadline: deadline || '',
      status,
    });
    onClose();
  };

  // Atalhos rápidos de prazo para ajudar estudantes iniciantes
  const setQuickDeadline = (daysAhead: number) => {
    const target = new Date();
    target.setDate(target.getDate() + daysAhead);
    setDeadline(target.toISOString().split('T')[0]);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="goal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden my-8">
        {/* Cabeçalho do Modal */}
        <div className="px-6 py-5 bg-gradient-to-r from-indigo-50/70 via-white to-violet-50/50 border-b border-indigo-100/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              {isEditing ? <BookOpen className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            </div>
            <div>
              <h2 id="goal-modal-title" className="text-lg font-bold text-slate-800">
                {isEditing ? 'Editar Objetivo de Estudo' : 'Novo Objetivo de Estudo'}
              </h2>
              <p className="text-xs text-slate-500">
                {isEditing
                  ? 'Atualize os detalhes da sua meta sempre que precisar'
                  : 'Defina o que você quer aprender com clareza'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            title="Fechar formulário"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-rose-700 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Campo: Título */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Título do Objetivo <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Ex.: Aprender Sintaxe Básica do Python"
              maxLength={120}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden"
              autoFocus
            />
            <p className="text-[11px] text-slate-400 mt-1 flex justify-between">
              <span>Seja específico sobre o assunto ou habilidade.</span>
              <span>{title.length}/120</span>
            </p>
          </div>

          {/* Campo: Descrição */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Descrição (Opcional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex.: Assistir aos módulos 1 e 2 do curso e fazer os exercícios práticos da apostila."
              rows={3}
              maxLength={500}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-sm text-slate-800 placeholder:text-slate-400 resize-none focus:outline-hidden"
            />
            <p className="text-[11px] text-slate-400 mt-1 text-right">
              {description.length}/500
            </p>
          </div>

          {/* Campo: Prazo */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Prazo para Conclusão
            </label>
            <div className="relative">
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-sm text-slate-800 focus:outline-hidden"
              />
            </div>

            {/* Atalhos rápidos de data */}
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <span className="text-[11px] text-slate-400 font-medium">Atalhos rápidos:</span>
              <button
                type="button"
                onClick={() => setQuickDeadline(0)}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 transition-colors cursor-pointer"
              >
                Hoje
              </button>
              <button
                type="button"
                onClick={() => setQuickDeadline(3)}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 transition-colors cursor-pointer"
              >
                +3 dias
              </button>
              <button
                type="button"
                onClick={() => setQuickDeadline(7)}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 transition-colors cursor-pointer"
              >
                +1 semana
              </button>
              <button
                type="button"
                onClick={() => setQuickDeadline(15)}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 transition-colors cursor-pointer"
              >
                +15 dias
              </button>
            </div>
          </div>

          {/* Campo: Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Status Atual
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStatus('pendente')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                  status === 'pendente'
                    ? 'border-amber-400 bg-amber-50 text-amber-800 ring-2 ring-amber-200'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="text-base">⏳</span>
                <span>Pendente</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus('em_andamento')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                  status === 'em_andamento'
                    ? 'border-sky-400 bg-sky-50 text-sky-800 ring-2 ring-sky-200'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="text-base">🚀</span>
                <span>Em andamento</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus('concluido')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                  status === 'concluido'
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-200'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="text-base">✅</span>
                <span>Concluído</span>
              </button>
            </div>
          </div>

          {/* Ações do Rodapé */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium transition-all shadow-md shadow-indigo-200 cursor-pointer"
            >
              {isEditing ? 'Salvar Alterações' : 'Cadastrar Objetivo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
