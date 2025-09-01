import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectUserState = (state: AppState) => state.user;

export const selectUsername = createSelector(
  selectUserState,
  (state) => state.username
);
