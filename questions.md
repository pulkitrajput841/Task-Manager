# Task Manager

## Overview

This Task Manager application is built with React and provides features to manage tasks efficiently. The application allows users to update, delete, and filter tasks, and it is designed for scalability and performance.

## Q1) How long did you spend on the coding test?

- I spent around **8 hours** working on the coding test, including time spent on testing and debugging.

## Q2) What was the most useful feature that was added to the latest version of your chosen language?

### React Hooks

In this TaskList component, I'm displaying a list of tasks passed in as props and using a child component, `TaskItem`, for each task. This setup works well with React hooks (`useState` and `useEffect`), allowing for efficient management of task updates, deletions, and filtering in the parent component.

Here's how `TaskList` might look when integrated with `useState` and `useEffect` in a parent component for managing tasks:

```javascript
import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from an API when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array to run only once

  // Update task handler
  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  // Delete task handler
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
}

export default TaskManager;
```
## Q3) How would you track down a performance issue in production?

To track down a performance issue in a React task manager in production:

- Browser DevTools: Use the Network panel to identify slow API calls and the Performance panel to locate rendering bottlenecks.
- React DevTools: Use the Profiler to find components that re-render unnecessarily, which might be causing delays.
- Optimize Network Requests: Reduce redundant API calls and consider caching responses.
- Code Splitting: Use React.lazy and Suspense to lazy load components, speeding up initial loads.
- Memoization: Use React.memo, useCallback, and useMemo to avoid unnecessary re-renders in frequently updated components.
- Real User Monitoring: Use tools like Sentry or LogRocket to gather real-time performance data from users.

## Q4)  If you had more time, what additional features or improvements would you consider adding to the task management application?

If I had more time to enhance the task management application, I would consider adding the following features and improvements:

- Authentication and Authorization: Implement user login and role-based access to allow multiple users to manage their tasks securely and personalize their task lists.
- Task Filtering and Sorting: Enable filtering tasks by status, priority, or due date, and allow users to sort tasks by these attributes for better organization.
- Drag-and-Drop Task Management: Implement a drag-and-drop interface for easy reordering of tasks or assigning tasks to different categories or projects.
- Notifications and Reminders: Add push notifications or email reminders for upcoming deadlines or task updates, ensuring users stay on top of their work.
