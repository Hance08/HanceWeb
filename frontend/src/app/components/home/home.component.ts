import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService, ThemeMode } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
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
