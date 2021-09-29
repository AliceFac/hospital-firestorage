import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Paciente } from '../../models/paciente';
import { PacienteProvider } from '../../providers/paciente/paciente';

@IonicPage()
@Component({
  selector: 'page-pacientes-form',
  templateUrl: 'pacientes-form.html',
})
export class PacientesFormPage {

  titulo = '';

  pacienteID = undefined;
  paciente = new Paciente();

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public pacienteProvider: PacienteProvider
    ) {

      const pacienteID = this.navParams.get('itemID');
      const paciente = this.navParams.get('item');

      console.log(pacienteID)
      console.log(paciente)

      if(pacienteID) { 
        this.pacienteID = pacienteID;
        this.paciente = paciente;

        this.titulo = 'Atualizar';

      } else {
        this.pacienteID = undefined;
        this.paciente = new Paciente();

        this.titulo = 'Inserir';
      }
  }

  ionViewDidLoad() {
    
  }

  salvar() {
    console.log(this.paciente);

    if(this.pacienteID) { 

      this.pacienteProvider.atualizarFS(this.pacienteID, this.paciente).then(_ => {
        this.presentToast('paciente atualizado com sucesso!');
      })

    } else { 

      this.pacienteProvider.inserirFS(this.paciente).then(_ => {
        this.presentToast('paciente inserido com sucesso!');
        this.navCtrl.pop();
      });
    }
  }

  excluir() {

    const confirm = this.alertCtrl.create({
      title: 'Excluir?',
      message: 'Tem certeza que deseja excluir este item?',
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
            
            this.pacienteProvider.removerFS(this.pacienteID)
              .then(_ => {
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