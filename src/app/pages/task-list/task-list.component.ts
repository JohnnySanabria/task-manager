import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { filter, Observable } from 'rxjs';
import { AsyncPipe, NgIf, DatePipe } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-task-list',
  imports: [AsyncPipe, NgIf, DatePipe, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  tasks$: Observable<Task[]>;

  constructor(private taskSvc: TaskService, private router: Router) {}

  ngOnInit() {
    this.tasks$ = this.taskSvc.getTasks();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.tasks$ = this.taskSvc.getTasks(); // Refresh on navigation
      });
  }

  onDelete(id: string) {
    this.taskSvc.deleteTask(id).subscribe(() => {
      this.tasks$ = this.taskSvc.getTasks(); // Refresh the task list
    });
  }
}
