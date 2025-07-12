import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'task-manager';
}
