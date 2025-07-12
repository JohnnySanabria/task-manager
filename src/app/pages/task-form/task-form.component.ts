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
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.editMode = true;
      this.taskSvc.getTasks().subscribe((tasks) => {
        const match = tasks.find((t) => t._id === this.taskId);
        if (match) this.form.patchValue(match);
      });
    }
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
