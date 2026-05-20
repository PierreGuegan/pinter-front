import { Routes } from '@angular/router';
import { FeedComponent } from './pages/feed/feed';

export const routes: Routes = [
  { path: '', redirectTo: 'feed', pathMatch: 'full' },

  { path: 'feed', component: FeedComponent },

  { path: 'search', loadComponent: () => import('./pages/search/search').then(m => m.SearchComponent) },

  { path: 'post', loadComponent: () => import('./pages/post/post').then(m => m.PostComponent) },

  { path: 'profile', loadComponent: () => import('./pages/profile/profile').then(m => m.ProfileComponent) },
];