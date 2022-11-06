import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { CardItemComponent } from './components/card-item/card-item.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardListViewComponent } from './components/card-list-view/card-list-view.component';
import { MainComponent } from './components/main/main.component';
import { PostReactiveFormComponent } from './components/post-forms/post-reactive-form/post-reactive-form.component';
import { PostTdFormComponent } from './components/post-forms/post-td-form/post-td-form.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { TableViewComponent } from './components/table-view/table-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    PostsRoutingModule
  ],
  declarations: [
    CardItemComponent,
    CardListComponent,
    CardListViewComponent,
    TableListComponent,
    TableViewComponent,
    PostReactiveFormComponent,
    PostTdFormComponent,
    MainComponent
  ]
})
export class PostsModule {
}
