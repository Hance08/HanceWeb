import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSource = new BehaviorSubject<ThemeMode>('dark');
  currentTheme$ = this.themeSource.asObservable();

  constructor() {
    this.setTheme('dark');
  }

  setTheme(theme: ThemeMode): void {
    localStorage.setItem('theme', theme);
    this.themeSource.next(theme);
    
    // 更新 body 的 class
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
  }
} 