import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

// Placeholder components for now
import { Dashboard } from './dashboard/dashboard';
import { TaskList } from './tasks/task-list/task-list';
import { TaskForm } from './tasks/task-form/task-form';
import { TaskDetail } from './tasks/task-detail/task-detail';
import { UserList } from './users/user-list/user-list';


import { MainLayout } from './layout/main-layout/main-layout';
import { Unauthorized } from './shared/unauthorized/unauthorized';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'tasks', component: TaskList },
      { path: 'tasks/new', component: TaskForm, canActivate: [roleGuard],data: { roles: ['Admin', 'Manager'] } },
      { path: 'tasks/:id', component: TaskDetail, canActivate: [roleGuard], data: { role: 'Employee' } },
      { path: 'admin/users', component: UserList, canActivate: [roleGuard], data: { role: 'Admin' } },
    ]
  },
  { path: 'login', component: Login },
  { path: '**', redirectTo: 'dashboard' },
  { path: 'unauthorized', component: Unauthorized }
];
