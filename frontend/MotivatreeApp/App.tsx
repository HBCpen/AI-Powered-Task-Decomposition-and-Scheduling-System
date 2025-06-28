import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProjectListScreen from './src/screens/ProjectListScreen';
import TaskListScreen from './src/screens/TaskListScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';

const Stack = createStackNavigator();

type RootStackParamList = {
  ProjectList: undefined;
  TaskList: { projectId: number; projectName: string };
  TaskDetail: { projectId: number; taskId: number };
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProjectList">
        <Stack.Screen
          name="ProjectList"
          component={ProjectListScreen}
          options={{ title: 'My Projects' }}
        />
        <Stack.Screen
          name="TaskList"
          component={TaskListScreen}
          options={({ route }) => ({ title: `Tasks for ${route.params.projectName}` })}
        />
        <Stack.Screen
          name="TaskDetail"
          component={TaskDetailScreen}
          options={{ title: 'Task Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;