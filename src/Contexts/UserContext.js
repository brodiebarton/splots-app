import React, { createContext, useReducer } from 'react';

export const UserContext = createContext();

export const UserReducer = (state, action) => {
  switch (action.type) {
    case '':
      break;
    default:
      return state;
  }
};

export const UserStateProvider = (props) => {
  const [userState, dispatch] = useReducer(UserReducer, {});

  return (
    <UserContext.Provider value={{ userState: userState, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};
