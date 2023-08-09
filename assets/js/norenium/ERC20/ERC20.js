//Paste the contract address here.
//You really should to go to f**k yourself if you don't know where to copy the contract addres from.
const contractAddressERC20 = "0x3f6CF1c100210839EFB1B510B599C5AE4AFfFBD4";



//Paste the contract ABI here. 
//You can copy the ABI from remix compiler > Solidity Compiler tab > ( in the left side menu) ABI 
var ABIERC20 = [
      {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
      },
      {
            "anonymous": false,
            "inputs": [
                  {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                  },
                  {
                        "indexed": true,
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                  },
                  {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                  }
            ],
            "name": "Approval",
            "type": "event"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                  },
                  {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                  }
            ],
            "name": "approve",
            "outputs": [
                  {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                  }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "address[]",
                        "name": "tos",
                        "type": "address[]"
                  },
                  {
                        "internalType": "uint256[]",
                        "name": "amounts",
                        "type": "uint256[]"
                  }
            ],
            "name": "batchTransfer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                  }
            ],
            "name": "Buy",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                  },
                  {
                        "internalType": "uint256",
                        "name": "subtractedValue",
                        "type": "uint256"
                  }
            ],
            "name": "decreaseAllowance",
            "outputs": [
                  {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                  }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                  },
                  {
                        "internalType": "uint256",
                        "name": "addedValue",
                        "type": "uint256"
                  }
            ],
            "name": "increaseAllowance",
            "outputs": [
                  {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                  }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "anonymous": false,
            "inputs": [
                  {
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                  },
                  {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                  }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
      },
      {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256[]",
                        "name": "prices",
                        "type": "uint256[]"
                  }
            ],
            "name": "setFees",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                  },
                  {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                  }
            ],
            "name": "transfer",
            "outputs": [
                  {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                  }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "anonymous": false,
            "inputs": [
                  {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                  },
                  {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                  },
                  {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                  }
            ],
            "name": "Transfer",
            "type": "event"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                  },
                  {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                  },
                  {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                  }
            ],
            "name": "transferFrom",
            "outputs": [
                  {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                  }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                  }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                  },
                  {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                  }
            ],
            "name": "allowance",
            "outputs": [
                  {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                  }
            ],
            "name": "balanceOf",
            "outputs": [
                  {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                  {
                        "internalType": "uint8",
                        "name": "",
                        "type": "uint8"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "getFees",
            "outputs": [
                  {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "name",
            "outputs": [
                  {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "owner",
            "outputs": [
                  {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                  {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "totalSupply",
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
]