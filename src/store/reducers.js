import {ADDITION, SUBTRACTION, SETINITIALLOGIN} from './actionTypes';

const initialState = Object;
export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETINITIALLOGIN: {
      console.log('yahan se araha hey store se: ', action.payload);
      return action.payload;
    }

    case ADDITION:
      return {...state, counter: state.counter + 1};

    case SUBTRACTION:
      return {...state, counter: state.counter - 1};
    default:
      return state;
  }
};
