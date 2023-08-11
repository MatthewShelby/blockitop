/// @title WarriorsNFT - Manages the Warriors NFT collection on the BSC network.

pragma solidity ^0.8.7;


// Import necessary libraries and interfaces
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Defines the contract Blockitop inheriting from ERC721, ERC721URIStorage, and Ownable
contract Blockitop is ERC721, ERC721URIStorage, Ownable {

    /// @notice The base URI for the IPFS folder containing NFT files.
    /// @dev This URI will be combined with the token ID to generate the URL to the asset.
    string public baseURI;


    // Tiers prices Legendary - epic - rare - common   ---  in Jager
    uint256[] private tiersPrices = [1000000000000000000, 500000000000000000, 100000000000000000, 50000000000000000];
    //                               1 BNB                  0.5 BNB             0.1 BNB             0.05 BNB


    /// @notice An array indicating whether each token has been minted or not.
    /// @dev The value at index tokenId represents the minting status of the token with that ID.
    bool[] public isMinted;
 

    /// @notice An array containing service fees for different actions.
    /// @dev The array values are as follows:
    ///   - Index 0: Batch transfer fee (0.001 BNB)
    ///   - Index 1: Easy transfer fee (0.0005 BNB)
    ///   - Index 2: Sell commission fee (0.02 BNB)
    ///   - Index 3: [Reserved for additional] (1 BNB)
    uint256[] private serviceFees = [1000000000000000,500000000000000,200000000000000,1000000000000000];
    

    /// @notice Easy transfer fees for different token tiers.
    /// @dev The array values represent the fees for each token tier as follows:
    ///   - Index 0: Legendary fee (0.01 BNB)
    ///   - Index 1: Epic fee (0.005 BNB)
    ///   - Index 2: Rare fee (0.001 BNB)
    ///   - Index 3: Common fee (0.0005 BNB)
    uint256[] public easyFee =[32000000000000000, 16000000000000000,8000000000000000,4000000000000000];
       
    
    /// @notice Indicates whether a bonus is paid to the user during minting.
    /// @dev If set to 'true', a bonus will be paid to the user when minting a token.
    bool public payBonus = false;


    /// @notice An array indicating the last index of each token tier.
    /// @dev The array values represent the last index for each token tier as follows:
    ///   - Index 0: Last index of Common tier
    ///   - Index 1: Last index of Rare tier
    ///   - Index 2: Last index of Epic tier
    ///   - Index 3: Last index of Legendary tier
    uint256[] private ind = [8,14,18,21];


    /// @notice The maximum supply of tokens that can be minted in this collection.
    /// @dev This variable determines the total number of tokens that can be minted.
    uint256 public maxSupply = 21;


    /// @notice The total supply of tokens that have been minted in this collection.
    /// @dev This variable starts with an initial value of 0 and increases with each minting operation.
    uint256 public totalSupply = 0;


    /// @notice An array defining the minimum and maximum sale prices for each asset.
    /// @dev The array values represent the price limits as follows:
    ///   - Index 0: Minimum sale price
    ///   - Index 1: Maximum sale price
    uint256[] private sellPriceLimits = [1000000000000000,100000000000000000000];

    // Constructor
    constructor() ERC721("Blockitop", "BTN") {
        setURI("https://ipfs.io/ipfs/QmR5N9289NPeTnVRjwRs7oMELGkshn52k31wXnn7aFesfn/");
        isMinted = new bool[](maxSupply+1);


        address dev = msg.sender;
        _safeMint(dev, 2);
        _safeMint(dev, 6);
        _safeMint(dev, 8);
        _safeMint(dev, 10); 
        _safeMint(dev, 13); 
        _safeMint(dev, 17); 
        isMinted[2]=true;
        isMinted[6]=true;
        isMinted[8]=true;
        isMinted[10]=true;
        isMinted[13]=true;
        isMinted[17]=true;
        totalSupply = 6;
    }

    // ===================== ADMINSTRATIVE =====================

        /// @notice Sets the mint price for different tiers of NFTs.
        /// @dev Only the contract owner can call this function.
        /// @param prices An array containing the new prices for each tier.
        ///   The array should have exactly 4 values representing prices for each tier:
        ///   [Legendary, Epic, Rare, Common].
        function setPrices(uint256[] memory prices) public onlyOwner {
            require(prices.length == 4);
            tiersPrices = prices;
        }


        /// @notice Sets the minimum and maximum sell price limits for NFTs.
        /// @dev Only the contract owner can call this function.
        /// @param prices An array containing the new minimum and maximum sell price limits in BNB.
        ///   The array should have exactly 2 values representing limits as follows:
        ///   - Index 0: Minimum sell price limit in BNB
        ///   - Index 1: Maximum sell price limit in BNB
        function setSellLimits(uint256[] memory prices) public onlyOwner {
            require(prices.length == 2);
            sellPriceLimits = prices;
        }


        /// @notice Sets the allowance for listing tokens for sale.
        /// @dev Only the contract owner can call this function.
        /// @param state The new state to allow or disallow token listing for sale.
        function setSellAllowance(bool state) public onlyOwner {
            isSellAllowed = state;
        }


        /// @notice Sets the service fees for different operations.
        /// @dev Only the contract owner can call this function.
        /// @param prices An array containing the new service fees for different operations.
        ///   The array should have exactly 4 values representing fees for each operation:
        ///   [Batch transfer, Easy transfer, Sell commission, Custom operation].
        function setServiceFees(uint256[] memory prices) public onlyOwner {
            require(prices.length == 4);
            serviceFees = prices;
        }


        /// @notice Sets the easy transfer fees for different tiers of NFTs.
        /// @dev Only the contract owner can call this function.
        /// @param prices An array containing the new easy transfer fees in BNB for each tier.
        ///   The array should have exactly 4 values representing fees for each tier:
        ///   [Legendary, Epic, Rare, Common].
        function setEasyFees(uint256[] memory prices) public onlyOwner {
            require(prices.length == 4);
            easyFee = prices;
        }


        /// @notice Sets the last index for each tier of NFTs.
        /// @dev Only the contract owner can call this function.
        /// @param indexes An array containing the new last indexes for each tier.
        ///   The array should have exactly 4 values representing indexes for each tier:
        ///   [Legendary, Epic, Rare, Common].
        function setTierIndexes(uint256[] memory indexes) public onlyOwner {
            require(indexes.length == 4);
            ind = indexes;
        }


        /// @notice Sets the minimum and maximum sell periods for NFTs in minutes.
        /// @dev Only the contract owner can call this function.
        /// @param mins An array containing the new minimum and maximum sell periods in minutes.
        ///   The array should have exactly 2 values representing periods as follows:
        ///   - Index 0: Minimum sell period in minutes
        ///   - Index 1: Maximum sell period in minutes
        function setSellPeriods(uint256[] memory mins) public onlyOwner {
            require(mins.length == 2);
            sellPeriod = mins;
        }


        /// @notice Sets the minimum and maximum freeze periods for NFTs in days.
        /// @dev Only the contract owner can call this function.
        /// @param day An array containing the new minimum and maximum freeze periods in days.
        ///   The array should have exactly 2 values representing periods as follows:
        ///   - Index 0: Minimum freeze period in days
        ///   - Index 1: Maximum freeze period in days
        function setFreezePeriodsLimit(uint256[] memory day) public onlyOwner {
            require(day.length == 2);
            freezePeriodLimits = day;
        }


        /// @notice Withdraws the contract's balance to the contract owner's address.
        /// @dev Only the contract owner can call this function.
        function withdraw() public onlyOwner {
            payable(tx.origin).transfer(address(this).balance);
        }

    
        /// @notice Retrieves the current service fees for different actions.
        /// @return An array containing the service fees in BNB for each action:
        ///   [Batch Transfer Fee, Easy Transfer Fee, Sell Commission Fee, Unknown Fee]
        function getServiceFees()public view returns (uint256[] memory){
            return serviceFees;
        }


        // @notice Retrieves the current mint prices for each tier of NFTs.
        /// @return An array containing the mint prices in BNB for each tier:
        ///   [Legendary Mint Price, Epic Mint Price, Rare Mint Price, Common Mint Price]
        function getMintPrices() public view returns (uint256[] memory){
            return tiersPrices;
        }


        /// @notice Checks whether listing NFTs for sale is currently allowed.
        /// @return A boolean indicating whether listing NFTs for sale is allowed.
        function getSellAllowance() public view returns (bool){
            return isSellAllowed;
        }

        /// @notice Retrieves the current minimum and maximum sell price limits for NFTs.
        /// @return An array containing the minimum and maximum sell price limits in BNB:
        ///   [Minimum Sell Price, Maximum Sell Price]
        function getSellLimits() public view returns (uint256[] memory) {
            return sellPriceLimits;
        }


        /// @notice Retrieves the current easy transfer fees for each tier of NFTs.
        /// @return An array containing the easy transfer fees in BNB for each tier:
        ///   [Legendary Easy Transfer Fee, Epic Easy Transfer Fee, Rare Easy Transfer Fee, Common Easy Transfer Fee]
        function geteasyFee() public view returns (uint256[] memory) {
            return easyFee;
        }


    //


    /// @notice Mints a new NFT and assigns it to the specified address.
    /// @param to The address that will own the minted NFT.
    /// @param id The ID of the NFT to be minted.
    /// @dev The function requires a valid NFT ID, correct payment, and checks if minting is allowed.
    /// @dev The NFT is assigned to the specified address, and relevant state variables are updated.
    /// @dev If the `payBonus` option is enabled, a bonus is transferred to the minting address.
    function mint(address to,uint256 id) public payable {
        require(id>0,"Wrong id to mint.");
        require(id<=ind[3],"Wrong id to mint.");
        uint256 mintFee = tiersPrices[getTokenTier(id)-1];
        require(mintFee >= tiersPrices[3],"Wrong fee.");
        require(msg.value == mintFee,"Insufficient payment");
        _safeMint(to, id);
        isMinted[id] = true;
        totalSupply ++;

        if(payBonus){
            IT = IERC20(ercTokenAddress);
            IT.transfer(to,mintFee*100);
        }
    }


    /// @notice The address of the contract where bonuses will be paid in ERC-20 tokens.
    /// @dev This variable stores the address of the contract that handles bonus payments.
    address public ercTokenAddress;


    /// @notice Sets the address of the ERC token contract for bonus distribution.
    /// @param adr The address of the ERC token contract.
    /// @dev Only the contract owner is allowed to set this address.
    function setERCAddress(address adr) public onlyOwner{
        ercTokenAddress = adr;
    }


    /// @notice Enables or disables the bonus distribution feature.
    /// @param state The state to set for the bonus distribution (true for enabled, false for disabled).
    /// @dev Only the contract owner is allowed to enable or disable the bonus distribution.
    function setBonus(bool state) public onlyOwner{
        payBonus = state;
    }


    // Declaration of the IERC20 variable
    IERC20 IT;


    /// ### Following functions are overrides required by Solidity.


    /// @notice Burns (destroys) a specific NFT.
    /// @param tokenId The ID of the NFT to be burned.
    /// @dev This function is internal and overrides the _burn function from ERC721 and ERC721URIStorage.
    /// @dev It calls the _burn function from the parent contracts to perform the burning action.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }


    /// @notice Returns the Uniform Resource Identifier (URI) for a given NFT.
    /// @param tokenId The ID of the NFT to retrieve the URI for.
    /// @return The URI representing the metadata of the NFT.
    /// @dev This function is public and overrides the tokenURI function from ERC721 and ERC721URIStorage.
    /// @dev It returns the metadata URI associated with the given tokenId.
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return getURI(tokenId);
    }


    /// @notice Retrieves the metadata URI for a given token ID.
    /// @param tokenId The ID of the token to retrieve the metadata URI for.
    /// @return The complete metadata URI for the given token ID.
    /// @dev This function is public and returns the complete metadata URI for the token ID.
    /// @dev It concatenates the baseURI, tokenId, and ".json" to form the complete URI.
    function getURI  (uint256 tokenId) public view returns(string memory){
        require(tokenId > 0);
        require(tokenId <= ind[3]);
            return string(abi.encodePacked(baseURI,
            Strings.toString(tokenId),
            ".json")
            );
    }


    /// @notice Sets the base URI for the metadata of all tokens.
    /// @param newuri The new base URI to be set.
    /// @dev This function is public and can only be called by the contract owner.
    /// @dev It updates the base URI used to construct token metadata URIs.
    function setURI(string memory newuri) public onlyOwner {
        baseURI = newuri;
    } 






    //My CUstom functions

    // SELL LISTING FUNCTIONS ====================
        
        /// @notice Represents a record for a token listed for sale.
        struct SellRec {
            uint256 SellId;         // [Key] To track the record inside the contract
            uint256 TokenId;        // id of the selling token
            uint256 Price;          // price of the selling token
            uint256 endTime;        // End of the sell period
            address Owner;          // The owner at the time of sell
            bool sold;              // It's true if the token has been sold.
            bool canceled;          // It's true if the sell has been canceled.
        }


        /// @notice The index of the token sell record.
        /// @dev This variable represents the current index used for tracking token sell records.
        uint256 public slInd = 40001;
        

        /// @notice Indicates whether listing a token for sale is allowed, determined by the owner.
        /// @dev If set to 'true', token owners are allowed to list their tokens for sale.
        bool private isSellAllowed = true;

        
        /// @notice A mapping from tokenId to sellId, indicating if a token is listed for sale.
        /// @dev If the mapping value is zero, the token is not listed for sale.
        mapping (uint256 => uint256) public tokenSellRay; 


        /// @notice A mapping from sellRayId to a SellRec struct, storing detailed sell record information.
        /// @dev The mapping links a sellRayId to a SellRec struct that holds information about a token's sale.
        mapping ( uint256 => SellRec ) public sellRayToSellRec;


        /// @notice An array defining the minimum and maximum sell periods for assets in minutes.
        /// @dev The array values represent the sell period limits as follows:
        ///   - Index 0: Minimum sell period in minutes
        ///   - Index 1: Maximum sell period in minutes
        uint256[] public sellPeriod = [5, 136800];


        /// @notice Lists a token for sale.
        /// @param id The ID of the token to be listed for sale.
        /// @param price The price at which the token will be listed for sale.
        /// @param minutesCount The duration of the sale period in minutes.
        /// @return The unique sell ID for the listing.
        function  listToSell(uint256 id, uint256 price,uint256 minutesCount) public returns (uint256) {
            
            require(isSellAllowed,"Listing to sell is not allowed now.");
            require(!isForSell[id],"Token is for sell.");
            require(!isFreeze[id],"Token is frozen.");
            require(getApproved(id) == address(0),"Toekn has approval.");
            require(tx.origin == ownerOf(id),"Sender is not the Owner");
            require(minutesCount < sellPeriod[1],"Too long period");
            require(minutesCount > sellPeriod[0],"Too short period");
            require(price-serviceFees[2] >= sellPriceLimits[0],"Price is too low.");
            require(price <= sellPriceLimits[1],"Price is too high.");

            SellRec memory sr = SellRec(
                slInd,
                id,
                price,
                block.timestamp + (minutesCount*60),
                tx.origin,
                false,
                false
            );

            sellRayToSellRec[slInd] = sr;
            tokenSellRay[id] = slInd;
            isForSell[id] = true;
            slInd++;
            return slInd-1;
        }


        /// @notice Lists a token for sale with specified price and duration.
        /// @param id The ID of the token to be listed for sale.
        /// @param price The selling price in BNB for the token.
        /// @param minutesCount The duration of the sale in minutes.
        /// @return The unique ID of the created sell listing.
        /// @dev This function allows the owner of the token to list it for sale.
        /// @dev It checks various conditions before listing the token.
        function getAllSellRecords() public view returns (SellRec[] memory){
            require(slInd > 40001,"No sell record");
            uint256 count = slInd-40001;
            SellRec[] memory allSells = new SellRec[](count);
            //TFI[] memory all = new TFI[](frInd-1001);// =  TFI[frInd-1001];
            for (uint256 i = 40001; i < slInd; ++i) 
            {
                allSells[i-40001] = sellRayToSellRec[i];
            }
            return allSells;
        }
        

        /// @notice Retrieves an array of recent sell records.
        /// @param num The number of recent sell records to retrieve.
        /// @return An array of SellRec structs representing recent sell records.
        function getSellRecords(uint256 num) public view returns (SellRec[] memory){
            require(slInd > 40001,"No sell record");
            require(slInd-num >= 40001,"Number of sell records is fewer than input");

            SellRec[] memory allSells = new SellRec[](num);
            uint256 outNum = 0;
            for (uint256 i = slInd -1; i >= slInd-(num); --i)  
            {
                allSells[outNum] = sellRayToSellRec[i];
                outNum++;
            }
            return allSells;
        }


        /// @notice Retrieves an array of the most recent sell records.
        /// @param num The number of sell records to retrieve.
        /// @return An array of `SellRec` structures representing the recent sell records.
        /// @dev This function returns an array of the most recent sell records within the specified range.
        /// @dev It checks the input conditions and constructs the array to be returned.
        function cancelSell(uint256 id)public {
            require(isForSell[id],"Token is not for sell.");
            require(!isFreeze[id],"Token is frozen.");
            require(tx.origin == ownerOf(id),"Sender is not the Owner");
            SellRec memory sl = sellRayToSellRec[tokenSellRay[id]];
            uint256 slRay = sl.SellId;
            sl.canceled = true;
            sellRayToSellRec[slRay] = sl;
            isForSell[id] = false;
        }


        /// @notice Allows a user to purchase a token listed for sale.
        /// @param sellTicket The ID of the sell record for the token being purchased.
        /// @dev This function facilitates the purchase of a token listed for sale.
        /// @dev It verifies various conditions including token availability, price, and expiration.
        /// @dev If the purchase is successful, ownership is transferred, and the seller is paid.
        function buyToken(uint256 sellTicket) public payable {
            SellRec memory sl = sellRayToSellRec[sellTicket];
            uint256 tokenId = sl.TokenId;
            require(!sl.sold,"ERC721: Token sell offer has been soled before.");
            require(!sl.canceled,"ERC721: Token sell offer has been canceled.");
            require(isForSell[tokenId],"ERC721: Token is not for sell.");
            require(msg.value == sl.Price ,"ERC721: Payed value is not correct");
            require(!isFreeze[tokenId],"ERC721: Token is frozen.");
            require(sl.endTime > block.timestamp,"ERC721: Expired sell offer.");
            _transfer(sl.Owner, tx.origin, tokenId);
            uint256 slRay = sl.SellId;
            sl.sold = true;
            sellRayToSellRec[slRay] = sl;
            isForSell[tokenId] = false;
            payable(sl.Owner).transfer(sl.Price - serviceFees[2]);

        }

        /// @notice Returns the ID of the first token from the given array that is listed for sale.
        /// @param ids An array of token IDs to check for sell status.
        /// @return The ID of the first token that is listed for sale, or 0 if none are listed.
        /// @dev This function is used to find the first token from the given array that is listed for sale.
        /// @dev It iterates through the array and returns the first token ID that is found to be listed for sale.
        function checkSellStatus(uint256[] memory ids) public view returns (uint256){
            for (uint256 i = 0; i < ids.length; ++i) 
            {
                if (isForSell[ids[i]]) {
                    return ids[i];
                }
            }
            return 0;
        }

    //


    // freeze FREEZE FUNCTIONS ========================


        /// @notice Struct to store information about token freezing.
        struct TFI{
            uint256 RayId;          // [Key] To track the record inside the contract
            uint256 TokenId;        // id of the freezing token
            uint256 startTime;      // Start of the freeze period
            uint256 endTime;        // End of the freeze period
            uint256 planId;         // The plan which the token is being stake for.
            uint256 ExternalId;     // An id for the staking agent to recognize the record.
            address owner;          // The owner at the time of freeze
            bool isClaimed;         // True if the owner Claimed the reward.
        }


        
        /// @notice The index of token freeze information, incremented with each new freeze event.
        /// @dev This variable represents the current index used for managing token freeze information.
        uint256 public frInd = 1001;
            

        /// @notice A mapping from tokenId to freezeRayId, facilitating token freezing for staking.
        /// @dev The mapping links a tokenId to a freezeRayId, allowing tokens to be frozen for staking purposes.
        mapping (uint256 => uint256) public tokenFreezeRay;


        /// @notice A mapping from rayId to a TFI struct, storing token freeze information.
        /// @dev The mapping links a rayId to a TFI struct that holds details about token freezing.
        mapping ( uint256 => TFI ) public rayToInfo;


        /// @notice An array defining the minimum and maximum freeze periods for staking in days.
        /// @dev The array values represent the freeze period limits as follows:
        ///   - Index 0: Minimum freeze period in days
        ///   - Index 1: Maximum freeze period in days
        uint256[] public freezePeriodLimits = [5, 360];


        /// @notice Freeze a token for a specified period, during which it earns bonuses.
        /// @param id The ID of the token to be frozen.
        /// @param daysCount The number of days for which the token will be frozen.
        /// @param planId The ID of the staking plan associated with this freeze.
        /// @param externaId An external ID associated with this freeze.
        /// @return The ID of the freeze record created.
        /// @dev This function allows the owner of a token to freeze it for a specified period.
        /// @dev During the freeze period, the token earns bonuses.
        function freeze(uint256 id, uint256 daysCount, uint256 planId, uint256 externaId) public returns (uint256 ){
            require(tx.origin == ownerOf(id), "Sender is not the Owner");
            require(!isFreeze[id], "Token is already frozen");
            require(!isForSell[id], "Token is for sell.");
            require(daysCount < freezePeriodLimits[1], "Too long period");
            require(daysCount > freezePeriodLimits[0],"Too short period");
            TFI memory nt =  TFI(    
                frInd,
                id,
                block.timestamp,
                block.timestamp + (daysCount*86400),
                planId,
                externaId,
                tx.origin,
                false
            );

            rayToInfo[frInd]= nt;
            tokenFreezeRay[id] = frInd;
            isFreeze[id] = true;
            frInd++;
            return  (frInd-1);
        }


        /// @notice Unfreeze a previously frozen token and claim the associated bonuses.
        /// @param id The ID of the token to be unfrozen.
        /// @return The ID of the freeze record that was processed.
        /// @dev This function allows the owner of a previously frozen token to unfreeze it
        /// @dev after the freeze period has ended and claim any associated bonuses.
        function unfreeze(uint256 id) public returns (uint256){
            require(tx.origin == ownerOf(id),"Sender is not the Owner");
            require(isFreeze[id],"Token is not frozen");
            uint256 ray = tokenFreezeRay[id];
            TFI memory ft = rayToInfo[ray];
            require(block.timestamp>ft.endTime,"Still in period");
            require(!ft.isClaimed ,"Already claimed");
            ft.isClaimed = true;
            rayToInfo[ft.RayId]= ft;
            isFreeze[id] = false;
            return  (ray);
        }


        /// @notice Retrieve all freeze records for previously frozen tokens.
        /// @return An array of freeze records containing information about each frozen token.
        /// @dev This function returns an array of freeze records for tokens that have been frozen.
        function getAllFreezeRecords() public view returns ( TFI[] memory){
            TFI[] memory all = new TFI[](frInd-1001);
            for (uint256 i = 1001; i < frInd; ++i) 
            {
            all[i-1001] = rayToInfo[i];
            }
            return (all);
        }


        /// @notice Check the freeze status of multiple tokens.
        /// @param ids An array of token IDs to check for freeze status.
        /// @return The ID of the first frozen token found, or 0 if none are frozen.
        /// @dev This function checks whether each token in the given array is frozen and returns the first frozen token's ID if found.
        function checkFreezeStatus(uint256[] memory ids) public view returns (uint256){
            for (uint256 i = 0; i < ids.length; ++i) 
            {
                if (isFreeze[ids[i]]) {
                    return ids[i];
                }
            }
            return 0;
        }
    //









    /// @notice Requires payment of service fee based on the number of tokens being transferred.
    /// @notice The function ensures that all transfers are valid based on freeze and sell status.
    /// @notice Each ID in the `ids` array should correspond to the NFT owned by the sender.
    /// @param ids Array of token IDs to be transferred.
    /// @param to Array of recipient addresses.
    /// @dev Allows batch transfer of tokens from the sender to multiple addresses.
     function batchTransferFrom(
        address[] memory to,
        uint256[] memory ids
    ) public payable  virtual {
        uint256 fee = serviceFees[0]*ids.length;
        require(msg.value == fee,"ERC721: service fee is not correct");
        require(ids.length == to.length, "ERC721: ids and to length mismatch");

        address operator = _msgSender();

        for (uint256 i = 0; i < ids.length; ++i) {
            require(to[i] != address(0), "ERC721: transfer to the zero address");
            require(!isFreeze[ids[i]],"A token is frozen. Check Sell Status.");
            require(!isForSell[ids[i]],"Token is for sell.");
            transferFrom(operator,to[i],ids[i]);
        }

    }




 
    /// @notice Get the current balance of the contract.
    /// @return The current balance of the contract in wei.
    /// @dev This function retrieves the current balance of the contract's address.
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    } 


    /// @notice Get the tier of a token based on its ID.
    /// @param id The ID of the token to retrieve the tier for.
    /// @return The tier of the token: 4 for Legendary, 3 for Epic, 2 for Rare, 1 for Common.
    /// @dev This function determines the tier of a token based on its ID and the predefined tier indexes.
    function getTokenTier(uint256 id) public view returns (uint256){
        require(id>0);
        if (id<=ind[0]) {
            return 4;
        }
        if (id<=ind[1]) {
            return 3;
        }
        if (id<=ind[2]) {
            return 2;
        }
        if (id<=ind[3]) {
            return 1;
        }
        return 0;
    }



    /// @notice Easily transfer an NFT to another user while paying a service fee.
    /// @param to The address of the recipient.
    /// @param id The ID of the NFT to be transferred.
    /// @dev This function allows the token owner to easily transfer an NFT to another user by paying a service fee.
    ///      The service fee is determined based on the tier of the token. The token cannot be transferred if it is frozen
    ///      or listed for sale.
    function easyTransferFrom(address to, uint256 id) public payable  {
        uint256 fee = easyFee[getTokenTier(id)-1];
        require(msg.value == fee,"ERC721: service fee is not correct");
        require(tx.origin == ownerOf(id),"Sender is not the Owner");
        require(!isFreeze[id],"Token is already freezed");
        require(!isForSell[id],"Token is for sell.");
        
        safeTransferFrom(tx.origin, to, id);
    }


    /// @notice Get the current timestamp from the blockchain.
    /// @return The current timestamp represented as a Unix timestamp.
    /// @dev This function returns the current timestamp of the blockchain, which represents the number of seconds
    ///      that have elapsed since January 1, 1970 (Unix epoch). It provides a way to retrieve the current time within
    ///      the smart contract.
    function getTimeStamp() public view returns (uint256){
        return block.timestamp;
    }


    /// @notice Get the minting status of all tokens.
    /// @return An array of boolean values indicating the minting status of each token.
    /// @dev This function returns an array of boolean values, where each value represents the minting status
    ///      of a corresponding token ID. A `true` value indicates that the token has been minted, while a `false`
    ///      value indicates that the token has not been minted yet.
    function getAllMinted() public view returns (bool[] memory){
        return isMinted;
    }
}


