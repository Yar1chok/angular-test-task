import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TuiRoot, TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-root',
  imports: [TuiRoot, TuiButton, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(public router: Router) {}
  protected readonly title = signal('test-task');
}
