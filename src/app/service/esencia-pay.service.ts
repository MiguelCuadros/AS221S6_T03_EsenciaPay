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
  private contractAbi = [
    {
      "inputs": [],
      "name": "deposito",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "Deposito",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "retiro",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "Retiro",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "transferencia",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address payable",
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "Transferencia",
      "type": "event"
    },
    {
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    },
    {
      "inputs": [],
      "name": "consultarSaldo",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];  

  constructor() {
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

    this.contract = new this.web3.eth.Contract(this.contractAbi, this.contractAddress);
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
