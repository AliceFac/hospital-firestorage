import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CepProvider } from '../../providers/cep/cep';
import { ClinicaProvider } from '../../providers/clinica/clinica';
import { UserProvider } from '../../providers/user/user';


declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef; 
  map; 

  constructor(
      public navCtrl: NavController,
      public userProvider: UserProvider,
      public clinicaProvider: ClinicaProvider
    ) {

  }

  ionViewDidLoad() {
    this.map = this.createMap(this.mapElement);

    this.clinicaProvider.listarFS().subscribe(_data => {
      console.log('clinicas', _data);

      for (let i = 0; i < _data.length; i++) {
        const element = _data[i];

        let _lat = element.value.lat;
        let _lng = element.value.lng;
        let _nome = element.value.nome;

        let itemMarker = {
          lat: _lat,
          lng: _lng,
          nome: _nome,
          abrev: _nome[0]
        }
        
        this.carregaDadosMapa(itemMarker);
      }
    })
  }

  carregaDadosMapa(itemMarker) {

    const marker = this.addMarker(itemMarker.lat, itemMarker.lng, itemMarker.nome, itemMarker.abrev);

    const infowindow = this.addInfoWindow(itemMarker.nome);

    marker.addListener("click", () => { 
      
      infowindow.open({
        anchor: marker,
        map: this.map,
      });
    });

    marker.setMap(this.map); 
  }

  createMap(mapElement) {
    if(mapElement !== null && mapElement.nativeElement !== null && google) {
      let options = {
        zoom: 7,
        center: {lat: -5.081357184675141, lng: -39.70482921223503}
      };

      return new google.maps.Map(mapElement.nativeElement, options);
    }

    return undefined;
  }

  addMarker(_lat, _lng, nome, abrev) {
    return new google.maps.Marker({
      position: {lat: _lat, lng: _lng},
      title: nome,
      icon: new google.maps.MarkerImage(
        'https://mt.google.com/vt/icon?psize=16&font=fonts/Roboto-Regular.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-b.png&ax=44&ay=48&scale=1&text=' + abrev
      )
    })
  }

  addInfoWindow(texto: string) {
    let contentHtml = `
      Local: ${texto}
    `;

    return new google.maps.InfoWindow({
      content: contentHtml
    })
  }

}