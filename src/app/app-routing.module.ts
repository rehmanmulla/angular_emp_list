import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { PreviewComponent } from './preview/preview.component';

const routes: Routes = [
  {
    path: '', component:DashboardComponent
  },
  {
    path: 'register', component:RegisterFormComponent
  },
  {
    path: 'dashboard', component:DashboardComponent
  },
  {
    path: 'preview', component:PreviewComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
