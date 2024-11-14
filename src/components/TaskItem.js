import React, { useState } from 'react';
import styled from 'styled-components';

const TaskItemContainer = styled.div`
	display: flex;
	background-color: ${(props) => (props.completed ? '#d5f7d2' : '#fff')};
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	margin: 10px 0;
	overflow: hidden;
	opacity: ${(props) => (props.completed ? 0.6 : 1)};
`;

const PriorityStrip = styled.div`
	width: 5px;
	background-color: ${(props) =>
		props.priority === 'High'
			? '#e74c3c'
			: props.priority === 'Medium'
			? '#f39c12'
			: '#2ecc71'};
`;

const ContentContainer = styled.div`
	padding: 15px;
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const TaskTitle = styled.h3`
	font-size: 1.2rem;
	color: #2c3e50;
	margin: 0;
	text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
`;

const TaskDescription = styled.p`
	font-size: 0.9rem;
	color: #555;
	margin-top: 5px;
	text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
`;

const SeeMore = styled.span`
	color: #2980b9;
	cursor: pointer;
	font-size: 0.9rem;
	font-weight: bold;
	margin-left: 5px;
`;

const TaskInfo = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 10px;
	align-items: center;
`;

const DueDate = styled.span`
	font-size: 0.8rem;
	color: #7f8c8d;
`;

const PriorityLabel = styled.span`
	font-size: 0.8rem;
	color: ${(props) =>
		props.priority === 'High'
			? '#e74c3c'
			: props.priority === 'Medium'
			? '#f39c12'
			: '#2ecc71'};
	font-weight: bold;
`;

const ButtonContainer = styled.div`
	display: flex;
	gap: 10px;
	margin-top: 10px;
`;

const EditButton = styled.button`
	padding: 8px 12px;
	background-color: #2980b9;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 0.9rem;
	font-weight: bold;
	transition: background-color 0.3s;
	&:hover {
		background-color: #3498db;
	}
`;

const DeleteButton = styled.button`
	padding: 8px 12px;
	background-color: #e74c3c;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 0.9rem;
	font-weight: bold;
	transition: background-color 0.3s;
	&:hover {
		background-color: #c0392b;
	}
`;

const CompleteButton = styled.button`
	padding: 8px 12px;
	background-color: ${(props) => (props.completed ? '#7f8c8d' : '#2ecc71')};
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 0.9rem;
	font-weight: bold;
	transition: background-color 0.3s;
	&:hover {
		background-color: ${(props) =>
			props.completed ? '#95a5a6' : '#27ae60'};
	}
`;

const TaskItem = ({ task, updateTask, deleteTask }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(task.title);
	const [editDescription, setEditDescription] = useState(task.description);
	const [editDueDate, setEditDueDate] = useState(task.dueDate);
	const [editPriority, setEditPriority] = useState(task.priority);

	const maxDescriptionLength = 100;

	const toggleDescription = () => setIsExpanded(!isExpanded);

	const toggleCompletion = () => {
		if (task.status === 'Pending') {
			updateTask({
				...task,
				status: 'Completed',
			});
		} else {
			updateTask({
				...task,
				status: 'Pending',
			});
		}
	};

	const handleSave = () => {
		updateTask({
			...task,
			title: editTitle,
			description: editDescription,
			dueDate: editDueDate,
			priority: editPriority,
		});
		setIsEditing(false);
	};

	const displayDescription =
		isExpanded || task.description.length <= maxDescriptionLength
			? task.description
			: `${task.description.substring(0, maxDescriptionLength)}...`;

	return (
		<TaskItemContainer completed={task.status === 'Completed'}>
			<PriorityStrip priority={task.priority} />
			<ContentContainer>
				{isEditing ? (
					<>
						<input
							value={editTitle}
							onChange={(e) => setEditTitle(e.target.value)}
							placeholder="Title"
						/>
						<textarea
							value={editDescription}
							onChange={(e) => setEditDescription(e.target.value)}
							placeholder="Description"
						/>
						<input
							type="date"
							value={editDueDate}
							onChange={(e) => setEditDueDate(e.target.value)}
						/>
						<select
							value={editPriority}
							onChange={(e) => setEditPriority(e.target.value)}
						>
							<option value="High">High</option>
							<option value="Medium">Medium</option>
							<option value="Low">Low</option>
						</select>
						<ButtonContainer>
							<EditButton onClick={handleSave}>Save</EditButton>
							<DeleteButton onClick={() => setIsEditing(false)}>
								Cancel
							</DeleteButton>
						</ButtonContainer>
					</>
				) : (
					<>
						<TaskTitle completed={task.status === 'Completed'}>
							{task.title}
						</TaskTitle>
						<TaskDescription
							completed={task.status === 'Completed'}
						>
							{displayDescription}
							{task.description.length > maxDescriptionLength && (
								<SeeMore onClick={toggleDescription}>
									{isExpanded ? 'See Less' : 'See More'}
								</SeeMore>
							)}
						</TaskDescription>
						<TaskInfo>
							<DueDate>Due: {task.dueDate}</DueDate>
							<PriorityLabel priority={task.priority}>
								Priority: {task.priority}
							</PriorityLabel>
						</TaskInfo>
						<ButtonContainer>
							<CompleteButton
								onClick={toggleCompletion}
								completed={task.status === 'Completed'}
							>
								{task.status === 'Completed'
									? 'Mark as Incomplete'
									: 'Mark as Completed'}
							</CompleteButton>
							<EditButton onClick={() => setIsEditing(true)}>
								Edit
							</EditButton>
							<DeleteButton onClick={() => deleteTask(task.id)}>
								Delete
							</DeleteButton>
						</ButtonContainer>
					</>
				)}
			</ContentContainer>
		</TaskItemContainer>
	);
};

export default TaskItem;
