//Paste the contract address here.
//You really should to go to f**k yourself if you don't know where to copy the contract addres from.
const contractAddress = "0x51d7fdf2A714139C9F402E708482a2e60078B677";


//Sets how long a cookie would be available in the browser. 
const cookieExpirePeriod = 60; // Minutes

//Sets how long data can be old.If data be older than this, a warning will be shown.
const warningPeriod = 60; // Minutes

// First mainnet deployement address:
//0x51d7fdf2A714139C9F402E708482a2e60078B677

//Paste the contract ABI here. 
//You can copy the ABI from remix compiler > Solidity Compiler tab > ( in the left side menu) ABI 
var ABI = [
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
                        "name": "approved",
                        "type": "address"
                  },
                  {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                  }
            ],
            "name": "Approval",
            "type": "event"
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
                        "name": "operator",
                        "type": "address"
                  },
                  {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                  }
            ],
            "name": "ApprovalForAll",
            "type": "event"
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
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tokenId",
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
                        "name": "to",
                        "type": "address"
                  },
                  {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                  }
            ],
            "name": "approve",
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
            "name": "baseURI",
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
            "inputs": [
                  {
                        "internalType": "address[]",
                        "name": "to",
                        "type": "address[]"
                  },
                  {
                        "internalType": "uint256[]",
                        "name": "ids",
                        "type": "uint256[]"
                  }
            ],
            "name": "batchTransferFrom",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "sellTicket",
                        "type": "uint256"
                  }
            ],
            "name": "buyToken",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                  }
            ],
            "name": "cancelSell",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256[]",
                        "name": "ids",
                        "type": "uint256[]"
                  }
            ],
            "name": "checkFreezeStatus",
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
                        "internalType": "uint256[]",
                        "name": "ids",
                        "type": "uint256[]"
                  }
            ],
            "name": "checkSellStatus",
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
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "name": "easyFee",
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
                        "name": "to",
                        "type": "address"
                  },
                  {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                  }
            ],
            "name": "easyTransferFrom",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "ercTokenAddress",
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
            "name": "frInd",
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
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                  },
                  {
                        "internalType": "uint256",
                        "name": "daysCount",
                        "type": "uint256"
                  },
                  {
                        "internalType": "uint256",
                        "name": "planId",
                        "type": "uint256"
                  },
                  {
                        "internalType": "uint256",
                        "name": "externaId",
                        "type": "uint256"
                  }
            ],
            "name": "freeze",
            "outputs": [
                  {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "name": "freezePeriodLimits",
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
            "name": "getAllFreezeRecords",
            "outputs": [
                  {
                        "components": [
                              {
                                    "internalType": "uint256",
                                    "name": "RayId",
                                    "type": "uint256"
                              },
                              {
                                    "internalType": "uint256",
                                    "name": "TokenId",
                                    "type": "uint256"
                              },
                              {
                                    "internalType": "uint256",
                                    "name": "startTime",
                                    "type": "uint256"
                              },
                              {
                                    "internalType": "uint256",
                                    "name": "endTime",
                                    "type": "uint256"
                              },
                              {
                                    "internalType": "uint256",
                                    "name": "planId",
                                    "type": "uint256"
                              },
                              {
                                    "internalType": "uint256",
                                    "name": "ExternalId",
                                    "type": "uint256"
                              },
                              {
                                    "internalType": "address",
                                    "name": "owner",
                                    "type": "address"
                              },
                              {
                                    "internalType": "bool",
                                    "name": "isClaimed",
                                    "type": "bool"
                              }
                        ],
                        "internalType": "struct Decuple.TFI[]",
                        "name": "",
                        "type": "tuple[]"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "getAllMinted",
            "outputs": [
                  {
                        "internalType": "bool[]",
                        "name": "",
                        "type": "bool[]"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "getAllSellRecords",
            "outputs": [
                  {
                        "components": [
                              {
                                    "internalType": "uint256",
                                    "name": "SellId",
                                    "type": "uint256"
                              },
                              {
                                    "internalType": "uint256",
                                    "name": "TokenId",
                                    "type": "uint256"
                              },
                              {
                                    "internalType": "uint256",
                                    "name": "Price",
                                    "type": "uint256"
                              },
                              {
                                    "internalType": "uint256",
                                    "name": "endTime",
                                    "type": "uint256"
                              },
                              {
                                    "internalType": "address",
                                    "name": "Owner",
                                    "type": "address"
                              },
                              {
                                    "internalType": "bool",
                                    "name": "sold",
                                    "type": "bool"
                              },
                              {
                                    "internalType": "bool",
                                    "name": "canceled",
                                    "type": "bool"
                              }
                        ],
                        "internalType": "struct Decuple.SellRec[]",
                        "name": "",
                        "type": "tuple[]"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                  }
            ],
            "name": "getApproved",
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
            "name": "getBalance",
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
            "name": "getMintPrices",
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
            "name": "getSellAllowance",
            "outputs": [
                  {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "getSellLimits",
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
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "num",
                        "type": "uint256"
                  }
            ],
            "name": "getSellRecords",
            "outputs": [
                  {
                        "components": [
                              {
                                    "internalType": "uint256",
                                    "name": "SellId",
                                    "type": "uint256"
                              },
                              {
                                    "internalType": "uint256",
                                    "name": "TokenId",
                                    "type": "uint256"
                              },
                              {
                                    "internalType": "uint256",
                                    "name": "Price",
                                    "type": "uint256"
                              },
                              {
                                    "internalType": "uint256",
                                    "name": "endTime",
                                    "type": "uint256"
                              },
                              {
                                    "internalType": "address",
                                    "name": "Owner",
                                    "type": "address"
                              },
                              {
                                    "internalType": "bool",
                                    "name": "sold",
                                    "type": "bool"
                              },
                              {
                                    "internalType": "bool",
                                    "name": "canceled",
                                    "type": "bool"
                              }
                        ],
                        "internalType": "struct Decuple.SellRec[]",
                        "name": "",
                        "type": "tuple[]"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "getServiceFees",
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
            "name": "getTimeStamp",
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
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                  }
            ],
            "name": "getTokenTier",
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
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                  }
            ],
            "name": "getURI",
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
            "name": "geteasyFee",
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
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                  },
                  {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                  }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                  {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "name": "isForSell",
            "outputs": [
                  {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "name": "isFreeze",
            "outputs": [
                  {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "name": "isMinted",
            "outputs": [
                  {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                  },
                  {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                  },
                  {
                        "internalType": "uint256",
                        "name": "minutesCount",
                        "type": "uint256"
                  }
            ],
            "name": "listToSell",
            "outputs": [
                  {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "maxSupply",
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
                        "name": "to",
                        "type": "address"
                  },
                  {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                  }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "payable",
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
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                  }
            ],
            "name": "ownerOf",
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
            "name": "payBonus",
            "outputs": [
                  {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "name": "rayToInfo",
            "outputs": [
                  {
                        "internalType": "uint256",
                        "name": "RayId",
                        "type": "uint256"
                  },
                  {
                        "internalType": "uint256",
                        "name": "TokenId",
                        "type": "uint256"
                  },
                  {
                        "internalType": "uint256",
                        "name": "startTime",
                        "type": "uint256"
                  },
                  {
                        "internalType": "uint256",
                        "name": "endTime",
                        "type": "uint256"
                  },
                  {
                        "internalType": "uint256",
                        "name": "planId",
                        "type": "uint256"
                  },
                  {
                        "internalType": "uint256",
                        "name": "ExternalId",
                        "type": "uint256"
                  },
                  {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                  },
                  {
                        "internalType": "bool",
                        "name": "isClaimed",
                        "type": "bool"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
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
                        "name": "tokenId",
                        "type": "uint256"
                  }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
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
                        "name": "tokenId",
                        "type": "uint256"
                  },
                  {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                  }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "name": "sellPeriod",
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
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "name": "sellRayToSellRec",
            "outputs": [
                  {
                        "internalType": "uint256",
                        "name": "SellId",
                        "type": "uint256"
                  },
                  {
                        "internalType": "uint256",
                        "name": "TokenId",
                        "type": "uint256"
                  },
                  {
                        "internalType": "uint256",
                        "name": "Price",
                        "type": "uint256"
                  },
                  {
                        "internalType": "uint256",
                        "name": "endTime",
                        "type": "uint256"
                  },
                  {
                        "internalType": "address",
                        "name": "Owner",
                        "type": "address"
                  },
                  {
                        "internalType": "bool",
                        "name": "sold",
                        "type": "bool"
                  },
                  {
                        "internalType": "bool",
                        "name": "canceled",
                        "type": "bool"
                  }
            ],
            "stateMutability": "view",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                  },
                  {
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                  }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "bool",
                        "name": "state",
                        "type": "bool"
                  }
            ],
            "name": "setBonus",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "address",
                        "name": "adr",
                        "type": "address"
                  }
            ],
            "name": "setERCAddress",
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
            "name": "setEasyFees",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256[]",
                        "name": "day",
                        "type": "uint256[]"
                  }
            ],
            "name": "setFreezePeriodsLimit",
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
            "name": "setPrices",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "bool",
                        "name": "state",
                        "type": "bool"
                  }
            ],
            "name": "setSellAllowance",
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
            "name": "setSellLimits",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256[]",
                        "name": "mins",
                        "type": "uint256[]"
                  }
            ],
            "name": "setSellPeriods",
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
            "name": "setServiceFees",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "uint256[]",
                        "name": "indexes",
                        "type": "uint256[]"
                  }
            ],
            "name": "setTierIndexes",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [
                  {
                        "internalType": "string",
                        "name": "newuri",
                        "type": "string"
                  }
            ],
            "name": "setURI",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "slInd",
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
                        "internalType": "bytes4",
                        "name": "interfaceId",
                        "type": "bytes4"
                  }
            ],
            "name": "supportsInterface",
            "outputs": [
                  {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
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
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "name": "tokenFreezeRay",
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
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "name": "tokenSellRay",
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
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                  }
            ],
            "name": "tokenURI",
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
                        "name": "tokenId",
                        "type": "uint256"
                  }
            ],
            "name": "transferFrom",
            "outputs": [],
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
            "inputs": [
                  {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                  }
            ],
            "name": "unfreeze",
            "outputs": [
                  {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                  }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
      },
      {
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
      }
]



