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

    case REMOVESKILLREDUX: {
      return {
        ...state,
        skills: [...state.skills.filter(e => e !== action.payload)],
      };
    }
    case ADDEXPREDUX: {
      return {...state, experience: [...state.experience, action.payload]};
    }
    case REMOVEEXPREDUX: {
      return {
        ...state,
        experience: [...state.experience.filter(e => e !== action.payload)],
      };
    }

    case ADDITION:
      return {...state, counter: state.counter + 1};

    case SUBTRACTION:
      return {...state, counter: state.counter - 1};
    default:
      return state;
  }
};

// case REMOVEEXPREDUX: {
//   return {
//     ...state,
//     experience: state.experience.filter(e => {
//       return (
//         e.title !== action.payload.title ||
//         e.period !== action.payload.period ||
//         e.company !== action.payload.company ||
//         e.city !== action.payload.city ||
//         e.country !== action.payload.country ||
//         e.image !== action.payload.image
//       );
//     }),
//   };
// }
