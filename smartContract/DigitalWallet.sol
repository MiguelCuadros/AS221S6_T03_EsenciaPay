// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract EsenciaPay {
    
    mapping (address => uint256) private balances;

    event Transferencia(address indexed _to, address payable _from, uint256 _amount);
    event Deposito(address indexed _from, uint256 _amount);
    event Retiro(address indexed _to, uint _amount);

    function transferencia(address payable _to, uint256 _amount) public payable {

        _amount *= 1 ether;

        balances[msg.sender] -= _amount;
        
        _to.transfer(_amount);

        emit Transferencia(_to, payable(msg.sender), _amount);

    }

    function deposito() public payable {

        balances[msg.sender] += msg.value;

        emit Deposito(msg.sender, msg.value);

    }

    function retiro(uint256 _amount) public payable {

        _amount *= 1 ether;
        
        balances[msg.sender] -= _amount;

        payable(msg.sender).transfer(_amount);

        emit Retiro(msg.sender, _amount);

    }

    function consultarSaldo() public view returns (uint256) {
        return msg.sender.balance;
    }

    receive() external payable {
        deposito();
    }

    fallback() external payable { }

}
