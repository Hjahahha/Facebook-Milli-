import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from '@react-native-vector-icons/material-community';
import { useTodos } from '../hooks/useTodos';
import { useTheme } from '../context/ThemeContext';
import { Todo, Category } from '../types';

interface TodoItemProps {
  todo: Todo;
  categories: Category[];
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, categories }) => {
  const { toggleTodo, updateTodo, deleteTodo } = useTodos();
  const { isDark } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const theme = {
    bg: isDark ? '#111827' : '#ffffff',
    card: isDark ? '#1f2937' : '#f3f4f6',
    text: isDark ? '#f3f4f6' : '#111827',
    subtext: isDark ? '#9ca3af' : '#6b7280',
    border: isDark ? '#374151' : '#e5e7eb',
  };

  const category = categories.find((c) => c.id === todo.categoryId);
  const isOverdue =
    !todo.completed &&
    todo.dueDate &&
    new Date(todo.dueDate) < new Date();

  const priorityColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444',
  };

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      updateTodo(todo.id, { title: editTitle });
      setShowModal(false);
    }
  };

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: () => deleteTodo(todo.id),
        style: 'destructive',
      },
    ]);
  };

  return (
    <>
      <View
        style={[
          styles.container,
          { backgroundColor: theme.card },
          todo.completed && { opacity: 0.6 },
        ]}
      >
        <TouchableOpacity
          style={styles.checkBox}
          onPress={() => toggleTodo(todo.id)}
        >
          <MaterialCommunityIcons
            name={todo.completed ? 'check-circle' : 'circle-outline'}
            size={24}
            color={todo.completed ? '#10b981' : theme.subtext}
          />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text
            style={[
              styles.title,
              { color: theme.text },
              todo.completed && styles.completedTitle,
            ]}
          >
            {todo.title}
          </Text>
          <View style={styles.metaRow}>
            {category && (
              <View style={styles.metaItem}>
                <View
                  style={[
                    styles.categoryDot,
                    { backgroundColor: category.color },
                  ]}
                />
                <Text style={[styles.metaText, { color: theme.subtext }]}>
                  {category.name}
                </Text>
              </View>
            )}
            {todo.priority && (
              <View style={styles.metaItem}>
                <View
                  style={[
                    styles.priorityBadge,
                    { backgroundColor: priorityColors[todo.priority] },
                  ]}
                />
                <Text style={[styles.metaText, { color: theme.subtext }]}>
                  {todo.priority}
                </Text>
              </View>
            )}
            {todo.dueDate && (
              <View style={[styles.metaItem, isOverdue && { opacity: 0.7 }]}>
                <MaterialCommunityIcons
                  name="calendar"
                  size={14}
                  color={isOverdue ? '#ef4444' : theme.subtext}
                />
                <Text
                  style={[
                    styles.metaText,
                    {
                      color: isOverdue ? '#ef4444' : theme.subtext,
                    },
                  ]}
                >
                  {new Date(todo.dueDate).toLocaleDateString()}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => setShowModal(true)}
          >
            <MaterialCommunityIcons name="pencil" size={18} color="#6366f1" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handleDelete}
          >
            <MaterialCommunityIcons name="delete" size={18} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShowModal(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Edit Task
            </Text>
            <TextInput
              style={[
                styles.modalInput,
                {
                  backgroundColor: theme.bg,
                  color: theme.text,
                  borderColor: theme.border,
                },
              ]}
              value={editTitle}
              onChangeText={setEditTitle}
              placeholder="Task title"
              placeholderTextColor={theme.subtext}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: theme.bg }]}
                onPress={() => setShowModal(false)}
              >
                <Text style={[styles.modalBtnText, { color: theme.text }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#6366f1' }]}
                onPress={handleSaveEdit}
              >
                <Text style={[styles.modalBtnText, { color: '#ffffff' }]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  checkBox: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  categoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  priorityBadge: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  metaText: {
    fontSize: 11,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default TodoItem;
