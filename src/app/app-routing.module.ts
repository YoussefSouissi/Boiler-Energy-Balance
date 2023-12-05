import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroSectionComponent } from './HomePage/intro-section/intro-section.component';
import { BilanComponent } from './bilan/bilan.component';
import { StepsSectionComponent } from './HomePage/steps-section/steps-section.component';
import { HomepageComponent } from './HomePage/homepage.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path :'intro', component : IntroSectionComponent
  },
  {
    path :'bilan', component : BilanComponent
  },
  {
    path :'steps', component : StepsSectionComponent
  },
  
  {
    path :'home', component : HomepageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
