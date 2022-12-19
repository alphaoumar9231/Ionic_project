import { Component, ViewChild } from '@angular/core';
import { firebaseApp$ } from '@angular/fire/app';
import { Database, getDatabase, onValue, ref } from '@angular/fire/database';
import { doc, getDocFromCache, getDocs, getFirestore, query } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { collection } from '@firebase/firestore';
import { AlertController, IonModal, LoadingController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})

export class Tab1Page {
  credentials: FormGroup;
  ngOnInit() {
    this.credentials = this.fb.group({
      categorie: ['', [Validators.required]],
      nom: ['', [Validators.required, Validators.minLength(3)]],
      quantite: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', [Validators.required]],
    });
  }

  mydata: any[];
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    public baseDonne: Database
  ) { this.afficheFST() }

  //=== la recuperation des du formulaire de modal
  get categorie() {
    return this.credentials.get('categorie');
  }
  get nom() {
    return this.credentials.get('nom');
  }
  get quantite() {
    return this.credentials.get('quantite');
  }
  get date() {
    return this.credentials.get('date');
  }

  db = getDatabase();
  reef = ref(this.db, 'produit');

  //======la fonction d'affichage des données 
  async afficheFST() {
    const db = getFirestore();
    const equipment = collection(db, 'produit');
    const snapshot = await getDocs(equipment);
    const result = snapshot.docs.map(doc => doc.data());
    const b = snapshot.docs.map(doc => {
      console.log(doc.id)
    });
    return this.mydata = result;
  }

  //===========La fonction de suppression
  async delete() {
    // le code
  }

  // ======== La fonction de modification
  async update() {
    // le code 
  }

  //==== la partie modal 
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;
  @ViewChild(IonModal) modal: IonModal;
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  // ========la fonction d'alerte
  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
