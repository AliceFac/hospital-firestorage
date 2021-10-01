import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CepProvider } from '../../providers/cep/cep';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-endereco-form',
  templateUrl: 'endereco-form.html',
})
export class EnderecoFormPage {

  cep = '';

  constructor(
      public navCtrl: NavController,
      public cepProvider: CepProvider,
      public userProvider: UserProvider
    ) {

  }

  buscarCEP() {
    console.log(this.cep);

    this.cepProvider.obterEnderecoPeloCep(this.cep).subscribe(_endereco => {
      console.log(_endereco);

      this.userProvider.salvarCep(_endereco);
    });
  }

}
