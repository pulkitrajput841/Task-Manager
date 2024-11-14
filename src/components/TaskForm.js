import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
	display: flex;
	flex-direction: column;
	margin: 20px 0;
	padding: 20px;
	background-color: #f8f9fa;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
	padding: 10px;
	margin: 8px 0;
	border: 1px solid #ddd;
	border-radius: 5px;
`;

const TextArea = styled.textarea`
	padding: 10px;
	margin: 8px 0;
	border: 1px solid #ddd;
	border-radius: 5px;
`;

const Select = styled.select`
	padding: 10px;
	margin: 8px 0;
	border: 1px solid #ddd;
	border-radius: 5px;
`;

const Button = styled.button`
	padding: 10px;
	background-color: #28a745;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-weight: bold;
	&:hover {
		background-color: #218838;
	}
`;

function TaskForm({ addTask }) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [priority, setPriority] = useState('Low');

	const handleSubmit = (e) => {
		e.preventDefault();
		const newTask = {
			id: Date.now().toString(),
			title,
			description,
			dueDate,
			priority,
			status: 'Pending',
		};
		addTask(newTask);
		setTitle('');
		setDescription('');
		setDueDate('');
		setPriority('Low');
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Input
				type="text"
				placeholder="Task Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			<TextArea
				placeholder="Task Description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				required
			/>
			<Input
				type="date"
				value={dueDate}
				onChange={(e) => setDueDate(e.target.value)}
				required
			/>
			<Select
				value={priority}
				onChange={(e) => setPriority(e.target.value)}
			>
				<option value="Low">Low</option>
				<option value="Medium">Medium</option>
				<option value="High">High</option>
			</Select>
			<Button type="submit">Add Task</Button>
		</Form>
	);
}

export default TaskForm;
