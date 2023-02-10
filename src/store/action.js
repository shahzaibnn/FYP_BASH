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

export const addExpRedux = (
  expTitle,
  expTime,
  expOrg,
  expLoc,
  expCountry,
  expImage,
) => ({
  type: ADDEXPREDUX,
  payload1: expTitle,
  payload2: expTime,
  payload3: expOrg,
  payload4: expLoc,
  payload5: expCountry,
  payload6: expImage,
  // payload: {
  //   expTitle,
  //   expTime,
  //   expOrg,
  //   expLoc,
  //   expCountry,
  //   expImage,
  // },
});

export const removeExpRedux = (
  expTitle,
  expTime,
  expOrg,
  expLoc,
  expCountry,
  expImage,
) => ({
  type: REMOVEEXPREDUX,
  payload1: expTitle,
  payload2: expTime,
  payload3: expOrg,
  payload4: expLoc,
  payload5: expCountry,
  payload6: expImage,
});

// export const removeExpRedux = (
//   expTitle,
//   expTime,
//   expOrg,
//   expLoc,
//   expCountry,
//   expImage,
// ) => ({
//   type: REMOVEEXPREDUX,
//   payload: {
//     expTitle,
//     expTime,
//     expOrg,
//     expLoc,
//     expCountry,
//     expImage,
//   },
// });
