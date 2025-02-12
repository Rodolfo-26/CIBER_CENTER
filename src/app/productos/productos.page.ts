import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-productos',
  templateUrl: 'productos.page.html',
  styleUrls: ['productos.page.scss'],
  standalone: false
})
export class ProductosPage {
  categories = ['utiles_escolares', 'papeleria_1', 'oficina_1', 'arte_1'];
  products = [
    { name: 'Lápiz', category: 'utiles_escolares', image: 'assets/img/lapiz.webp', description: 'Lápiz de grafito HB de alta calidad.', price: 5 },
    { name: 'Cuaderno', category: 'utiles_escolares', image: 'assets/img/cuaderno.webp', description: 'Cuaderno de 100 hojas, rayado.', price: 20 },
    { name: 'Papel Bond', category: 'papeleria_1', image: 'assets/img/bond.webp', description: 'Resma de papel bond tamaño carta.', price: 50 },
    { name: 'Tijeras', category: 'papeleria_1', image: 'assets/img/tijeras.webp', description: 'Tijeras de acero inoxidable para oficina.', price: 30 },
    { name: 'Grapadora', category: 'oficina_1', image: 'assets/img/Engrapadora.webp', description: 'Grapadora resistente con capacidad para 100 grapas.', price: 40 },
    { name: 'Resaltador', category: 'oficina_1', image: 'assets/img/Resaltador.webp', description: 'Set de resaltadores de colores vibrantes.', price: 15 },
    { name: 'Pinceles', category: 'arte_1', image: 'assets/img/pinceles.webp', description: 'Juego de pinceles para acuarelas y óleo.', price: 80 },
    { name: 'Acuarelas', category: 'arte_1', image: 'assets/img/acuarelas.webp', description: 'Set de acuarelas de 24 colores vibrantes.', price: 120 }
  ];
  selectedCategory = '';

  constructor(private navCtrl: NavController, private modalCtrl: ModalController) {}

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  get filteredProducts() {
    return this.products.filter(p => p.category === this.selectedCategory);
  }

  goBack() {
    this.navCtrl.back();
  }

  async goToCart() {
    const modal = await this.modalCtrl.create({
      component: CartComponent
    });
    return await modal.present();
  }

  addToCart(product: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
    });
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
