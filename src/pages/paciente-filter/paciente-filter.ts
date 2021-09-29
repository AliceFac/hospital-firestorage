import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-paciente-filter',
  templateUrl: 'paciente-filter.html',
})
export class PacienteFilterPage {

  uf = '';
  cidade = '';

  ufArr = [
    'CE',
    'PE',
  ]

  cidadeArr = [
    'Fortaleza',
    'Boa Viagem',
    'Aquiraz',
    'Eusébio',
    'Canindé',
    'Cascavel',
    'Recife'
  ];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PacienteFilterPage');
  }

  filtrar() {
    const params = { 
      uf: this.uf,
      cidade: this.cidade,
      isLimpar: false
    };
    this.viewCtrl.dismiss(params);
  }

  limpar() {
    const params = { 
      uf: this.uf,
      cidade: this.cidade,
      isLimpar: true
    };
    this.viewCtrl.dismiss(params);
  }

  fechar() {
    this.viewCtrl.dismiss();
  }

}
