import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NonAuthGuard } from './core/guards/non-auth.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Route[] = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canLoad: [NonAuthGuard]
  },
  {
    path: 'main',
    loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule),
    canLoad: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
