import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DatePicker from 'react-native-date-picker';
import { useTodos } from '../hooks/useTodos';
import { useTheme } from '../context/ThemeContext';
import TodoItem from '../components/TodoItem';

type FilterType = 'all' | 'active' | 'completed';

const TodoScreen: React.FC = () => {
  const { todos, categories, addTodo, stats, loading } = useTodos();
  const { isDark } = useTheme();
  const [filter, setFilter] = useState<FilterType>('all');
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'medium' | 'high'>(
    'medium'
  );
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const theme = {
    bg: isDark ? '#111827' : '#ffffff',
    card: isDark ? '#1f2937' : '#f3f4f6',
    text: isDark ? '#f3f4f6' : '#111827',
    subtext: isDark ? '#9ca3af' : '#6b7280',
    border: isDark ? '#374151' : '#e5e7eb',
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });
  }, [todos, filter]);

  const handleAddTodo = () => {
    if (title.trim()) {
      addTodo(title, selectedCategory, dueDate || undefined, selectedPriority);
      setTitle('');
      setSelectedCategory(undefined);
      setSelectedPriority('medium');
      setDueDate(null);
      setShowModal(false);
    }
  };

  const priorityColors: Record<string, string> = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444',
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: theme.text }]}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Stats */}
      <View style={[styles.statsContainer, { backgroundColor: theme.card }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: theme.subtext }]}>Total</Text>
          <Text style={[styles.statValue, { color: '#6366f1' }]}>{stats.total}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: theme.subtext }]}>Active</Text>
          <Text style={[styles.statValue, { color: '#10b981' }]}>{stats.active}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: theme.subtext }]}>Done</Text>
          <Text style={[styles.statValue, { color: '#8b5cf6' }]}>{stats.completed}</Text>
        </View>
      </View>

      {/* Filter */}
      <View style={[styles.filterContainer, { borderColor: theme.border }]}>
        {(['all', 'active', 'completed'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[
              styles.filterBtn,
              filter === f && { backgroundColor: '#6366f1' },
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === f ? { color: '#ffffff' } : { color: theme.subtext },
              ]}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Todos List */}
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TodoItem todo={item} categories={categories} />}
        ListEmptyComponent=(
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="checkbox-marked-circle-outline"
              size={48}
              color={theme.subtext}
            />
            <Text style={[styles.emptyText, { color: theme.subtext }]}>
              No tasks {filter !== 'all' ? `(${filter})` : ''}
            </Text>
          </View>
        )
        contentContainerStyle={styles.listContent}
      />

      {/* Add Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setShowModal(true)}>
        <MaterialCommunityIcons name="plus" size={28} color="#ffffff" />
      </TouchableOpacity>

      {/* Add Todo Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
        >
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                Add New Task
              </Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm}>
              {/* Title */}
              <Text style={[styles.label, { color: theme.text }]}>Title</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.bg,
                    color: theme.text,
                    borderColor: theme.border,
                  },
                ]}
                placeholder="Enter task title"
                placeholderTextColor={theme.subtext}
                value={title}
                onChangeText={setTitle}
              />

              {/* Priority */}
              <Text style={[styles.label, { color: theme.text }]}>Priority</Text>
              <View style={styles.priorityContainer}>
                {(['low', 'medium', 'high'] as const).map((p) => (
                  <TouchableOpacity
                    key={p}
                    onPress={() => setSelectedPriority(p)}
                    style={[
                      styles.priorityBtn,
                      selectedPriority === p && {
                        backgroundColor: priorityColors[p],
                      },
                      selectedPriority !== p && {
                        backgroundColor: theme.bg,
                        borderColor: priorityColors[p],
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.priorityText,
                        selectedPriority === p
                          ? { color: '#ffffff' }
                          : { color: priorityColors[p] },
                      ]}
                    >
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Category */}
              <Text style={[styles.label, { color: theme.text }]}>Category</Text>
              <View style={styles.categoryContainer}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => setSelectedCategory(cat.id)}
                    style={[
                      styles.categoryBtn,
                      selectedCategory === cat.id && { borderWidth: 2 },
                      { borderColor: cat.color },
                    ]}
                  >
                    <View
                      style={[
                        styles.categoryDot,
                        { backgroundColor: cat.color },
                      ]}
                    />
                    <Text style={[styles.categoryText, { color: theme.text }]}>
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Due Date */}
              <Text style={[styles.label, { color: theme.text }]}>Due Date</Text>
              <TouchableOpacity
                style={[
                  styles.dateBtn,
                  { backgroundColor: theme.bg, borderColor: theme.border },
                ]}
                onPress={() => setShowDatePicker(true)}
              >
                <MaterialCommunityIcons name="calendar" size={20} color="#6366f1" />
                <Text style={[styles.dateText, { color: theme.text }]}>
                  {dueDate ? dueDate.toLocaleDateString() : 'Select due date'}
                </Text>
              </TouchableOpacity>
            </ScrollView>

            {/* Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.cancelBtn, { backgroundColor: theme.bg }]}
                onPress={() => setShowModal(false)}
              >
                <Text style={[styles.btnText, { color: theme.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleAddTodo}
              >
                <Text style={styles.submitBtnText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Date Picker */}
      <DatePicker
        modal
        open={showDatePicker}
        date={dueDate || new Date()}
        onConfirm={(date) => {
          setDueDate(date);
          setShowDatePicker(false);
        }}
        onCancel={() => setShowDatePicker(false)}
        confirmText="Confirm"
        cancelText="Cancel"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 80,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 12,
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalForm: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 16,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  priorityBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 13,
    fontWeight: '600',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  categoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
  },
  dateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    marginBottom: 16,
  },
  dateText: {
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#6366f1',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    fontWeight: '600',
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default TodoScreen;
