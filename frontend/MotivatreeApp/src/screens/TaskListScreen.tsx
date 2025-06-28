
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getTasks, createTask, updateTask, deleteTask } from '../api/motivatreeApi';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  ProjectList: undefined;
  TaskList: { projectId: number; projectName: string };
  TaskDetail: { projectId: number; taskId: number };
};

type TaskListScreenRouteProp = RouteProp<RootStackParamList, 'TaskList'>;
type TaskListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskList'>;

type Props = {
  route: TaskListScreenRouteProp;
  navigation: TaskListScreenNavigationProp;
};

const TaskListScreen: React.FC<Props> = ({ route, navigation }) => {
  const { projectId, projectName } = route.params;
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState(''); // YYYY-MM-DD

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks(projectId);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      Alert.alert('Error', 'Failed to fetch tasks.');
    }
  };

  const handleCreateTask = async () => {
    if (newTaskName.trim() === '') {
      Alert.alert('Error', 'Task name cannot be empty.');
      return;
    }
    try {
      await createTask(projectId, {
        name: newTaskName,
        description: newTaskDescription,
        status: 'pending',
        dueDate: newTaskDueDate,
      });
      setNewTaskName('');
      setNewTaskDescription('');
      setNewTaskDueDate('');
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
      Alert.alert('Error', 'Failed to create task.');
    }
  };

  const handleToggleTaskStatus = async (taskId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    try {
      await updateTask(projectId, taskId, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
      Alert.alert('Error', 'Failed to update task status.');
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(projectId, taskId);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      Alert.alert('Error', 'Failed to delete task.');
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => navigation.navigate('TaskDetail', { projectId: projectId, taskId: item.id })} style={styles.taskInfo}>
        <Text style={styles.taskName}>{item.name}</Text>
        <Text style={styles.taskDescription}>{item.description}</Text>
        <Text style={styles.taskStatus}>Status: {item.status}</Text>
        <Text style={styles.taskDueDate}>Due: {item.dueDate}</Text>
      </TouchableOpacity>
      <View style={styles.taskActions}>
        <Button
          title={item.status === 'pending' ? 'Complete' : 'Reopen'}
          onPress={() => handleToggleTaskStatus(item.id, item.status)}
        />
        <Button title="Delete" onPress={() => handleDeleteTask(item.id)} color="red" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tasks for {projectName}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Task Name"
          value={newTaskName}
          onChangeText={setNewTaskName}
        />
        <TextInput
          style={styles.input}
          placeholder="New Task Description (Optional)"
          value={newTaskDescription}
          onChangeText={setNewTaskDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Due Date (YYYY-MM-DD)"
          value={newTaskDueDate}
          onChangeText={setNewTaskDueDate}
        />
        <Button title="Add Task" onPress={handleCreateTask} />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskInfo: {
    flex: 1,
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
  },
  taskStatus: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
  },
  taskDueDate: {
    fontSize: 12,
    color: '#333',
  },
  taskActions: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  list: {
    flex: 1,
  },
});

export default TaskListScreen;
