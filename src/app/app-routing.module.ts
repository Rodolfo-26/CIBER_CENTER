import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',  // Redirige a la página de login cuando se carga la aplicación
    pathMatch: 'full'
  },
  {
    path: 'login',  // Ruta para acceder al componente de login
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)  // Carga el módulo del login
  },
  {
    path: 'productos',
    loadChildren: () => import('./productos/productos.module').then(m => m.ProductosPageModule)
  },
  {
    path: 'inicio',  // Ruta para la página de inicio después de login
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule) // Ruta para la página principal
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
