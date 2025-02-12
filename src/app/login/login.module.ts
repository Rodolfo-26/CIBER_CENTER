import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';  // Necesario para ngModel
import { LoginComponent } from './login.component';  // Importa el componente de login
import { LoginRoutingModule } from './login-routing.module';  // Asegúrate de importar el archivo de rutas

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    LoginRoutingModule  // Asegúrate de incluir el módulo de enrutamiento
  ]
})
export class LoginPageModule {}
