import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {Storage} from "@ionic/storage";

@Injectable()
export class UserProvider {

  constructor(public http: HttpClient,
      public storage: Storage,
      public afd: AngularFireDatabase,
      public afa: AngularFireAuth
    ) {
    console.log('Hello UserProvider Provider');
  }

  byId(id: string) {
    return this.afd.object('/usuarios/' + id).valueChanges();
  }

  login(email, senha) {
    return this.afa.auth.signInWithEmailAndPassword(email, senha);
  }

  cadastro(usuario) {
    this.afa.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then(_usuarioAuth => {
        usuario.id = _usuarioAuth.uid;
        delete usuario.senha;

        this.salvarUsuario(usuario);
      }).catch(error => {
        console.log(error);
      })
      ;
  }

  recuperarSenha(email) {
    return this.afa.auth.sendPasswordResetEmail(email);
  }

  salvarUsuario(usuario) {
    this.afd.object('/usuarios/' + usuario.id).update(usuario);
  }

  listarUsuarios() {
    return this.afd.list('/usuarios').valueChanges();
  }

  listarEnderecos() {
    return this.afd.list('/endereco').valueChanges();
  }

  salvarCep(endereco) {
    this.afd.list('/endereco').push(endereco);
  }

  salvarLocal(id) {
    return this.storage.set('usuario', id);
  }

  lerLocal() {
    return this.storage.get('usuario');
  }

  removeLocal() {
    return this.storage.remove('usuario');
  }

}