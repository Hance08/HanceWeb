import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService, ThemeMode } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-animated-background',
  template: `
    <div class="animated-background" [ngClass]="currentTheme">
      <div class="gradient-sphere"></div>
      <div class="gradient-sphere"></div>
      <div class="gradient-sphere"></div>
    </div>
  `,
  styles: [`
    .animated-background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      z-index: -1;
      transition: background-color 0.5s ease;
    }

    .animated-background.dark {
      background: #0f172a;
    }

    .animated-background.light {
      background: #f0f9ff;
    }

    .gradient-sphere {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.5;
      animation: float 20s infinite ease-in-out;
      transition: background 0.5s ease;
    }

    .dark .gradient-sphere:nth-child(1) {
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(124,58,237,1) 0%, rgba(99,102,241,0) 70%);
      top: -100px;
      left: -100px;
      animation-delay: -5s;
    }

    .dark .gradient-sphere:nth-child(2) {
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(236,72,153,1) 0%, rgba(244,63,94,0) 70%);
      bottom: -150px;
      right: -100px;
      animation-delay: -10s;
    }

    .dark .gradient-sphere:nth-child(3) {
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(34,211,238,1) 0%, rgba(56,189,248,0) 70%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation-delay: -15s;
    }

    .light .gradient-sphere:nth-child(1) {
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(79,70,229,0.3) 0%, rgba(99,102,241,0) 70%);
      top: -100px;
      left: -100px;
      animation-delay: -5s;
    }

    .light .gradient-sphere:nth-child(2) {
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(219,39,119,0.3) 0%, rgba(244,63,94,0) 70%);
      bottom: -150px;
      right: -100px;
      animation-delay: -10s;
    }

    .light .gradient-sphere:nth-child(3) {
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(56,189,248,0) 70%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation-delay: -15s;
    }

    @keyframes float {
      0%, 100% {
        transform: translate(0, 0);
      }
      25% {
        transform: translate(100px, 100px);
      }
      50% {
        transform: translate(0, 200px);
      }
      75% {
        transform: translate(-100px, 100px);
      }
    }
  `]
})
export class AnimatedBackgroundComponent implements OnInit, OnDestroy {
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
} 