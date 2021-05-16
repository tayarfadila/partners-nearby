import { HomeComponent } from 'src/app/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
const routes: Routes = [
  { path: '**', redirectTo: '**', pathMatch: 'full' },
// wildcard for 404 not found page
  { path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
