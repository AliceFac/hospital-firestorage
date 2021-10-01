import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';


import {Storage} from "@ionic/storage";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
      public statusBar: StatusBar, 
      public splashScreen: SplashScreen,
      public storage: Storage
      ) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Pacientes', component: 'PacientesListPage' },
      { title: 'Clínicas', component: 'ClinicasListPage' },
      { title: 'Médicos', component: 'MedicosListPage' },
      { title: 'Configurações', component: 'ConfiguracoesPage' },
      { title: 'Usuários', component: 'ListPage' },
      { title: 'Endereços', component: 'ListEnderecoPage' },
      { title: 'Sobre', component: 'SobrePage' },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      this.storage.get('usuario').then(_usuario => {
        console.log('AP COMPONENT', _usuario);

        if(_usuario && _usuario.length > 0) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = 'LoginPage';
        }

      })
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    this.storage.remove('usuario').then(_data => {
      this.nav.setRoot('LoginPage');
    });
  }
}
