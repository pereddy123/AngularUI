import { UserState } from './state/user/user.state'; // adjust path based on where you placed it

export interface AppState {
  user: UserState;
}
