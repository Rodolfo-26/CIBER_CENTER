import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
export class Tab1Page implements AfterViewInit, OnDestroy {
  private carousels: NodeListOf<HTMLElement> | null = null;
  private currentIndices: number[] = [];
  private autoSlideIntervals: any[] = [];
  private intervalTime = 3000; // Tiempo de cambio en milisegundos

  constructor(private navCtrl: NavController) {}

  ngAfterViewInit() {
    this.carousels = document.querySelectorAll('.carousel');

    if (this.carousels.length > 0) {
      this.carousels.forEach((_, index) => {
        this.currentIndices[index] = 0; // Inicializar cada carrusel en la primera imagen
        this.updateCarousel(index);
        this.startAutoSlide(index);
      });
    }
  }

  ngOnDestroy() {
    this.stopAllAutoSlides();
  }

  logout() {
    localStorage.removeItem('user');
    this.navCtrl.navigateRoot('/login');
  }

  private updateCarousel(carouselIndex: number) {
    if (!this.carousels) return;
    const container = this.carousels[carouselIndex].querySelector('.carousel-container') as HTMLElement;
    if (container) {
      container.style.transform = `translateX(-${this.currentIndices[carouselIndex] * 100}%)`;
    }
  }

  private nextSlide(carouselIndex: number) {
    if (!this.carousels) return;

    const items = this.carousels[carouselIndex].querySelectorAll('.carousel-item');
    if (!items || items.length === 0) return;

    if (this.currentIndices[carouselIndex] === 2) {
      this.currentIndices[carouselIndex] = 0; // Regresa a la primera imagen
    } else {
      this.currentIndices[carouselIndex]++;
    }

    this.updateCarousel(carouselIndex);
    this.restartAutoSlide(carouselIndex);
  }

  private startAutoSlide(carouselIndex: number) {
    this.stopAutoSlide(carouselIndex);
    this.autoSlideIntervals[carouselIndex] = setInterval(() => {
      this.nextSlide(carouselIndex);
    }, this.intervalTime);
  }

  private stopAutoSlide(carouselIndex: number) {
    if (this.autoSlideIntervals[carouselIndex] !== undefined) {
      clearInterval(this.autoSlideIntervals[carouselIndex]);
      this.autoSlideIntervals[carouselIndex] = undefined;
    }
  }

  private stopAllAutoSlides() {
    this.autoSlideIntervals.forEach(interval => {
      if (interval !== undefined) clearInterval(interval);
    });
  }

  private restartAutoSlide(carouselIndex: number) {
    this.stopAutoSlide(carouselIndex);
    setTimeout(() => {
      this.startAutoSlide(carouselIndex);
    }, this.intervalTime);
  }
}
