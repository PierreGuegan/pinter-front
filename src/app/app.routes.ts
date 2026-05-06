import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { FeedComponent } from './pages/feed/feed';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'feed', component: FeedComponent }
];