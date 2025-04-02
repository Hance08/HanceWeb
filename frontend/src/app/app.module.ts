import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { AnimatedBackgroundComponent } from './components/animated-background/animated-background.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AnimatedBackgroundComponent,
    ThemeToggleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
