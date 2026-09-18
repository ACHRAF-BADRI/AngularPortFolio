import { Component, inject } from '@angular/core';
import { DarkModeService } from './services/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-portfolio';

  private darkModeService = inject(DarkModeService);
  isDark = this.darkModeService.isDark;

  toggleTheme(): void {
    this.darkModeService.toggle();
  }
}
