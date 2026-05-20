import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search/search').then(m => m.SearchComponent)
  },

  {
    path: 'post',
    loadComponent: () =>
      import('./pages/post/post').then(m => m.PostComponent)
  },

  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile').then(m => m.ProfileComponent)
  },
];