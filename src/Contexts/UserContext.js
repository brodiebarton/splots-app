import React, { createContext, useReducer } from 'react';

export const UserContext = createContext();

export const USER_ACTIONS = {
  CHANGE_SELECTION: 'CHANGE_SELECTION',
  CHANGE_SELECTION_INDEX: 'CHANGE_SELECTION_INDEX',
  CHANGE_SELECTION_STATUS: 'CHANGE_SELECTION_STATUS',
  CHANGE_SELECTION_CATEGORY: 'CHANGE_SELECTION_CATEGORY',
  CHANGE_SELECTION_VALUE: 'CHANGE_SELECTION_VALUE',
  SELECTION_RESET: 'SELECTION_RESET',
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTIONS.CHANGE_SELECTION:
      return {
        ...state,
        selection: { ...state.selection, point: action.newPoint },
      };
    case USER_ACTIONS.CHANGE_SELECTION_INDEX:
      return {
        ...state,
        selection: {
          ...state.selection,
          point: {
            ...state.selection.point,
            index: action.newIndex,
          },
        },
      };
    case USER_ACTIONS.CHANGE_SELECTION_STATUS:
      return {
        ...state,
        selection: {
          ...state.selection,
          point: {
            ...state.selection.point,
            isPointSelected: action.newStatus,
          },
        },
      };
    case USER_ACTIONS.CHANGE_SELECTION_CATEGORY:
      return {
        ...state,
        selection: {
          ...state.selection,
          point: {
            ...state.selection.point,
            categoryName: action.newCategoryName,
          },
        },
      };
    case USER_ACTIONS.CHANGE_SELECTION_VALUE:
      return {
        ...state,
        selection: {
          ...state.selection,
          point: {
            ...state.selection.point,
            yValue: action.newYValue,
          },
        },
      };
    case USER_ACTIONS.SELECTION_RESET:
      return {
        ...state,
        selection: {
          ...state.selection,
          point: {
            index: -1,
            isPointSelected: false,
            categoryName: '',
            yValue: 0,
          },
        },
      };
    default:
      return state;
  }
};

export const UserStateProvider = (props) => {
  const [userState, userStateDispatch] = useReducer(UserReducer, {
    selection: {
      point: {
        index: -1,
        isPointSelected: false,
        categoryName: '',
        yValue: 0,
      },
    },
  });

  return (
    <UserContext.Provider value={{ userState: userState, userStateDispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};
