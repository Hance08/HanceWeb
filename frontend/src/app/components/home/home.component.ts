import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentTheme: string = 'dark';
  activeSection: string = '';

  constructor() { }

  ngOnInit(): void {
    // 初始化組件
    // 監聽滾動事件以更新活躍的導航按鈕
    window.addEventListener('scroll', () => this.updateActiveButtonOnScroll());
  }

  // 滾動到指定區域
  scrollToSection(sectionId: string): void {
    this.activeSection = sectionId;
    
    // 更新按鈕激活狀態
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(button => {
      button.classList.remove('active');
      const btnElement = button as HTMLElement;
      if (btnElement.dataset['section'] === sectionId) {
        button.classList.add('active');
      }
    });
    
    // 滾動到目標區域
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // 根據滾動位置更新活躍按鈕
  private updateActiveButtonOnScroll(): void {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 200; // 加上一些偏移量，使按鈕提前激活
    
    sections.forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // 如果當前滾動位置在該區段內
        
        // 只在區段改變時才更新 UI
        if (this.activeSection !== sectionId && sectionId) {
          this.activeSection = sectionId;
          
          // 更新按鈕激活狀態
          const buttons = document.querySelectorAll('.nav-btn');
          buttons.forEach(button => {
            button.classList.remove('active');
            const btnElement = button as HTMLElement;
            if (btnElement.dataset['section'] === sectionId) {
              button.classList.add('active');
            }
          });
        }
      }
    });
  }
}
