import { createAction, props } from '@ngrx/store';

export const setUsername = createAction(
  '[User] Set Username',
  props<{ username: string }>()
);
