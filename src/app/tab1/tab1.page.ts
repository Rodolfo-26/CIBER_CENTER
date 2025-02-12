import { Component, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone:false
})
export class Tab1Page implements AfterViewInit {
  private currentIndex = 0;
  private items!: NodeListOf<HTMLElement>;
  
  ngAfterViewInit() {
    this.items = document.querySelectorAll('.carousel-item');
    this.updateCarousel();
    
    document.querySelector('.prev-btn')?.addEventListener('click', () => this.prevSlide());
    document.querySelector('.next-btn')?.addEventListener('click', () => this.nextSlide());
  }

  constructor(private navCtrl: NavController) {}

  logout() {
    localStorage.removeItem('user'); 

    this.navCtrl.navigateRoot('/login');
  }
  private updateCarousel() {
    const container = document.querySelector('.carousel-container') as HTMLElement;
    container.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  }

  private prevSlide() {
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.items.length - 1;
    this.updateCarousel();
  }

  private nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.updateCarousel();
  }
}
