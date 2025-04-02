import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSource = new BehaviorSubject<ThemeMode>(this.getInitialTheme());
  currentTheme$ = this.themeSource.asObservable();

  constructor() {
    this.setTheme(this.getInitialTheme());
  }

  private getInitialTheme(): ThemeMode {
    // 先檢查用戶之前是否已設置過主題
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    if (savedTheme) {
      return savedTheme;
    }
    
    // 如果沒有，檢查系統偏好
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // 默認為淺色模式
    return 'light';
  }

  setTheme(theme: ThemeMode): void {
    localStorage.setItem('theme', theme);
    this.themeSource.next(theme);
    
    // 更新 body 的 class，用於全局 CSS 主題切換
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }

  toggleTheme(): void {
    const currentTheme = this.themeSource.value;
    const newTheme: ThemeMode = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
} 