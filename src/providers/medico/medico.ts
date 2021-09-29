import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class MedicoProvider {
  
  ENTIDADE = '/medicos';

  constructor(public http: HttpClient, 
    public afd: AngularFireDatabase,
    public afs: AngularFirestore) {
  }

  listar() {

    return this.afd.list(this.ENTIDADE)
      .snapshotChanges()
      .map(item => item.map(changes => ({key: changes.payload.key, value: changes.payload.val() })));
  }

  listarFS() { // firestore_db
    return this.afs.collection(this.ENTIDADE)
      .snapshotChanges()
      .map(item => item.map(changes => ({key: changes.payload.doc.id, value: changes.payload.doc.data() })))
  }

  inserir(aluno) {
    return this.afd.list(this.ENTIDADE).push(aluno);
  }

  inserirFS(entidade) { // firestore_db
    const obj = JSON.parse(JSON.stringify(entidade));
    
    const id = this.afs.createId();
    return this.afs.doc(this.ENTIDADE + '/' + id).set(obj);
  }

  atualizar(id, aluno) {
    return this.afd.object(this.ENTIDADE + '/' + id).update(aluno);
  }

  atualizarFS(id, entidade) { // firestore_db
    return this.afs.doc(this.ENTIDADE + '/' + id).update(entidade);
  }

  remover(id) {
    return this.afd.object(this.ENTIDADE + '/' + id).remove();
  }

  removerFS(id) { // firestore_db
    return this.afs.doc(this.ENTIDADE + '/' + id).delete();
  }

}