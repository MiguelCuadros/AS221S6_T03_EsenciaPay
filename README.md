# Documentación de Contrato Solidity: `EsenciaPay`

## 1. Introducción

El contrato **EsenciaPay** es una billetera digital basada en Ethereum desarrollada para gestionar transacciones en una CBDC (Central Bank Digital Currency) con la red Ethereum Holesky. Este contrato ha sido diseñado para permitir a los usuarios realizar depósitos, retiros, transferencias y consultar el saldo disponible. Además, incorpora funcionalidades adicionales como un límite de retiro diario y permisos restringidos para ciertas operaciones.

---

## 2. Características Principales

El contrato **EsenciaPay** es una solución intuitiva y segura para la gestión de activos digitales, que incluye las siguientes características:

### 2.1. Depósitos de Fondos
Los usuarios pueden depositar Ether en su cuenta de la billetera utilizando la función `depositar()`. Una vez que se realiza el depósito, se registra el monto en su saldo personal y se emite un evento `Deposito` para notificar la transacción.

### 2.2. Retiros con Límite Diario
La función `retirar()` permite a los usuarios retirar Ether de su saldo, pero con ciertas restricciones:
- **Límite Diario**: Los retiros están limitados a un máximo de 1 Ether (por defecto) en un período de 24 horas.
- **Intervalo de Tiempo**: Un usuario solo puede retirar fondos una vez al día.

Estas restricciones se pueden modificar utilizando la función `ajustarLimiteDiario()` para ajustar el límite, siempre y cuando se tenga permiso de propietario.

### 2.3. Transferencias entre Usuarios
El contrato facilita la transferencia de fondos entre cuentas utilizando la función `transferir()`, la cual asegura que el remitente tenga fondos suficientes y que la dirección del receptor sea válida.

### 2.4. Consultas de Saldo
Los usuarios pueden verificar su saldo disponible con la función `consultarSaldo()` en cualquier momento.

### 2.5. Control de Propietario
Ciertas operaciones críticas, como ajustar el límite de retiro diario, solo pueden ser realizadas por el propietario del contrato, quien es designado al momento de despliegue. El modificador `soloPropietario` garantiza que únicamente el propietario pueda ejecutar estas funciones.

---

## 3. Funcionalidades Detalladas

| **Función**                          | **Descripción**                                                                                                                                                               | **Restricción**                  |
|--------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------|
| `depositar()`                        | Permite a los usuarios depositar Ether en su cuenta. Se emite el evento `Deposito` tras un depósito exitoso.                                                                 | Ninguna                         |
| `retirar(uint256 amount)`            | Permite retirar Ether con un límite diario. El evento `Retiro` se emite tras un retiro exitoso.                                                                               | Límite diario de 1 Ether. Solo un retiro cada 24 horas. |
| `transferir(address recipient, uint256 amount)` | Transfiere Ether a otra cuenta siempre y cuando el remitente tenga saldo suficiente y la dirección del destinatario sea válida.                                               | Saldo insuficiente. Dirección inválida. |
| `consultarSaldo()`                   | Consulta el saldo actual del usuario que llama a la función.                                                                                                                 | Ninguna                         |
| `ajustarLimiteDiario(uint256 newLimit)` | Permite al propietario ajustar el límite de retiro diario para todos los usuarios de la billetera.                                                                            | Solo el propietario             |

---

## 4. Eventos

Los eventos se utilizan para registrar las actividades más relevantes del contrato y facilitar la auditoría de transacciones:

- **`Deposito`**: Emite la dirección y el monto cuando se realiza un depósito exitoso.
- **`Retiro`**: Emite la dirección del receptor y el monto retirado.
- **`Transferencia`**: Emite las direcciones de los participantes y el monto transferido en una transacción entre usuarios.

---

## 5. Roles y Permisos

### Propietario
El propietario es la cuenta que despliega el contrato. Tiene acceso a las siguientes funcionalidades restringidas:
- Ajustar el límite diario de retiro (`ajustarLimiteDiario`).

### Usuarios
Los usuarios pueden:
- Depositar, retirar y transferir fondos.
- Consultar su saldo.

---

## 6. Consideraciones de Seguridad

- **Validación de Retiro Diario**: Se asegura que un usuario no retire más de una vez al día.
- **Verificación de Propietario**: El modificador `soloPropietario` previene cambios no autorizados en el límite de retiro diario.
- **Verificación de Direcciones**: Antes de realizar transferencias, se verifica que las direcciones sean válidas para evitar errores.

---

## 7. Desarrolladores

- **Nombre**: Miguel Cuadros
- **Contacto**: miguel.cuadros@vallegrande.edu.pe
- 
- **Nombre**: Roberto Sanchez
- **Contacto**: roberto.sanchez@vallegrande.edu.pe
