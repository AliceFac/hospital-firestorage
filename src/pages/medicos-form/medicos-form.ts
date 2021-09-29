import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Medico } from '../../models/medico';
import { MedicoProvider } from '../../providers/medico/medico';

@IonicPage()
@Component({
  selector: 'page-medicos-form',
  templateUrl: 'medicos-form.html',
})
export class MedicosFormPage {

  titulo = '';

  medicoID = undefined;
  medico = new Medico();

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public medicoProvider: MedicoProvider
    ) {

      const medicoID = this.navParams.get('itemID');
      const medico = this.navParams.get('item');

      console.log(medicoID)
      console.log(medico)

      if(medicoID) { 
        this.medicoID = medicoID;
        this.medico = medico;

        this.titulo = 'Atualizar';

      } else {
        this.medicoID = undefined;
        this.medico = new Medico();

        this.titulo = 'Inserir';
      }
  }

  ionViewDidLoad() {
    
  }

  salvar() {
    console.log(this.medico);

    if(this.medicoID) { 

      this.medicoProvider.atualizarFS(this.medicoID, this.medico).then(_ => {
        this.presentToast('medico atualizado com sucesso!');
      })

    } else { 

      this.medicoProvider.inserirFS(this.medico).then(_ => {
        this.presentToast('medico inserido com sucesso!');
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
            
            this.medicoProvider.removerFS(this.medicoID)
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