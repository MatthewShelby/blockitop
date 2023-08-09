// This js file operates on the detail.html page.
// It fetches all the token data and displays it to the user.



var tokenId, tokenOwnerAddress, tier, tierName, tokenSituation, tokenMetadata, tierFetched;
//StartContract();
$("#btn-mint *").attr("disabled", "disabled").off('click');
var interval = setInterval(() => {
      if (isContractInit) {
            setTimeout(() => {
                  fetch();

            }, 500);
            clearInterval(interval);
      }
}, 1000);





function fetch() {
      tokenId = getDetailCookie();
      console.log('cookie: ' + tokenId);//
      document.getElementById('tokenId-name').innerHTML = tokenId;
      document.getElementById('asset-image-source').src = 'assets/img/Warrior-Collection/assets/' + tokenId + '.png';

      loadMetedata();
      myContract.isMinted(tokenId).then(function (result1) {

            if (result1 == false) {
                  tokenSituation = 'notMinted';
                  console.log('tokenSituation: ' + tokenSituation)
                  document.getElementById('owner-address-box').style.display = 'block';
                  document.getElementById('asset-owner-usernameOrAddress').innerHTML = 'The token is not minted yet...';

                  preMint();
            } else {
                  myContract.ownerOf(tokenId).then(function (ow) {
                        console.log('ow: ' + ow);
                        tokenOwnerAddress = ow;
                        document.getElementById('owner-address-box').style.display = 'block';
                        document.getElementById('asset-owner-usernameOrAddress').innerHTML = tokenOwnerAddress;
                        var avatartIndex = Number((parseInt(walletAddress)).toString().substring(0, 1))
                        //document.getElementById('address-index').innerHTML = avatartIndex;
                        document.getElementById('avatar-image').src = 'assets/img/Avatars/Avatar(' + avatartIndex + ').svg';
                        if (walletAddress == tokenOwnerAddress) {
                              document.getElementById('btn-tr').removeAttribute("disabled")
                              document.getElementById('btn-sell').removeAttribute("disabled")
                              document.getElementById('btn-sell').addEventListener('click', function () {
                                    document.getElementById('div-sell').style.display = 'block';//btn-list
                                    document.getElementById('btn-list').removeAttribute("disabled")
                                    document.getElementById('btn-list').addEventListener('click', function () {
                                          var price = document.getElementById('sell-price').value;
                                          var days = document.getElementById('sell-days').value;
                                          ListToSell(tokenId, price, days);
                                    })

                              })
                              document.getElementById('btn-tr').addEventListener('click', function () {
                                    document.getElementById('div-tr').style.display = 'block'
                              })
                              document.getElementById('btn-send').removeAttribute("disabled")
                              //MakeEasyTransfer
                              document.getElementById('btn-send').addEventListener('click', function () {
                                    var des = document.getElementById('send-address').value;
                                    MakeEasyTransfer(des, tokenId);
                              })
                        }
                  })
            }
      });



      myContract.getTokenTier(tokenId).then(function (res) {
            tier = parseInt(res._hex);
            document.getElementById('token-tier').innerHTML = tier;
            setTierName();
            tierFetched = true;
      })
}

function preMint() {

      var fetchInterval = setInterval(() => {

            if (tierFetched) {

                  calcMint();
                  clearInterval(fetchInterval);
            }

      }, 1000);
}

// document.getElementById('token-tier-name').addEventListener('click', unDis);

// function unDis() {
//       document.getElementById('btn-mint').removeAttribute("disabled")

// }

function calcMint() {
      console.log('calcMint Started.')
      myContract.getMintPrices().then(function (res2) {
            // console.info(res2);
            // console.info(parseInt(res2[tier - 1]._hex));
            tierPrice = Number(parseInt(res2[tier - 1]._hex)) / 10 ** 18;
            // console.log('Mint price for the tier (' + tier + ') is: ' + tierPrice)

            //document.getElementById('btn-mint').attr('disabled',false);
            document.getElementById('btn-mint').addEventListener('click', mint);
            document.getElementById('btn-mint').removeAttribute("disabled")
            document.getElementById('mint-price').innerHTML = tierPrice;

      })


}

function mint() {
      console.log('mint clicked')
      const options = { value: ethers.utils.parseEther(tierPrice.toString()) }

      myContract.mint(walletAddress, tokenId, options)
}
function setTierName() {
      switch (tier) {
            case 1:
                  tierName = 'Legendary';
                  break;
            case 2:
                  tierName = 'Epic';
                  break;
            case 3:
                  tierName = 'Rare';
                  break;
            case 4:
                  tierName = 'Common';
                  break;

            default:
                  tierName = 'unknown'
                  break;
      }
      document.getElementById('token-tier-name').innerHTML = tierName;
      document.getElementById('token-tier-name').classList.add(tierName);

}
function getDetailCookie() {
      var cookie = $.cookie("tokenDetail");
      if (cookie == undefined) {
            $.cookie("tokenDetail", 1)
            return 1
      }
      return Number(cookie);
}

function loadMetedata() {
      var path = "/assets/img/Warrior-Collection/metadata/" + tokenId + ".json"
      var metadata;
      $.getJSON(path, function (json) {
            console.log(json); // this will show the info it in firebug console
            metadata = json;
            var ii = 0;
            metadata.attributes.forEach(element => {

                  var newEl = '<div class="col-sm-4"><div class=" asset-attribute-box"> <div class="att-title"> ' + element.trait_type + ': </div> <div class="attr-value"> ' + element.value + ' </div> </div ></div>';

                  document.getElementById('attrs-box').innerHTML += newEl;
                  console.log('element: ' + ii)
                  ii++;
            });
            //assset-descr
            document.getElementById('assset-descr').innerHTML = metadata.description;

      });
}