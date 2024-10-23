// store.js
import { createStore } from 'redux';
import rootReducer, { loadInitialState } from './reducers';

const configureStore = async () => {
  const initialState = await loadInitialState();
  const store = createStore(rootReducer, initialState);
  return store;
};

export default configureStore;
