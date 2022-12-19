import { Component } from '@angular/core';
import { Auth, getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, getFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page  {
  userData : any[]
  
  constructor(
    private loadingController : LoadingController,
    private alertController : AlertController,
    private authService : AuthService,
    private router : Router
  ) { this.donne();}
  
  async donne(){
    const emailUser =sessionStorage.getItem('Auth email:')
    console.log(emailUser);
    const db = getFirestore();
    const equipment = collection(db, emailUser);
    const snapshot = await getDocs(equipment);
    const result = snapshot.docs.map(doc => doc.data());
    console.log(result)
    return this.userData = result;

  }

  

  async deconnexion(){
    try{
      const loading = await this.loadingController.create();
      await loading.present();
  
      const user = await this.authService.logout();
      await loading.dismiss();
     this.router.navigateByUrl('/login',{replaceUrl : true });
    }catch (e){
      this.showAlert('Echec de deconnexion', 'S\'il vous plait réessayer encore!');;
    }
  }
  async showAlert (header , message)  {
    const alert = await this.alertController.create({
      header,
      message,
      buttons:['OK']
    });
    await alert.present();
   }
}
