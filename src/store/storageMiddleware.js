import update from 'immutability-helper';

export default store => next => action => {
  const currentState = store.getState();
  const currentTodoList = currentState.annotations;

  const result = next(action);

  const newState = store.getState();
  const newTodoList = newState.annotations;

  if (newTodoList !== currentTodoList) {
    localStorage.setItem('annotations', JSON.stringify(newTodoList));
  }

  return result;
}

export function loadStoredData(initialState) {
  const storedData = localStorage.getItem('annotations');

  if (storedData) {
    const annotations = JSON.parse(storedData);

    return update(initialState, {
      annotations: {
        $set: annotations
      }
    });
  }

  return initialState;
}
