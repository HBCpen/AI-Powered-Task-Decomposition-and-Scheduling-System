
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';
import { Add as AddIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { getTasksByProjectId, createTask } from '../api/motivatreeApi';
import { Task } from '../types/Task';

const TaskListPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  useEffect(() => {
    if (projectId) {
      fetchTasks(projectId);
    }
  }, [projectId]);

  const fetchTasks = async (id: string) => {
    try {
      const data = await getTasksByProjectId(id);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  const handleCreateTask = async () => {
    if (projectId) {
      try {
        await createTask(projectId, newTaskTitle, newTaskDescription);
        fetchTasks(projectId);
        handleClose();
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tasks for Project {projectId}
        </Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
          Create New Task
        </Button>
      </Box>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} divider>
            <ListItemText
              primary={task.title}
              secondary={task.description || 'No description'}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="view task" component={Link} to={`/tasks/${task.id}`}>
                <VisibilityIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            type="text"
            fullWidth
            variant="standard"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="standard"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateTask} disabled={!newTaskTitle}>Create</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TaskListPage;
