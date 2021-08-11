import { Action } from '@ngrx/store';
export const initialState = false;
export const SET_THEME = 'SET_THEME';
export function themeReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_THEME:
      state = action.payload
      return state;
    default:
      return state;
  }
}