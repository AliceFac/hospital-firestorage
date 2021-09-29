import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListEnderecoPage } from './list-endereco';

@NgModule({
  declarations: [
    ListEnderecoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListEnderecoPage),
  ],
})
export class ListEnderecoPageModule {}
