export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  categoryId?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  createdAt: string;
  notes?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}
