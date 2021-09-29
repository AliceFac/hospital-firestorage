import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesUsuarioPage } from './detalhes-usuario';

@NgModule({
  declarations: [
    DetalhesUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesUsuarioPage),
  ],
})
export class DetalhesUsuarioPageModule {}
