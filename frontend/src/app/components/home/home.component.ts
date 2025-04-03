import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentTheme: string = 'dark';

  constructor() { }

  ngOnInit(): void {
    // 初始化組件
  }
}
