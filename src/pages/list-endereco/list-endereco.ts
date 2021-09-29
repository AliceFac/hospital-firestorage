import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-list-endereco',
  templateUrl: 'list-endereco.html',
})
export class ListEnderecoPage {
  
  enderecos = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public userProvider: UserProvider
    ) {

      this.userProvider.listarEnderecos().subscribe(_data => {
        console.log(_data);

        this.enderecos = _data;
      })
  }

}
