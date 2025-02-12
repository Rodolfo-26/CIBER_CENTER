import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Firebase Auth
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isRegistering: boolean = false;  // Controla el modo de registro o login
  isLoading: boolean = false;      // Estado de carga (spinner)

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  // Función de login
  async login() {
    if (!this.email || !this.password) {
      this.showErrorAlert('Por favor, ingrese ambos campos (email y contraseña).');
      return;
    }

    // Mostrar el spinner de carga
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
    });
    await loading.present();

    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      console.log('Logged in:', userCredential);
      this.router.navigate(['/inicio']); // Navegar a la página principal después del login
    } catch (error) {
      this.handleFirebaseError(error);
    } finally {
      // Ocultar el spinner al finalizar el proceso
      this.isLoading = false;
      loading.dismiss();
    }
  }

  // Función de registro
  async register() {
    if (!this.email || !this.password) {
      this.showErrorAlert('Por favor, ingrese ambos campos (email y contraseña).');
      return;
    }

    // Mostrar el spinner de carga
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Registrando...',
    });
    await loading.present();

    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );
      console.log('Registered:', userCredential);
      this.router.navigate(['/inicio']); // Navegar a la página principal después del registro
    } catch (error) {
      this.handleFirebaseError(error);
    } finally {
      // Ocultar el spinner al finalizar el proceso
      this.isLoading = false;
      loading.dismiss();
    }
  }

  // Manejando diferentes tipos de errores de Firebase
  handleFirebaseError(error: any) {
    let errorMessage = 'Ocurrió un error, intente nuevamente.';
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'Usuario no encontrado.';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Contraseña incorrecta.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'El email proporcionado no es válido.';
    }
    this.showErrorAlert(errorMessage);
  }

  // Mostrar alertas de error
  async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Cambiar entre los modos de login y registro
  toggleRegister() {
    this.isRegistering = !this.isRegistering; // Alterna entre registro e inicio de sesión
  }
}
