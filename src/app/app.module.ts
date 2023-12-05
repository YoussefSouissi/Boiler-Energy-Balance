import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroSectionComponent } from './HomePage/intro-section/intro-section.component';
import { StepsSectionComponent } from './HomePage/steps-section/steps-section.component';
import { BilanComponent } from './bilan/bilan.component';
import { FormsModule } from '@angular/forms';
import { HomepageComponent } from '../app/HomePage/homepage.component';
import { FooterSectionComponent } from './HomePage/footer-section/footer-section.component';


@NgModule({
  declarations: [
    AppComponent,
    IntroSectionComponent,
    StepsSectionComponent,
    BilanComponent,
    HomepageComponent,
    FooterSectionComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
