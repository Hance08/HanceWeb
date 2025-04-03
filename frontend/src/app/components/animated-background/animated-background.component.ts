import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animated-background',
  template: `
    <div class="animated-background">
      <div class="stars">
        <div class="star" *ngFor="let star of stars"></div>
      </div>
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
      background: #0f172a;
    }

    .stars {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    }

    .star {
      position: absolute;
      width: 2px;
      height: 2px;
      border-radius: 50%;
      animation: twinkle 3s infinite ease-in-out;
      background-color: #fff;
      opacity: 0;
    }

    @keyframes twinkle {
      0% {
        opacity: 0;
        transform: scale(0.8);
      }
      50% {
        opacity: 0.7;
        transform: scale(1.2);
      }
      100% {
        opacity: 0;
        transform: scale(0.8);
      }
    }
  `]
})
export class AnimatedBackgroundComponent implements OnInit {
  stars: {x: number, y: number, size: number, delay: number}[] = [];

  constructor() { }

  ngOnInit(): void {
    // 創建動畫星星
    this.generateStars();
  }

  generateStars(): void {
    // 創建150個星星
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * 100; // 隨機x位置（百分比）
      const y = Math.random() * 100; // 隨機y位置（百分比）
      const size = Math.random() * 2 + 1; // 隨機大小
      const delay = Math.random() * 3; // 隨機延遲
      this.stars.push({x, y, size, delay});
    }
    
    // 延遲應用樣式，以允許DOM更新
    setTimeout(() => {
      const starElements = document.querySelectorAll('.star');
      this.stars.forEach((star, index) => {
        if (starElements[index]) {
          const el = starElements[index] as HTMLElement;
          el.style.left = `${star.x}%`;
          el.style.top = `${star.y}%`;
          el.style.width = `${star.size}px`;
          el.style.height = `${star.size}px`;
          el.style.animationDelay = `${star.delay}s`;
        }
      });
    }, 0);
  }
} 