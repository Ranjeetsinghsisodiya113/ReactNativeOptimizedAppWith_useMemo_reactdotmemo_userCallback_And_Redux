// reducers.js
import { combineReducers } from 'redux';
import {
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  ADD_DRIVER,
  UPDATE_DRIVER,
  DELETE_DRIVER,
} from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_STORAGE_KEY = '@users';
const DRIVER_STORAGE_KEY = '@drivers';

const initialUserState = [];
const initialDriverState = [];

// Function to load users from AsyncStorage
const loadUsersFromStorage = async () => {
  try {
    const users = await AsyncStorage.getItem(USER_STORAGE_KEY);
    return users ? JSON.parse(users) : initialUserState;
  } catch (error) {
    console.error('Failed to load users:', error);
    return initialUserState;
  }
};

// Function to load drivers from AsyncStorage
const loadDriversFromStorage = async () => {
  try {
    const drivers = await AsyncStorage.getItem(DRIVER_STORAGE_KEY);
    return drivers ? JSON.parse(drivers) : initialDriverState;
  } catch (error) {
    console.error('Failed to load drivers:', error);
    return initialDriverState;
  }
};

// Function to save users to AsyncStorage
const saveUsersToStorage = async (users) => {
  try {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Failed to save users:', error);
  }
};

// Function to save drivers to AsyncStorage
const saveDriversToStorage = async (drivers) => {
  try {
    await AsyncStorage.setItem(DRIVER_STORAGE_KEY, JSON.stringify(drivers));
  } catch (error) {
    console.error('Failed to save drivers:', error);
  }
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case ADD_USER: {
      const newState = [...state, action.payload];
      saveUsersToStorage(newState); // Save updated users
      return newState;
    }
    case UPDATE_USER: {
      const newState = state.map((user) =>
        user.id === action.payload.userId ? { ...user, ...action.payload.updatedData } : user
      );
      saveUsersToStorage(newState); // Save updated users
      return newState;
    }
    case DELETE_USER: {
      const newState = state.filter((user) => user.id !== action.payload);
      saveUsersToStorage(newState); // Save updated users
      return newState;
    }
    default:
      return state;
  }
};

const driverReducer = (state = initialDriverState, action) => {
  switch (action.type) {
    case ADD_DRIVER: {
      const newState = [...state, action.payload];
      saveDriversToStorage(newState); // Save updated drivers
      return newState;
    }
    case UPDATE_DRIVER: {
      const newState = state.map((driver) =>
        driver.id === action.payload.driverId ? { ...driver, ...action.payload.updatedData } : driver
      );
      saveDriversToStorage(newState); // Save updated drivers
      return newState;
    }
    case DELETE_DRIVER: {
      const newState = state.filter((driver) => driver.id !== action.payload);
      saveDriversToStorage(newState); // Save updated drivers
      return newState;
    }
    default:
      return state;
  }
};

// Load initial state from AsyncStorage when the app starts
export const loadInitialState = async () => {
  const users = await loadUsersFromStorage();
  const drivers = await loadDriversFromStorage();
  return {
    users,
    drivers,
  };
};

const rootReducer = combineReducers({
  users: userReducer,
  drivers: driverReducer,
});

export default rootReducer;
