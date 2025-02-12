import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CartComponent implements OnInit {
  cart: any[] = [];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    const storedCart = localStorage.getItem('cart');
    this.cart = storedCart ? JSON.parse(storedCart) : [];
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  processPayment() {
    const doc = new jsPDF();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('CIBERCENTER', 70, 20);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 30);
    doc.text('----------------------------------------', 20, 35);

    let total = 0;

    const tableData = this.cart.map(product => {
      total += product.price;
      return [product.name, `$${product.price.toFixed(2)}`];
    });

    autoTable(doc, {
      startY: 40,
      head: [['Producto', 'Precio']],
      body: tableData,
      theme: 'striped',
      styles: { fontSize: 12, cellPadding: 3 },
      headStyles: { fillColor: [33, 150, 243], textColor: 255, fontSize: 13 },
      columnStyles: {
        1: { halign: 'right' }
      }
    });

    const finalY = (doc as any).lastAutoTable.finalY || 60;

    const impuestos = total * 0.16;
    const totalFinal = total + impuestos;

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Subtotal: $${total.toFixed(2)}`, 20, finalY + 10);
    doc.text(`IVA (16%): $${impuestos.toFixed(2)}`, 20, finalY + 20);
    doc.text(`Total: $${totalFinal.toFixed(2)}`, 20, finalY + 30);

    doc.save('ticket_compra.pdf');
  }
}
