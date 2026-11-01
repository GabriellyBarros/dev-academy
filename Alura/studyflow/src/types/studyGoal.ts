export type StudyGoalStatus = 'pendente' | 'em_andamento' | 'concluido';

export interface StudyGoal {
  id: string;
  title: string;
  description: string;
  deadline: string; // YYYY-MM-DD
  status: StudyGoalStatus;
  createdAt: string;
  updatedAt: string;
}

export type StudyGoalFormData = {
  title: string;
  description: string;
  deadline: string;
  status: StudyGoalStatus;
};

export interface GoalFilterOptions {
  status: 'todos' | StudyGoalStatus;
  search: string;
  sortBy: 'deadline' | 'createdAt' | 'title';
}
