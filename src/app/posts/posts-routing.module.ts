import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { PostTdFormComponent } from './components/post-forms/post-td-form/post-td-form.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { PostReactiveFormComponent } from './components/post-forms/post-reactive-form/post-reactive-form.component';

const routes: Route[] = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'ancient-wonders',
        component: TableListComponent
      },
      {
        path: 'ancient-wonders/create',
        component: PostTdFormComponent
      },
      {
        path: 'ancient-wonders/edit/:id',
        component: PostTdFormComponent
      },
      {
        path: 'new-wonders',
        component: CardListComponent
      },
      {
        path: 'new-wonders/create',
        component: PostReactiveFormComponent
      },
      {
        path: 'new-wonders/edit/:id',
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
