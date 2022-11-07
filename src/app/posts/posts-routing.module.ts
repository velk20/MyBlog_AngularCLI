import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { PostTdFormComponent } from './components/post-forms/post-td-form/post-td-form.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { PostReactiveFormComponent } from './components/post-forms/post-reactive-form/post-reactive-form.component';
import {HomeComponent} from './components/home/home.component';

const routes: Route[] = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'my-posts',
        component: TableListComponent
      },
      {
        path: 'my-posts/create',
        component: PostTdFormComponent
      },
      {
        path: 'my-posts/edit/:id',
        component: PostTdFormComponent
      },
      {
        path: 'all-posts',
        component: CardListComponent
      },
      {
        path: 'all-posts/create',
        component: PostReactiveFormComponent
      },
      {
        path: 'all-posts/edit/:id',
        component: PostReactiveFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {
}
