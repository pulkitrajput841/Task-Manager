import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import styled from 'styled-components';
import './App.css';

const AppContainer = styled.div`
	max-width: 1000px;
	margin: auto;
	padding: 20px;
	font-family: Arial, sans-serif;
`;

const Header = styled.header`
	text-align: center;
	padding: 20px;
`;

const Title = styled.h1`
	font-size: 2rem;
	color: #2c3e50;
`;

const SearchContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 10px;
`;

const Button = styled.button`
	padding: 10px 15px;
	background-color: #2980b9;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-weight: bold;
	font-size: 1rem;
	transition: background-color 0.3s;
	&:hover {
		background-color: #3498db;
	}
`;

const FilterContainer = styled.div`
	padding-right: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const TaskContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 20px;
	margin-top: 20px;
`;

const Column = styled.div`
	background-color: #ecf0f1;
	border-radius: 8px;
	padding: 15px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ColumnTitle = styled.h2`
	font-size: 1.5rem;
	color: #2c3e50;
	margin-bottom: 10px;
	border-bottom: 2px solid #bdc3c7;
	padding-bottom: 5px;
`;

const Label = styled.label`
	font-size: 1rem;
	color: #333;
	font-weight: bold;
`;

const PriorityFilter = styled.select`
	padding: 4px;
	font-size: 1rem;
	border: 1px solid #ddd;
	border-radius: 5px;
	background-color: #ecf0f1;
	color: #333;
	cursor: pointer;
	width: 200px;
	transition: all 0.3s ease;

	&:hover {
		border-color: #2980b9;
	}

	&.high {
		background-color: #e74c3c;
		color: white;
	}

	&.medium {
		background-color: #f39c12;
		color: white;
	}

	&.low {
		background-color: #2ecc71;
		color: white;
	}
`;

function App() {
	const [tasks, setTasks] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [filter, setFilter] = useState('all');
	const [priorityFilter, setPriorityFilter] = useState('all');
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
		if (savedTasks.length !== 0) setTasks(savedTasks);
	}, []);

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	const addTask = (newTask) => {
		setTasks([...tasks, newTask]);
		setShowForm(false); // Close form after adding task
	};

	const updateTask = (updatedTask) => {
		setTasks(
			tasks.map((task) =>
				task.id === updatedTask.id ? updatedTask : task
			)
		);
	};

	const deleteTask = (taskId) => {
		setTasks(tasks.filter((task) => task.id !== taskId));
	};

	const filteredTasks = tasks
		.filter(
			(task) =>
				task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				task.description
					.toLowerCase()
					.includes(searchTerm.toLowerCase())
		)
		.filter(
			(task) =>
				filter === 'all' ||
				(filter === 'completed' && task.status === 'Completed') ||
				(filter === 'pending' && task.status === 'Pending')
		)
		.filter(
			(task) =>
				priorityFilter === 'all' || task.priority === priorityFilter
		);

	const today = new Date().toISOString().split('T')[0];

	const upcomingTasks = filteredTasks.filter(
		(task) => task.status === 'Pending' && task.dueDate >= today
	);
	const overdueTasks = filteredTasks.filter(
		(task) => task.status === 'Pending' && task.dueDate < today
	);
	const completedTasks = filteredTasks.filter(
		(task) => task.status === 'Completed'
	);

	return (
		<AppContainer>
			<Header>
				<Title>Task Manager</Title>
				<SearchContainer>
					<input
						type="text"
						placeholder="Search tasks"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="search-input"
					/>
					<FilterContainer>
						<Label>Priority Filter:</Label>
						<PriorityFilter
							onChange={(e) => setPriorityFilter(e.target.value)}
						>
							<option value="all">All</option>
							<option value="High">High</option>
							<option value="Medium">Medium</option>
							<option value="Low">Low</option>
						</PriorityFilter>
					</FilterContainer>
					<Button onClick={() => setShowForm(!showForm)}>
						{showForm ? 'Close Form' : 'Add Task'}
					</Button>
				</SearchContainer>
			</Header>
			{showForm && <TaskForm addTask={addTask} />}
			<TaskContainer>
				<Column>
					<ColumnTitle>Upcoming Tasks</ColumnTitle>
					<TaskList
						tasks={upcomingTasks}
						updateTask={updateTask}
						deleteTask={deleteTask}
					/>
				</Column>
				<Column>
					<ColumnTitle>Overdue Tasks</ColumnTitle>
					<TaskList
						tasks={overdueTasks}
						updateTask={updateTask}
						deleteTask={deleteTask}
					/>
				</Column>
				<Column>
					<ColumnTitle>Completed Tasks</ColumnTitle>
					<TaskList
						tasks={completedTasks}
						updateTask={updateTask}
						deleteTask={deleteTask}
					/>
				</Column>
			</TaskContainer>
		</AppContainer>
	);
}

export default App;
