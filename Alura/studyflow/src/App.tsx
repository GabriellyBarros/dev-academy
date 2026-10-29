import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { StatsBanner } from './components/StatsBanner';
import { GoalCard } from './components/GoalCard';
import { GoalFormModal } from './components/GoalFormModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { EmptyState } from './components/EmptyState';
import { GoalFilters } from './components/GoalFilters';
import { storageService } from './services/storageService';
import { GoalFilterOptions, StudyGoal, StudyGoalFormData, StudyGoalStatus } from './types/studyGoal';
import { CheckCircle2, Plus } from 'lucide-react';

export default function App() {
  const [goals, setGoals] = useState<StudyGoal[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<StudyGoal | null>(null);
  const [deletingGoal, setDeletingGoal] = useState<StudyGoal | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [filters, setFilters] = useState<GoalFilterOptions>({
    status: 'todos',
    search: '',
    sortBy: 'deadline',
  });

  // Carrega objetivos do localStorage ao montar a aplicação
  useEffect(() => {
    const loaded = storageService.getGoals();
    setGoals(loaded);
  }, []);

  // Exibe toast temporário de feedback
  const showToast = (message: string) => {
    setToastMessage(message);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
    return () => clearTimeout(timer);
  };

  // Abrir modal de criação
  const handleOpenCreateModal = () => {
    setEditingGoal(null);
    setIsFormOpen(true);
  };

  // Abrir modal de edição
  const handleOpenEditModal = (goal: StudyGoal) => {
    setEditingGoal(goal);
    setIsFormOpen(true);
  };

  // Submeter criação ou edição
  const handleFormSubmit = (data: StudyGoalFormData) => {
    if (editingGoal) {
      const updated = storageService.updateGoal(editingGoal.id, data);
      if (updated) {
        setGoals((prev) =>
          prev.map((g) => (g.id === updated.id ? updated : g))
        );
        showToast('Objetivo atualizado com sucesso!');
      }
    } else {
      const created = storageService.createGoal(data);
      setGoals((prev) => [created, ...prev]);
      showToast('Novo objetivo de estudo cadastrado!');
    }
  };

  // Solicitar exclusão (abre confirmação)
  const handleRequestDelete = (goal: StudyGoal) => {
    setDeletingGoal(goal);
  };

  // Confirmar exclusão após modal
  const handleConfirmDelete = (goalId: string) => {
    const success = storageService.deleteGoal(goalId);
    if (success) {
      setGoals((prev) => prev.filter((g) => g.id !== goalId));
      showToast('Objetivo excluído.');
    }
    setDeletingGoal(null);
  };

  // Mudança rápida de status diretamente no cartão
  const handleStatusChange = (id: string, newStatus: StudyGoalStatus) => {
    const updated = storageService.updateGoal(id, { status: newStatus });
    if (updated) {
      setGoals((prev) =>
        prev.map((g) => (g.id === id ? updated : g))
      );
      const label =
        newStatus === 'concluido'
          ? 'Parabéns! Meta marcada como concluída! 🎉'
          : newStatus === 'em_andamento'
          ? 'Status atualizado para: Em andamento 🚀'
          : 'Status atualizado para: Pendente ⏳';
      showToast(label);
    }
  };

  // Restaurar exemplos para testes
  const handleRestoreSamples = () => {
    const samples = storageService.resetToSamples();
    setGoals(samples);
    showToast('Exemplos restaurados com sucesso!');
  };

  // Filtragem e ordenação
  const filteredGoals = useMemo(() => {
    let result = [...goals];

    // Filtro por status
    if (filters.status !== 'todos') {
      result = result.filter((g) => g.status === filters.status);
    }

    // Filtro por busca
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q)
      );
    }

    // Ordenação
    result.sort((a, b) => {
      if (filters.sortBy === 'deadline') {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return a.deadline.localeCompare(b.deadline);
      }
      if (filters.sortBy === 'createdAt') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (filters.sortBy === 'title') {
        return a.title.localeCompare(b.title, 'pt-BR');
      }
      return 0;
    });

    return result;
  }, [goals, filters]);

  const isFiltered =
    filters.status !== 'todos' || filters.search.trim().length > 0;

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-800 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Barra de Notificação Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-3 duration-300">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-sm font-medium border border-slate-700/50">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Cabeçalho */}
      <Header
        onOpenCreateModal={handleOpenCreateModal}
        totalGoals={goals.length}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Painel de Estatísticas e Progresso */}
        <StatsBanner goals={goals} />

        {/* Barra de Ações, Filtros e Busca (exibida quando há metas cadastradas) */}
        {goals.length > 0 && (
          <GoalFilters
            filters={filters}
            onChangeFilters={setFilters}
            goals={goals}
          />
        )}

        {/* Listagem de Objetivos ou Estados Vazios */}
        {goals.length === 0 ? (
          <EmptyState
            isFiltered={false}
            onOpenCreate={handleOpenCreateModal}
            onRestoreSamples={handleRestoreSamples}
          />
        ) : filteredGoals.length === 0 ? (
          <EmptyState
            isFiltered={true}
            onOpenCreate={handleOpenCreateModal}
            onClearFilters={() =>
              setFilters({ status: 'todos', search: '', sortBy: 'deadline' })
            }
          />
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Mostrando {filteredGoals.length}{' '}
                {filteredGoals.length === 1 ? 'objetivo' : 'objetivos'}
              </span>
              <button
                onClick={handleOpenCreateModal}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Adicionar mais um
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onEdit={handleOpenEditModal}
                  onRequestDelete={handleRequestDelete}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Rodapé Acolhedor */}
      <footer className="mt-auto py-6 border-t border-slate-200/80 bg-white/50 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            <strong>StudyFlow</strong> • Seu companheiro de estudos diário. Dados salvos automaticamente no seu navegador.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRestoreSamples}
              className="text-indigo-600 hover:underline cursor-pointer"
              title="Restaurar objetivos de exemplo"
            >
              Restaurar exemplos
            </button>
          </div>
        </div>
      </footer>

      {/* Modal de Cadastro / Edição */}
      <GoalFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingGoal}
      />

      {/* Modal de Confirmação de Exclusão */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingGoal)}
        goal={deletingGoal}
        onClose={() => setDeletingGoal(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
