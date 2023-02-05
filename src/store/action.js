import {ADDITION, SUBTRACTION, SETINITIALLOGIN} from './actionTypes';

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
