import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EsenciaPayService } from 'src/app/service/esencia-pay.service';
import Web3 from 'web3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  balance: string = '0';
  account: string = ''
  hiddenMonto: boolean = false;
  isFormVisible: boolean = false;
  isAlertSuccess: boolean = false;

  isVisibleFormDeposito: boolean = false;
  isVisibleFormTransferir: boolean = false;
  isVisibleFormRetirar: boolean = false;

  visibleFormDeposite(){
    this.isVisibleFormDeposito = true;
    this.isVisibleFormTransferir = false;
    this.isVisibleFormRetirar = false;
  }

  visibleFormTransferir(){
    this.isVisibleFormTransferir = true;
    this.isVisibleFormDeposito = false;
    this.isVisibleFormRetirar = false;
  }

  visibleFormRetirar(){
    this.isVisibleFormRetirar = true;
    this.isVisibleFormDeposito = false;
    this.isVisibleFormTransferir = false;
  }

  mostrarSaldo() {
    this.hiddenMonto = !this.hiddenMonto;
  }

  toggleForm(isForm: boolean) {
    this.isFormVisible = isForm;
  }

  closeForm() {
    this.isFormVisible = false;
  }
  transacciones: any[] = [
    {
      nombre: 'Jose Perez',
      fecha: '20/08/2024',
      monto: '-50.00',
    },
    {
      nombre: 'Desconocido',
      fecha: '01/02/2024',
      monto: '-10.00',
    },
    {
      nombre: 'Miguel Cuadros',
      fecha: '20/05/2024',
      monto: '-80.00',
    },
    {
      nombre: 'Pepe Huaman',
      fecha: '12/08/2023',
      monto: '+100.00',
    },
  ];

  constructor(private web3Service: EsenciaPayService) {}

  ngOnInit(): void {
    this.loadBalance();
  }

  async connectWallet() {
    await this.web3Service.connectWallet();
    this.loadBalance();
  }

  async loadBalance() {
    this.balance = await this.web3Service.getBalance();
  }

  async loadAccount() {
    const web3 = new Web3((window as any).ethereum);
    const accounts = await web3.eth.requestAccounts();
    this.account = accounts[0]; // Obtiene la primera cuenta conectada y la guarda
  }

  async deposit(amount: string) {
    await this.web3Service.deposit(amount);
    this.loadBalance();
  }

  async transfer(to: string, amount: string) {
    await this.web3Service.transfer(to, amount);
    this.loadBalance();
  }

  async withdraw(amount: string) {
    await this.web3Service.withdraw(amount);
    this.loadBalance();
  }

  //   transferForm: FormGroup;

  // Dirección y ABI de tu contrato inteligente
  //   private contractAddress = '0x0Bf2571D2C40bcb0F734593C8C7Bc85B32A826F4';
  //   private contractABI = [{
  // 		"inputs": [],
  // 		"stateMutability": "nonpayable",
  // 		"type": "constructor"
  // 	},
  // 	{
  // 		"anonymous": false,
  // 		"inputs": [
  // 			{
  // 				"indexed": true,
  // 				"internalType": "address",
  // 				"name": "from",
  // 				"type": "address"
  // 			},
  // 			{
  // 				"indexed": false,
  // 				"internalType": "uint256",
  // 				"name": "amount",
  // 				"type": "uint256"
  // 			}
  // 		],
  // 		"name": "Deposito",
  // 		"type": "event"
  // 	},
  // 	{
  // 		"anonymous": false,
  // 		"inputs": [
  // 			{
  // 				"indexed": true,
  // 				"internalType": "address",
  // 				"name": "to",
  // 				"type": "address"
  // 			},
  // 			{
  // 				"indexed": false,
  // 				"internalType": "uint256",
  // 				"name": "amount",
  // 				"type": "uint256"
  // 			}
  // 		],
  // 		"name": "Retiro",
  // 		"type": "event"
  // 	},
  // 	{
  // 		"anonymous": false,
  // 		"inputs": [
  // 			{
  // 				"indexed": true,
  // 				"internalType": "address",
  // 				"name": "from",
  // 				"type": "address"
  // 			},
  // 			{
  // 				"indexed": true,
  // 				"internalType": "address",
  // 				"name": "to",
  // 				"type": "address"
  // 			},
  // 			{
  // 				"indexed": false,
  // 				"internalType": "uint256",
  // 				"name": "amount",
  // 				"type": "uint256"
  // 			}
  // 		],
  // 		"name": "Transferencia",
  // 		"type": "event"
  // 	},
  // 	{
  // 		"inputs": [
  // 			{
  // 				"internalType": "uint256",
  // 				"name": "newLimit",
  // 				"type": "uint256"
  // 			}
  // 		],
  // 		"name": "ajustarLimiteDiario",
  // 		"outputs": [],
  // 		"stateMutability": "nonpayable",
  // 		"type": "function"
  // 	},
  // 	{
  // 		"inputs": [],
  // 		"name": "consultarSaldo",
  // 		"outputs": [
  // 			{
  // 				"internalType": "uint256",
  // 				"name": "",
  // 				"type": "uint256"
  // 			}
  // 		],
  // 		"stateMutability": "view",
  // 		"type": "function"
  // 	},
  // 	{
  // 		"inputs": [],
  // 		"name": "dailyWithdrawalLimit",
  // 		"outputs": [
  // 			{
  // 				"internalType": "uint256",
  // 				"name": "",
  // 				"type": "uint256"
  // 			}
  // 		],
  // 		"stateMutability": "view",
  // 		"type": "function"
  // 	},
  // 	{
  // 		"inputs": [],
  // 		"name": "depositar",
  // 		"outputs": [],
  // 		"stateMutability": "payable",
  // 		"type": "function"
  // 	},
  // 	{
  // 		"inputs": [],
  // 		"name": "owner",
  // 		"outputs": [
  // 			{
  // 				"internalType": "address",
  // 				"name": "",
  // 				"type": "address"
  // 			}
  // 		],
  // 		"stateMutability": "view",
  // 		"type": "function"
  // 	},
  // 	{
  // 		"inputs": [
  // 			{
  // 				"internalType": "uint256",
  // 				"name": "amount",
  // 				"type": "uint256"
  // 			}
  // 		],
  // 		"name": "retirar",
  // 		"outputs": [],
  // 		"stateMutability": "nonpayable",
  // 		"type": "function"
  // 	},
  // 	{
  // 		"inputs": [
  // 			{
  // 				"internalType": "address",
  // 				"name": "recipient",
  // 				"type": "address"
  // 			},
  // 			{
  // 				"internalType": "uint256",
  // 				"name": "amount",
  // 				"type": "uint256"
  // 			}
  // 		],
  // 		"name": "transferir",
  // 		"outputs": [],
  // 		"stateMutability": "nonpayable",
  // 		"type": "function"
  // 	}];
  //   private web3!: Web3;
  //   private contract: any; // Cambia esto por el tipo correcto si lo deseas

  //
  //

  //   constructor(private fb: FormBuilder){
  //     this.transferForm = this.fb.group({
  //       destino: ['', Validators.required],
  //       monto: ['', [Validators.required, Validators.min(1)]],
  //       descripcion: ['']
  //     })
  //   }

  //   ngOnInit(): void {
  //      // Inicializa Web3 y la conexión con MetaMask
  //   if (typeof window.ethereum !== 'undefined') {
  //     this.web3 = new Web3(window.ethereum);
  //     this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);

  //     // Solicitar acceso a las cuentas
  //     window.ethereum.request({ method: 'eth_requestAccounts' })
  //       .then((accounts: string[]) => {
  //         console.log('Cuentas disponibles:', accounts);
  //       })
  //       .catch((error: any) => {  // Especificar el tipo aquí
  //         console.error('Error al obtener cuentas:', error);
  //       });
  //   } else {
  //     console.error('MetaMask no está instalada');
  //   }
  //   }

  //   async save() {
  //     const destino = this.transferForm.get('destino')?.value;
  //   const monto = this.transferForm.get('monto')?.value;

  //   if (this.contract && destino && monto) {
  //     try {
  //       const accounts = await this.web3.eth.getAccounts();
  //       const response = await this.contract.methods.transferir(destino, this.web3.utils.toWei(monto, 'ether')).send({ from: accounts[0] });
  //       console.log('Transacción exitosa:', response);
  //     } catch (error) {
  //       console.error('Error en la transacción:', error);
  //     }
  //   } else {
  //     console.error('Contrato o datos no válidos.');
  //   }
  //   }
}
