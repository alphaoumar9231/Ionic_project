import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.page.html',
  styleUrls: ['./registre.page.scss'],
})
export class RegistrePage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) { }
  get nom() {
    return this.credentials.get('nom');
  }

  get prenom() {
    return this.credentials.get('prenom');
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async registre() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.registre(this.credentials.value);
    await loading.dismiss();
    if (user) {
        const loading = await this.loadingController.create();
        await loading.present();

        const user = await this.authService.ajouter(this.credentials.value);
        await loading.dismiss();
        if (user) {
          this.router.navigateByUrl('/login', { replaceUrl: true });
        }
    } else {
      this.showAlert('Echec de l\'inscription', 'S\'il vous plait réessayer encore!');
    }
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
