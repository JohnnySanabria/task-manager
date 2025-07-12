import { Component } from '@angular/core';
import { TaskListComponent } from '../task-list/task-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tasks',
  imports: [TaskListComponent, RouterModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {}
