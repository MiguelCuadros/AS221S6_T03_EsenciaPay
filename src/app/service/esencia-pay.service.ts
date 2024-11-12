import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class EsenciaPayService {

  private web3: any;
  private contract: any;
  private contractAddress = environment.addressContract;
  private contractAbi: any;

  constructor() {
    this.loadAbi();
  }
  
  private async loadAbi() {
    try {
      const response = await fetch('assets/abi/esencia-pay.json');
      this.contractAbi = await response.json();
      this.initWeb3();
    } catch (error) {
      console.error('Error al cargar el ABI del contrato:', error);
    }
  }
  
  private initWeb3() {
    if ((window as any).ethereum) {
      this.web3 = new Web3((window as any).ethereum);
      try {
        (window as any).ethereum.enable().then(() => {
          console.log('Billetera conectada');
        });
      } catch (error) {
        console.error('Usuario denegó la conexión');
      }
    } else if ((window as any).web3) {
      this.web3 = new Web3((window as any).web3.currentProvider);
    } else {
      console.warn('Navegador no tiene una billetera Ethereum instalada');
    }
  
    if (this.contractAbi) {
      this.contract = new this.web3.eth.Contract(this.contractAbi, this.contractAddress);
    }
  }

  // Conectar la billetera del usuario
  async connectWallet() {
    try {
      await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Billetera conectada');
    } catch (error) {
      console.error('Error al conectar la billetera', error);
    }
  }

  // Depositar ETH
  async deposit(amount: string) {
    const accounts = await this.web3.eth.getAccounts();
    const weiAmount = this.web3.utils.toWei(amount, 'ether');

    return this.contract.methods.deposito().send({
      from: accounts[0],
      value: weiAmount
    });
  }

  // Transferir ETH
  async transfer(to: string, amount: string) {
    const accounts = await this.web3.eth.getAccounts();
    //const weiAmount = this.web3.utils.toWei(amount, 'ether');

    return this.contract.methods.transferencia(to, amount).send({ //weiAmount
      from: accounts[0]
    });
  }

  // Retirar ETH
  async withdraw(amount: string) {
    const accounts = await this.web3.eth.getAccounts();
    //const weiAmount = this.web3.utils.toWei(amount, 'ether');

    return this.contract.methods.retiro(amount).send({ //weiAmount
      from: accounts[0]
    });
  }

  // Consultar saldo
  async getBalance() {
    const accounts = await this.web3.eth.getAccounts();
    const balance = await this.contract.methods.consultarSaldo().call({
      from: accounts[0]
    });
    return this.web3.utils.fromWei(balance, 'ether');
  }
  
}
