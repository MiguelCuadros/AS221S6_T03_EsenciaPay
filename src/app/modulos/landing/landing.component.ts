import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ethers } from 'ethers';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements AfterViewInit {
  constructor(private el: ElementRef) {
    gsap.registerPlugin(ScrollTrigger);
  }

  @ViewChild('walletImage') walletImage!: ElementRef;
  @ViewChild('descriptionText') descriptionText!: ElementRef;

  ngAfterViewInit() {

    const text = document.querySelectorAll("#animatedText span");

    // Animation for title
    gsap.from(text, {
      duration: 1,
      opacity: 0,
      y: 50,
      stagger: 0.1,
      ease: "power3.out",
    })

    // Animation for image
    gsap.fromTo(
      this.walletImage.nativeElement,
      { x: 500, opacity: 0 }, 
      {
        x: 0, 
        opacity: 1,
        duration: 1, 
        ease: 'power2.out', 
      }
    );

    // Animation for description
    gsap.fromTo(
      this.descriptionText.nativeElement,
      { x: -500, opacity: 0 }, 
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out', 
      }
    );

  }

  currentAccount: string | null = null;

  async connectToMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Si ya hay una cuenta conectada, solicita cambiar de cuenta
        if (this.currentAccount) {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          this.currentAccount = accounts[0]; // Actualiza la cuenta conectada
        } else {
          // Solicita la conexión a MetaMask
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          this.currentAccount = accounts[0]; // Guarda la cuenta conectada
        }
      } catch (error) {
        console.error('Error al conectar a MetaMask:', error);
      }
    } else {
      alert('MetaMask no está instalada. Por favor, instálala para continuar.');
    }
  }

  disconnectFromMetaMask() {
    // Limpia la cuenta almacenada
    this.currentAccount = null;
    console.log('Desconectado.');
  }


}
