
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { updateTask, deleteTask, getTasks } from '../api/motivatreeApi';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  ProjectList: undefined;
  TaskList: { projectId: number; projectName: string };
  TaskDetail: { projectId: number; taskId: number };
};

type TaskDetailScreenRouteProp = RouteProp<RootStackParamList, 'TaskDetail'>;
type TaskDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskDetail'>;

type Props = {
  route: TaskDetailScreenRouteProp;
  navigation: TaskDetailScreenNavigationProp;
};

const TaskDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { projectId, taskId } = route.params;
  const [task, setTask] = useState<any>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    fetchTaskDetail();
  }, []);

  const fetchTaskDetail = async () => {
    try {
      // Fetch all tasks for the project and find the specific task
      const tasks = await getTasks(projectId);
      const foundTask = tasks.find((t: any) => t.id === taskId);
      if (foundTask) {
        setTask(foundTask);
        setName(foundTask.name);
        setDescription(foundTask.description);
        setStatus(foundTask.status);
        setDueDate(foundTask.dueDate);
      } else {
        Alert.alert('Error', 'Task not found.');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error fetching task detail:', error);
      Alert.alert('Error', 'Failed to fetch task details.');
      navigation.goBack();
    }
  };

  const handleUpdateTask = async () => {
    try {
      await updateTask(projectId, taskId, { name, description, status, dueDate });
      Alert.alert('Success', 'Task updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating task:', error);
      Alert.alert('Error', 'Failed to update task.');
    }
  };

  const handleDeleteTask = async () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteTask(projectId, taskId);
              Alert.alert('Success', 'Task deleted successfully!');
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting task:', error);
              Alert.alert('Error', 'Failed to delete task.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (!task) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading task details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Status (e.g., pending, completed)"
        value={status}
        onChangeText={setStatus}
      />
      <TextInput
        style={styles.input}
        placeholder="Due Date (YYYY-MM-DD)"
        value={dueDate}
        onChangeText={setDueDate}
      />
      <Button title="Update Task" onPress={handleUpdateTask} />
      <View style={styles.deleteButtonContainer}>
        <Button title="Delete Task" onPress={handleDeleteTask} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  deleteButtonContainer: {
    marginTop: 20,
  },
});

export default TaskDetailScreen;
