// actions.js
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

export const ADD_DRIVER = 'ADD_DRIVER';
export const UPDATE_DRIVER = 'UPDATE_DRIVER';
export const DELETE_DRIVER = 'DELETE_DRIVER';

// User Actions
export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const updateUser = (userId, updatedData) => ({
  type: UPDATE_USER,
  payload: { userId, updatedData },
});

export const deleteUser = (userId) => ({
  type: DELETE_USER,
  payload: userId,
});

// Driver Actions
export const addDriver = (driver) => ({
  type: ADD_DRIVER,
  payload: driver,
});

export const updateDriver = (driverId, updatedData) => ({
  type: UPDATE_DRIVER,
  payload: { driverId, updatedData },
});

export const deleteDriver = (driverId) => ({
  type: DELETE_DRIVER,
  payload: driverId,
});
