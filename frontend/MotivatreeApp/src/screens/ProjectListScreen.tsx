
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getProjects, createProject, deleteProject } from '../api/motivatreeApi';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  ProjectList: undefined;
  TaskList: { projectId: number; projectName: string };
};

type ProjectListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProjectList'>;

type Props = {
  navigation: ProjectListScreenNavigationProp;
};

const ProjectListScreen: React.FC<Props> = ({ navigation }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      Alert.alert('Error', 'Failed to fetch projects.');
    }
  };

  const handleCreateProject = async () => {
    if (newProjectName.trim() === '') {
      Alert.alert('Error', 'Project name cannot be empty.');
      return;
    }
    try {
      await createProject({ name: newProjectName, description: newProjectDescription });
      setNewProjectName('');
      setNewProjectDescription('');
      fetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
      Alert.alert('Error', 'Failed to create project.');
    }
  };

  const handleDeleteProject = async (id: number) => {
    try {
      await deleteProject(id);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      Alert.alert('Error', 'Failed to delete project.');
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.projectItem}
      onPress={() => navigation.navigate('TaskList', { projectId: item.id, projectName: item.name })}
    >
      <View>
        <Text style={styles.projectTitle}>{item.name}</Text>
        <Text style={styles.projectDescription}>{item.description}</Text>
      </View>
      <Button title="Delete" onPress={() => handleDeleteProject(item.id)} color="red" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Projects</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Project Name"
          value={newProjectName}
          onChangeText={setNewProjectName}
        />
        <TextInput
          style={styles.input}
          placeholder="New Project Description (Optional)"
          value={newProjectDescription}
          onChangeText={setNewProjectDescription}
        />
        <Button title="Add Project" onPress={handleCreateProject} />
      </View>
      <FlatList
        data={projects}
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
  projectItem: {
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
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  projectDescription: {
    fontSize: 14,
    color: '#666',
  },
  list: {
    flex: 1,
  },
});

export default ProjectListScreen;
