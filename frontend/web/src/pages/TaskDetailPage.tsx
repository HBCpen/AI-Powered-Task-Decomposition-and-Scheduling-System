
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { getTaskById, updateTask, deleteTask } from '../api/motivatreeApi';
import { Task } from '../types/Task';

const TaskDetailPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (taskId) {
      fetchTask(taskId);
    }
  }, [taskId]);

  const fetchTask = async (id: string) => {
    try {
      const data = await getTaskById(id);
      setTask(data);
    } catch (err) {
      setError('Failed to fetch task.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setTask((prevTask) => {
      if (!prevTask) return null;
      return { ...prevTask, [name as string]: value };
    });
  };

  const handleUpdate = async () => {
    if (task) {
      try {
        await updateTask(task.id, task);
        alert('Task updated successfully!');
      } catch (err) {
        setError('Failed to update task.');
        console.error(err);
      }
    }
  };

  const handleDelete = async () => {
    if (task && window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task.id);
        alert('Task deleted successfully!');
        navigate(`/projects/${task.projectId}`); // Navigate back to project tasks
      } catch (err) {
        setError('Failed to delete task.');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <Container maxWidth="md"><Typography>Loading task...</Typography></Container>;
  }

  if (error) {
    return <Container maxWidth="md"><Typography color="error">{error}</Typography></Container>;
  }

  if (!task) {
    return <Container maxWidth="md"><Typography>Task not found.</Typography></Container>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Task Detail
      </Typography>
      <Box component="form" sx={{ '& .MuiTextField-root': { mb: 2 }, '& .MuiFormControl-root': { mb: 2 } }}>
        <TextField
          label="Title"
          name="title"
          value={task.title}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Description"
          name="description"
          value={task.description || ''}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          variant="outlined"
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Priority</InputLabel>
          <Select
            label="Priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Due Date"
          name="dueDate"
          type="date"
          value={task.dueDate ? task.dueDate.split('T')[0] : ''}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update Task
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete Task
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TaskDetailPage;
