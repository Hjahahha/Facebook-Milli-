import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo, Category } from '../types';
import { v4 as uuidv4 } from 'uuid';

const TODOS_KEY = '@todos_storage';
const CATEGORIES_KEY = '@categories_storage';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Load todos and categories from AsyncStorage
  const loadTodos = useCallback(async () => {
    try {
      const [todosData, categoriesData] = await Promise.all([
        AsyncStorage.getItem(TODOS_KEY),
        AsyncStorage.getItem(CATEGORIES_KEY),
      ]);

      if (todosData) setTodos(JSON.parse(todosData));
      if (categoriesData) setCategories(JSON.parse(categoriesData));
      else {
        // Initialize with default categories
        const defaultCategories: Category[] = [
          { id: uuidv4(), name: 'Work', color: '#6366f1' },
          { id: uuidv4(), name: 'Personal', color: '#ec4899' },
          { id: uuidv4(), name: 'Shopping', color: '#f59e0b' },
          { id: uuidv4(), name: 'Health', color: '#10b981' },
        ];
        setCategories(defaultCategories);
        await AsyncStorage.setItem(
          CATEGORIES_KEY,
          JSON.stringify(defaultCategories)
        );
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save todos to AsyncStorage
  const saveTodos = useCallback(async (newTodos: Todo[]) => {
    try {
      await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(newTodos));
      setTodos(newTodos);
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  }, []);

  // Add new todo
  const addTodo = useCallback(
    (title: string, categoryId?: string, dueDate?: Date, priority?: 'low' | 'medium' | 'high') => {
      const newTodo: Todo = {
        id: uuidv4(),
        title,
        completed: false,
        categoryId,
        dueDate: dueDate?.toISOString(),
        priority: priority || 'medium',
        createdAt: new Date().toISOString(),
      };
      const updated = [newTodo, ...todos];
      saveTodos(updated);
    },
    [todos, saveTodos]
  );

  // Update todo
  const updateTodo = useCallback(
    (id: string, updates: Partial<Todo>) => {
      const updated = todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      );
      saveTodos(updated);
    },
    [todos, saveTodos]
  );

  // Delete todo
  const deleteTodo = useCallback(
    (id: string) => {
      const updated = todos.filter((todo) => todo.id !== id);
      saveTodos(updated);
    },
    [todos, saveTodos]
  );

  // Toggle todo completion
  const toggleTodo = useCallback(
    (id: string) => {
      const updated = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      saveTodos(updated);
    },
    [todos, saveTodos]
  );

  // Add category
  const addCategory = useCallback(
    (name: string, color: string) => {
      const newCategory: Category = {
        id: uuidv4(),
        name,
        color,
      };
      const updated = [...categories, newCategory];
      AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(updated));
      setCategories(updated);
    },
    [categories]
  );

  // Delete category
  const deleteCategory = useCallback(
    (id: string) => {
      const updated = categories.filter((cat) => cat.id !== id);
      AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(updated));
      setCategories(updated);
      // Remove category from todos
      const updatedTodos = todos.map((todo) =>
        todo.categoryId === id ? { ...todo, categoryId: undefined } : todo
      );
      saveTodos(updatedTodos);
    },
    [categories, todos, saveTodos]
  );

  // Clear all completed todos
  const clearCompleted = useCallback(() => {
    const updated = todos.filter((todo) => !todo.completed);
    saveTodos(updated);
  }, [todos, saveTodos]);

  // Get todos by category
  const getTodosByCategory = useCallback(
    (categoryId: string) => {
      return todos.filter((todo) => todo.categoryId === categoryId);
    },
    [todos]
  );

  // Get stats
  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    active: todos.filter((t) => !t.completed).length,
    overdue: todos.filter((t) => {
      if (t.completed || !t.dueDate) return false;
      return new Date(t.dueDate) < new Date();
    }).length,
  };

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return {
    todos,
    categories,
    loading,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    addCategory,
    deleteCategory,
    clearCompleted,
    getTodosByCategory,
    stats,
  };
};
