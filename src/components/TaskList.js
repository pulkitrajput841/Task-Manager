import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, updateTask, deleteTask }) {
	return (
		<div className="task-list">
			{tasks.length > 0 ? (
				tasks.map((task) => (
					<TaskItem
						key={task.id}
						task={task}
						updateTask={updateTask}
						deleteTask={deleteTask}
					/>
				))
			) : (
				<p>No tasks available</p>
			)}
		</div>
	);
}

export default TaskList;
