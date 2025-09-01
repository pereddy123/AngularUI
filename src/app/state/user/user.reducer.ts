import { createReducer, on } from '@ngrx/store';
import { initialUserState } from './user.state';
import { setUsername } from '../user.actions';

export const userReducer = createReducer(
  initialUserState,
  on(setUsername, (state, { username }) => ({
    ...state,
    username
  }))
);
