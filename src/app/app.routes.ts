import { Routes } from '@angular/router';
import { FeedComponent } from './pages/feed/feed';
import { AuthGuard } from './guard/authGuard';

export const routes: Routes = [
  { path: '', redirectTo: 'feed', pathMatch: 'full' },

  { path: 'feed', component: FeedComponent },

  { path: 'search', loadComponent: () => import('./pages/search/search').then(m => m.SearchComponent) },

  {
  path: 'post',
  loadComponent: () =>
    import('./pages/post/post').then(m => m.PostComponent),
  canActivate: [AuthGuard]
},

  {
  path: 'profile',
  loadComponent: () =>
    import('./pages/profile/profile').then(m => m.ProfileComponent),
  canActivate: [AuthGuard]
},

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent)
  },
  
  { path: 'register',
     loadComponent: () => import('./pages/register/register').then(m => m.RegisterComponent) },
];