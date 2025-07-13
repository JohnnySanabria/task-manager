import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  editMode: boolean = false;
  taskId: string | null = null;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private taskSvc: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      description: [''],
      dueDate: [''],
      status: [''],
    });
    this.route.paramMap.subscribe((params) => {
      this.taskId = params.get('id');
      if (this.taskId) {
        this.editMode = true;
        this.taskSvc.getTasks().subscribe((tasks) => {
          const match = tasks.find((t) => t._id === this.taskId);
          if (match) {
            const formattedDate = match.dueDate
              ? match.dueDate.substring(0, 10)
              : null;
            this.form.patchValue({
              name: match.name,
              description: match.description,
              dueDate: formattedDate,
              status: match.status,
            });
          }
        });
      }
    });
  }
  onSubmit() {
    const task = this.form.value;
    if (this.editMode && this.taskId) {
      const updatedTask = { ...task, _id: this.taskId };
      this.taskSvc.updateTask(updatedTask).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    } else {
      this.taskSvc.createTask(task).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}
