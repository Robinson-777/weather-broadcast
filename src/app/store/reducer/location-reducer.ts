import { Action } from '@ngrx/store';
export const initialState = '';
export const SET_LOCATION = 'SET_LOCATION';
export function locationReducer(state = initialState, action: any) {
    state = '';
    switch (action.type) {
        case SET_LOCATION:
            state = action.payload
            return state;
        default:
            return state;
    }
}