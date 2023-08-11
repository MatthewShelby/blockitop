pragma solidity ^0.8.7;
contract Blockitop is ERC721, ERC721URIStorage, Ownable {

    string public baseURI;
    // Tiers prices Legendary - epic - rare - common   ---  in Jager
    uint256[] private tiersPrices = [1000000000000000000, 500000000000000000, 100000000000000000, 50000000000000000];
    //                               1 BNB                  0.5 BNB             0.1 BNB             0.05 BNB

    // Indicates the token has been minted or not;
    bool[] public isMinted;
 
    //  Srvice fees: 
    // 0: batch transferr fee(0.001 BNB) 
    // 1: easy transferr fee(0.0005 BNB) 
    // 2: sell commission (0.02BNB)
    // 3:?(1BNB)
    uint256[] private serviceFees = [1000000000000000,500000000000000,200000000000000,1000000000000000];
    
    // Easy transfer fee:
    // [0]: Legendary fee - [1]: Epic fee - [2]: Rare fee - [3]: Common fee
    // [0]: 0.01 BNB - [1]: 0.005 BNB - [2]: 0.001 BNB - [3]: 0.0005 BNB
    uint256[] public easyFee =[32000000000000000, 16000000000000000,8000000000000000,4000000000000000];
    bool public payBonus = false;




    // Token tier index
    //uint256[] private ind = [8,14,18,21];
    uint256[] private ind = [8,14,18,21];
    uint256 public maxSupply = 21;
    uint256 public totalSupply = 0;


    //  Sell price limits  limits: 
    // 0: minimum price (0.001 BNB) 
    // 1: maximum price (100 BNB) 
    uint256[] private sellPriceLimits = [1000000000000000,100000000000000000000];

        // _safeMint(0xA02B2223d1ee0584545ffc804c518693C1d76de0, 1);
        // _safeMint(0xA02B2223d1ee0584545ffc804c518693C1d76de0, 2);
        // _safeMint(0xA02B2223d1ee0584545ffc804c518693C1d76de0, 3);
        // _safeMint(0xA02B2223d1ee0584545ffc804c518693C1d76de0, 4);

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

        function setPrices(uint256[] memory prices) public onlyOwner {
            require(prices.length == 4);
            tiersPrices = prices;

        }

        function setSellLimits(uint256[] memory prices) public onlyOwner {
            require(prices.length == 2);
            sellPriceLimits = prices;
        }

        function setSellAllowance(bool state) public onlyOwner {
            isSellAllowed = state;
        }

        function setServiceFees(uint256[] memory prices) public onlyOwner {
            require(prices.length == 4);
            serviceFees = prices;
        }


        function setEasyFees(uint256[] memory prices) public onlyOwner {
            require(prices.length == 4);
            easyFee = prices;
        }


        function setTierIndexes(uint256[] memory indexes) public onlyOwner {
            require(indexes.length == 4);
            ind = indexes;
        }

        function setSellPeriods(uint256[] memory mins) public onlyOwner {
            require(mins.length == 2);
            sellPeriod = mins;
        }

        function setFreezePeriodsLimit(uint256[] memory day) public onlyOwner {
            require(day.length == 2);
            freezePeriodLimits = day;
        }

        function withdraw() public onlyOwner {
            payable(tx.origin).transfer(address(this).balance);
        }

    
        function getServiceFees()public view returns (uint256[] memory){
            return serviceFees;
        }

        function getMintPrices() public view returns (uint256[] memory){
            return tiersPrices;
        }


        function getSellAllowance() public view returns (bool){
            return isSellAllowed;
        }


        function getSellLimits() public view returns (uint256[] memory) {
            return sellPriceLimits;
        }

        function geteasyFee() public view returns (uint256[] memory) {
            return easyFee;
        }

    //

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

    address public ercTokenAddress;
    function setERCAddress(address adr) public onlyOwner{
        ercTokenAddress = adr;
    }

    function setBonus(bool state) public onlyOwner{
        payBonus = state;

    }


    IERC20 IT;


    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        // =====>>>  ADD some validation to chachk the ID is exist
        return getURI(tokenId);
    }

    function getURI  (uint256 tokenId) public view returns(string memory){
        require(tokenId > 0);
        require(tokenId <= ind[3]);
            return string(abi.encodePacked(baseURI,
            Strings.toString(tokenId),
            ".json")
            );
    }

    
    function setURI(string memory newuri) public onlyOwner {
        baseURI = newuri;
    } 






    //My CUstom functions

    // SELL LISTING FUNCTIONS ====================
        
        // List to sell record info 
        struct SellRec {
            uint256 SellId;         // [Key] To track the record inside the contract
            uint256 TokenId;        // id of the selling token
            uint256 Price;          // price of the selling token
            uint256 endTime;        // End of the sell period
            address Owner;          // The owner at the time of sell
            bool sold;              // It's true if the token has been sold.
            bool canceled;          // It's true if the sell has been canceled.
        }

        // Index of token sell record
        uint256 public slInd = 40001;
        
        // is listing a token to sell allowed? determined by owner.
        bool private isSellAllowed = true;

        
        // Mapping From tokenId to SellId
        // If zero means token is not listed to sell
        mapping (uint256 => uint256) public tokenSellRay; 

        //mapping from sellRayId to SellRec
        mapping ( uint256 => SellRec ) public sellRayToSellRec;

        // Min and Max of sell period in minutes
        uint256[] public sellPeriod = [5, 136800];


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
        
        function getSellRecords(uint256 num) public view returns (SellRec[] memory){
            require(slInd > 40001,"No sell record");
            require(slInd-num >= 40001,"Number of sell records is fewer than input");

            //uint256 count = slInd-40001;
            SellRec[] memory allSells = new SellRec[](num);
            //TFI[] memory all = new TFI[](frInd-1001);// =  TFI[frInd-1001];
            uint256 outNum = 0;
            //for (uint256 i = slInd -1; i >= slInd-count; --i)  
            for (uint256 i = slInd -1; i >= slInd-(num); --i)  
            {
                allSells[outNum] = sellRayToSellRec[i];
                outNum++;
            }
            return allSells;
        }



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

        // Returns the first frozen token id. Returnz 0 if non iz frozen.
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

        // variables 


        //Token Freeze Info 
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


        
        // Index of token freeze info
        uint256 public frInd = 1001;
            

        // Mapping From tokenId to RayId
        mapping (uint256 => uint256) public tokenFreezeRay;

        //mapping from rayId to info
        mapping ( uint256 => TFI ) public rayToInfo;

        // Min and Max of sell period in days
        uint256[] public freezePeriodLimits = [5, 360];





        // freeze
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


        // unfreeze
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

        function getAllFreezeRecords() public view returns ( TFI[] memory){
            TFI[] memory all = new TFI[](frInd-1001);
            for (uint256 i = 1001; i < frInd; ++i) 
            {
            all[i-1001] = rayToInfo[i];
            }
            return (all);
        }


        
        // Returns the first frozen token id. Returnz 0 if non iz frozen.
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









    /**
     * @dev xref:ROOT:erc1155.adoc#batch-operations[Batched] version of {_safeTransferFrom}.
     *
     * Emits a {TransferBatch} event.
     *
     * Requirements:
     *
     * - If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155BatchReceived} and return the
     * acceptance magic value.
     */
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






    // function deposit(uint256 amount) payable public {
    //     require(msg.value == amount);
    //     // nothing else to do!
    // }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    } 

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



    
    function easyTransferFrom(address to, uint256 id) public payable  {
        uint256 fee = easyFee[getTokenTier(id)-1];
        require(msg.value == fee,"ERC721: service fee is not correct");
        require(tx.origin == ownerOf(id),"Sender is not the Owner");
        require(!isFreeze[id],"Token is already freezed");
        require(!isForSell[id],"Token is for sell.");
        
        safeTransferFrom(tx.origin, to, id);
    }


    function getTimeStamp() public view returns (uint256){
        return block.timestamp;
    }

    function getAllMinted() public view returns (bool[] memory){
        return isMinted;
    }
}


