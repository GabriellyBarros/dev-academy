import { StudyGoal, StudyGoalFormData } from '../types/studyGoal';

const STORAGE_KEY = 'studyflow_goals_v1';
const INITIALIZED_KEY = 'studyflow_has_initialized_v1';

// Exemplos iniciais acolhedores para estudantes iniciantes
const INITIAL_SAMPLE_GOALS: StudyGoal[] = [
  {
    id: 'sample-1',
    title: 'Aprender conceitos básicos de HTML e CSS',
    description: 'Compreender tags semânticas, seletores fundamentais e praticar criando uma página pessoal de apresentação.',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'em_andamento',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'sample-2',
    title: 'Revisar lógica de programação e algoritmos',
    description: 'Resolver 5 exercícios práticos sobre estruturas condicionais (if/else) e laços de repetição.',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'pendente',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'sample-3',
    title: 'Configurar ambiente de estudos no computador',
    description: 'Instalar editor de código, configurar pasta de estudos e organizar atalhos úteis.',
    deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'concluido',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const storageService = {
  getGoals(): StudyGoal[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const isInitialized = localStorage.getItem(INITIALIZED_KEY);

      if (stored !== null) {
        return JSON.parse(stored) as StudyGoal[];
      }

      // Primeira visita: inicializa com dados de exemplo acolhedores
      if (!isInitialized) {
        localStorage.setItem(INITIALIZED_KEY, 'true');
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_GOALS));
        return INITIAL_SAMPLE_GOALS;
      }

      return [];
    } catch (error) {
      console.error('Erro ao ler objetivos do localStorage:', error);
      return [];
    }
  },

  saveGoals(goals: StudyGoal[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
      localStorage.setItem(INITIALIZED_KEY, 'true');
    } catch (error) {
      console.error('Erro ao salvar objetivos no localStorage:', error);
    }
  },

  createGoal(formData: StudyGoalFormData): StudyGoal {
    const goals = this.getGoals();
    const newGoal: StudyGoal = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : `goal-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      title: formData.title.trim(),
      description: formData.description.trim(),
      deadline: formData.deadline,
      status: formData.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedGoals = [newGoal, ...goals];
    this.saveGoals(updatedGoals);
    return newGoal;
  },

  updateGoal(id: string, formData: Partial<StudyGoalFormData>): StudyGoal | null {
    const goals = this.getGoals();
    const index = goals.findIndex((g) => g.id === id);

    if (index === -1) return null;

    const existing = goals[index];
    const updatedGoal: StudyGoal = {
      ...existing,
      ...formData,
      title: formData.title !== undefined ? formData.title.trim() : existing.title,
      description: formData.description !== undefined ? formData.description.trim() : existing.description,
      updatedAt: new Date().toISOString(),
    };

    goals[index] = updatedGoal;
    this.saveGoals(goals);
    return updatedGoal;
  },

  deleteGoal(id: string): boolean {
    const goals = this.getGoals();
    const filtered = goals.filter((g) => g.id !== id);
    if (filtered.length !== goals.length) {
      this.saveGoals(filtered);
      return true;
    }
    return false;
  },

  resetToSamples(): StudyGoal[] {
    this.saveGoals(INITIAL_SAMPLE_GOALS);
    return INITIAL_SAMPLE_GOALS;
  },

  clearAll(): void {
    this.saveGoals([]);
  }
};
