import {
  ADDITION,
  SUBTRACTION,
  SETINITIALLOGIN,
  CHANGEUSERPROFILE,
  ADDSKILLREDUX,
} from './actionTypes';

const initialState = Object;
export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETINITIALLOGIN: {
      console.log('yahan se araha hey store se: ', action.payload);
      return action.payload;
    }

    case CHANGEUSERPROFILE: {
      return {...state, [action.payload]: action.payload2};
    }

    case ADDSKILLREDUX: {
      return {...state, skills: [...state.skills, action.payload]};
    }

    case ADDITION:
      return {...state, counter: state.counter + 1};

    case SUBTRACTION:
      return {...state, counter: state.counter - 1};
    default:
      return state;
  }
};
