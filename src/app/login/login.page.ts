import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  credentials : FormGroup;

  constructor(
    private fb:FormBuilder,
    private loadingController :  LoadingController,
    private alertController : AlertController,
    private authService : AuthService,
    private router : Router
  ) { }

  get email(){
    return this.credentials.get('email');
  }
  get password(){
    return this.credentials.get('password');
  }
  ngOnInit() {
    this.credentials = this.fb.group({
      email : ['',[Validators.required, Validators.email]],
      password : ['',[Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();
    if(user){
      this.router.navigateByUrl('/dashboard',{replaceUrl : true});
    }else{
      this.showAlert('Echec de la connexion', 'S\'il vous plait réessayer encore!');
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
