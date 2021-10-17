import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CepProvider } from '../providers/cep/cep';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireStorageModule } from "angularfire2/storage";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { UserProvider } from '../providers/user/user';
import { IonicStorageModule } from '@ionic/storage';
import { PacienteProvider } from '../providers/paciente/paciente';
import { MedicoProvider } from '../providers/medico/medico';
import { ClinicaProvider } from '../providers/clinica/clinica';
import { FirebaseStorageProvider } from '../providers/firebase-storage/firebase-storage';
import { ExportProvider } from '../providers/export/export';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';


const firebaseConfig = {
  apiKey: "AIzaSyD9g76l7qDN6wrlII1WSDsCKOHbDNOfg9o",
  authDomain: "escolaapp-db539.firebaseapp.com",
  projectId: "escolaapp-db539",
  storageBucket: "escolaapp-db539.appspot.com",
  messagingSenderId: "491747681477",
  appId: "1:491747681477:web:9a0f8321daba79f775bcac",
  measurementId: "G-R7DNQHJSXZ",
  databaseURL: "https://escolaapp-db539-default-rtdb.firebaseio.com/"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
     IonicStorageModule.forRoot(),
    HttpClientModule,

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CepProvider,
    UserProvider,
    PacienteProvider,
    MedicoProvider,
    ClinicaProvider,
    FirebaseStorageProvider,
    ExportProvider,
    Geolocation,
    Camera
  ]
})
export class AppModule {}
