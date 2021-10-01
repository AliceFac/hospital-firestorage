import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Clinica } from '../../models/clinica';
import { PacienteProvider } from '../../providers/paciente/paciente';
import { ClinicaProvider } from '../../providers/clinica/clinica';

@IonicPage()
@Component({
  selector: 'clinicas-form',
  templateUrl: 'clinicas-form.html',
})
export class ClinicasFormPage {

  titulo = '';

  clinicaID = undefined;
  clinica = new Clinica();

  clinicas = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public clinicaProvider: ClinicaProvider,
    public pacienteProvider: PacienteProvider,
    ) {

      const clinicaID = this.navParams.get('itemID');
      const clinica = this.navParams.get('item');

      console.log(clinicaID)
      console.log(clinica)

      if(clinicaID) { 
        this.clinicaID = clinicaID;
        this.clinica = clinica;

        this.titulo = 'Atualizar';

      } else {
        this.clinicaID = undefined;
        this.clinica = new Clinica();

        this.titulo = 'Inserir';
      }


      this.pacienteProvider.listarFS().subscribe(_data => {
        console.log(_data);
        this.clinicas = _data;
      })
  }

  ionViewDidLoad() {
    
  }

  salvar() {
    console.log(this.clinica);

    this.clinica.lat = parseFloat(this.clinica.lat + '');
    this.clinica.lng = parseFloat(this.clinica.lng + '');

    if(this.clinicaID) { 

      this.clinicaProvider.atualizarFS(this.clinicaID, this.clinica).then(_ => {
        this.presentToast('clinica atualizado com sucesso!');
      })

    } else { 

      this.clinicaProvider.inserirFS(this.clinica).then(_ => {
        this.presentToast('clinica inserido com sucesso!');
        this.navCtrl.pop();
      });
    }
  }

  excluir() {

    const confirm = this.alertCtrl.create({
      title: 'Excluir?',
      message: 'Tem certeza que deseja excluir esta clinica?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            
            this.clinicaProvider.removerFS(this.clinicaID)
              .then(_ => {
                this.presentToast('clinica removida com sucesso!');
                this.navCtrl.pop()
              })
              .catch(error => {
                console.log('error', error);
              })

          }
        }
      ]
    });
    confirm.present();
  }

  presentToast(mensagem) {
    const toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'position',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

}