import { Routes } from '@angular/router';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TasksComponent } from './pages/tasks/tasks.component';

export const routes: Routes = [
  { redirectTo: 'tasks', path: '', pathMatch: 'full' },
  {
    path: 'tasks',
    component: TasksComponent,
    children: [
      { path: 'create', component: TaskFormComponent },
      { path: 'edit/:id', component: TaskFormComponent },
    ],
  },
];
