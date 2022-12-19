import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page  {
  credentials : FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingController : LoadingController,
    private alertController : AlertController,
    private authService : AuthService,
    private router : Router
  ) { }
  
  get categorie(){
    return this.credentials.get('categorie');
  }

  get nom(){
    return this.credentials.get('nom');
  }

  get quantite(){
    return this.credentials.get('quantite');
  }

  get date(){
    return this.credentials.get('date');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      categorie : ['', [Validators.required]],
      nom : ['', [Validators.required, Validators.minLength(3)]],
      quantite : ['', [Validators.required, Validators.minLength(3)]],
      date : ['', [Validators.required]], 
    });
  }

  async addPrd(){
    try{
      const loading = await this.loadingController.create();
      await loading.present();
      const user = await this.authService.addPrd(this.credentials.value)
      await loading.dismiss();
      if(user){
        location.reload();
        this.router.navigateByUrl('/dashboard/tab1',{replaceUrl : true });
      }else{
        this.showAlert('Echec de l\'ajout du produit', 'S\'il vous plait réessayer encore!');
      }
     
    }catch (e){
      this.showAlert('Echec de l\'inscription', 'S\'il vous plait réessayer encore!');;
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
