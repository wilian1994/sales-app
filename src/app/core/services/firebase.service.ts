import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

  /* create_NewIcecream : Cria um novo registro na coleção especificada usando o método add */
  create(record) {
    return this.firestore.collection("products").add(record);
  }
  /*read_Icecream: Chama o método snapshotChanges , que obterá registros e também será registrado para receber atualizações */
  reads() {
    return this.firestore.collection("products").snapshotChanges();
  }
  /*update_Icecream : atualiza o registro pegando o ID e chamando o método de atualização */
  update(recordID, record) {
    this.firestore.doc("products/" + recordID).update(record);
  }
  /*delete_Icecream : chama o método de exclusão  ao registrar o ID*/
  delete(record_id) {
    this.firestore.doc("products/" + record_id).delete();
  }

  create_order(record) {
    return this.firestore.collection("finalized").add(record);
  }

  reads_orders() {
    return this.firestore.collection("orders").snapshotChanges();
  }
}
