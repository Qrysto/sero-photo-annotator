import update from 'immutability-helper';

const timeout = 1000; // ms
let timeoutRef = null;
let annotations = undefined;

const storeData = () => {
  localStorage.setItem('annotations', JSON.stringify(annotations))
  timeoutRef = null
  if (process.env.NODE_ENV !== 'production') {
    console.log('Persisted annotations to localStorage', annotations);
  }
}

export default store => next => action => {
  const result = next(action);

  const newState = store.getState();
  const newAnnotations = newState.annotations;

  if (newAnnotations !== annotations) {
    // annotations === undefined is on the very first action
    // newAnnotations is the initial state
    // just initialize annotations by assigning
    const isInitial = annotations === undefined
    annotations = newAnnotations;

    if (!isInitial && !timeoutRef) {
      timeoutRef = setTimeout(storeData, timeout)
    }
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
