import {
  ADDITION,
  SUBTRACTION,
  SETINITIALLOGIN,
  CHANGEUSERPROFILE,
  ADDSKILLREDUX,
  REMOVESKILLREDUX,
  ADDEXPREDUX,
  REMOVEEXPREDUX,
} from './actionTypes';

export const addition = () => ({
  type: ADDITION,
});

export const subtraction = () => ({
  type: SUBTRACTION,
});

export const setInititialLogin = data => ({
  type: SETINITIALLOGIN,
  payload: data,
});

export const changeUserProfile = (data, data2) => ({
  type: CHANGEUSERPROFILE,
  payload: data,
  payload2: data2,
});

export const addSkillRedux = data => ({
  type: ADDSKILLREDUX,
  payload: data,
});

export const removeSkillRedux = data => ({
  type: REMOVESKILLREDUX,
  payload: data,
});

export const addExpRedux = data => ({
  type: ADDEXPREDUX,
  payload: data,
});

export const removeExpRedux = index => ({
  type: REMOVEEXPREDUX,
  payload: index,
});
