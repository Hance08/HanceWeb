import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService, ThemeMode } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button (click)="toggleTheme()" class="theme-toggle-button">
      <div *ngIf="currentTheme === 'dark'" class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      </div>
      <div *ngIf="currentTheme === 'light'" class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </div>
    </button>
  `,
  styles: [`
    .theme-toggle-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s;
      background-color: rgba(0, 0, 0, 0.1);
    }

    .dark-theme .theme-toggle-button {
      color: #f1f5f9;
      background-color: rgba(255, 255, 255, 0.2);
    }

    .light-theme .theme-toggle-button {
      color: #334155;
      background-color: rgba(0, 0, 0, 0.05);
    }

    .theme-toggle-button:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }

    .dark-theme .theme-toggle-button:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  currentTheme: ThemeMode = 'dark';
  private themeSubscription: Subscription | null = null;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
} 