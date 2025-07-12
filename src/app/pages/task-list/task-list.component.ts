import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-task-list',
  imports: [AsyncPipe, NgIf, DatePipe, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  tasks$: Observable<Task[]>;

  constructor(private taskSvc: TaskService) {}

  ngOnInit() {
    this.tasks$ = this.taskSvc.getTasks();
  }

  onDelete(id: string) {
    this.taskSvc.deleteTask(id).subscribe(() => {
      this.tasks$ = this.taskSvc.getTasks(); // Refresh the task list
    });
  }
}
