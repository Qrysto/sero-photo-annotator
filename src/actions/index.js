import { rootID } from 'constants';

export const startEditing = taskID => ({
	type: 'START_EDITING',
	payload: { taskID },
});

export const finishEditing = () => ({
	type: 'FINISH_EDITING',
});

export const updateTask = (taskID, taskContent) => ({
	type: 'UPDATE_TASK',
	payload: { taskID, taskContent },
});

export const newTask = parentID => 
	(dispatch, getState) => {
		const state = getState()
		const taskID = state.todoList.nextID;

		dispatch({
			type: 'NEW_TASK',
			payload: { 
				parentID,
				task: {
					id: taskID,
					content: '',
					done: false,
					subTasks: [],
				}
			},
		});

		dispatch({
			type: 'START_EDITING',
			payload: { taskID },
		})
	};

export const removeTask = (taskID, parentID) => ({
	type: 'REMOVE_TASK',
	payload: { taskID, parentID },
});

export const doneTask = taskID => ({
	type: 'DONE_TASK',
	payload: { taskID },
});

export const undoneTask = taskID => ({
	type: 'UNDONE_TASK',
	payload: { taskID },
});

// Indenting a task is assigning it as a subtask of its closest previous sibling.
// If no closest previous sibling task is found, do nothing.
export const indentTask = (taskID, parentID) =>
	(dispatch, getState) => {
		const { todoList: { rootTaskIDs, tasks } } = getState();

		const sibblingIDs = parentID === 0 ?
			rootTaskIDs : tasks[parentID].subTasks;

		const index = sibblingIDs.indexOf(taskID);
		if (index > 0) {
			const newParentID = sibblingIDs[index - 1];
			dispatch({
				type: 'MOVE_TASK',
				payload: {
					taskID,
					oldParentID: parentID,
					newParentID,
				}
			});
		}
	};

// Outdenting a task is assigning it as a subtask of its grand parent (parent's parent),
// positioned right after its current parent; and assigning all the next siblings as its subtasks
// If no grand parent is found, do nothing.
export const outdentTask = (taskID, parentID) =>
	(dispatch, getState) => {
		const { todoList: { rootTaskIDs, tasks } } = getState();

		let grandParentID = Object.keys(tasks).find(
			id => tasks[id] && tasks[id].subTasks.indexOf(parentID) >= 0
		);
		let parentPos = -1;

		if (grandParentID) {
			parentPos = tasks[grandParentID].subTasks.indexOf(parentID);
		} else {
			parentPos = rootTaskIDs.indexOf(parentID);
			if (parentPos >= 0) {
				grandParentID = rootID;
			}
		}

		if (grandParentID || grandParentID === rootID) {
			const taskIndex = tasks[parentID].subTasks.indexOf(taskID);
			const nextTaskIDs = tasks[parentID].subTasks.slice(taskIndex + 1);

			dispatch({
				type: 'MOVE_TASK',
				payload: {
					taskID,
					oldParentID: parentID,
					newParentID: grandParentID,
					position: parentPos + 1,
				}
			});

			nextTaskIDs.forEach(id => dispatch({
				type: 'MOVE_TASK',
				payload: {
					taskID: id,
					oldParentID: parentID,
					newParentID: taskID,
				}
			}));
		}
	};