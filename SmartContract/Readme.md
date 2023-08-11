# Exploring the Blockitop Smart Contract: Empowering NFT Trading and Ownership in Astra Genesis Metaverse
 




The Blockitop smart contract is a decentralized platform built on the Ethereum blockchain that enables the management and trading of non-fungible tokens (NFTs). These NFTs are part of the Warriors collection, consisting of 21 unique NFTs categorized into four different tiers. The platform serves as a hub for users to explore, purchase, and trade these NFTs, which represent characters within the metaverse-based game called "Astra Genesis".
 

The smart contract is developed using the Solidity programming language and follows the ERC-721 standard, which defines the basic functionality for creating and managing NFTs. The contract inherits from various interfaces such as ERC721 and ERC721URIStorage, which provide essential functions for handling NFT ownership and metadata.


The core features of the smart contract include:


1- Minting: Users can mint new NFTs by paying a specific fee, which varies based on the tier of the NFT. Minted NFTs are associated with specific token IDs and stored within the contract. Minting is only possible for valid token IDs within the defined ranges.


2- Selling: NFT owners can list their tokens for sale using the "listToSell" function. They set a price and a sell period during which the NFT can be purchased. A service fee is charged for listing the NFT for sale. Users can browse and purchase NFTs listed for sale based on their preferences.


3- Freezing and Staking: Users have the option to freeze their NFTs for a specific period of time and stake them for potential rewards. Tokens that are frozen cannot be traded or listed for sale during the freezing period. After the freezing period ends, users can claim their rewards and unfreeze their tokens.


4- Transfer and Batch Transfer: NFT owners can transfer their tokens to other addresses individually or in batches. A service fee is applied for batch transfers based on the number of tokens being transferred. The transfer function ensures that tokens are not frozen or listed for sale.


5- Metadata and URI: The contract supports the retrieval of token metadata through the "tokenURI" function, which constructs the URI for each NFT. The base URI can be set by the contract owner and combined with the token ID to generate the complete URI.


6- Ownership and Administration: The contract owner has special privileges, such as setting prices, service fees, and managing the platform's configuration. Additionally, the owner can withdraw funds from the contract.


7- Bonuses: Users can receive bonuses during minting, and the contract is designed to work with an external ERC-20 token for bonus distribution.


The Blockitop smart contract enhances transparency, security, and accessibility by leveraging the Ethereum blockchain and implementing standardized interfaces. It provides a decentralized ecosystem for the management and trading of NFTs within the Warriors collection, fostering engagement among blockchain and NFT enthusiasts while promoting the growth of the associated metaverse-based game.
