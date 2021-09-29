import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';


@IonicPage()
@Component({
  selector: 'page-rec-senha',
  templateUrl: 'rec-senha.html',
})
export class RecSenhaPage {

 email = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecSenhaPage');
  }

    recuperar() {
    const loader = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    loader.present()

    this.userProvider.recuperarSenha(this.email);

    loader.dismiss()
    this.showAlert();
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Olá',
      subTitle: 'Mandamos um email para você, abra-o para recuperar sua senha.',
      buttons: ['OK']
    });
    alert.present();
  }

}
