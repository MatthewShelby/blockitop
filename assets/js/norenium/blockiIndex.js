import DB from "../DB.js"
let db = new DB('info');

// Mint prices  - Legendary - epic - rare - common   ---  in BNB
var prs = new Array()

// Minted tokens Array and last time it updated
var ma = new Array()
var maut;


// Show Critical
var ShowWarning = false;


// Operation start point
preparePrices();


function preparePrices() {
      var cookie = $.cookie("mintPrices");

      if (cookie == undefined) {
            //if (true) {
            var mintPricesFromAPI;
            db.getDataAsync('mintPrices').then(function (Ares) {
                  mintPricesFromAPI = Ares;

                  var now = Number(Date.now())
                  if (now > mintPricesFromAPI[4] + (warningPeriod * 60 * 1000)) {
                        ShowWarning = true;
                  }

                  var expDate = new Date();
                  expDate.setTime(expDate.getTime() + (cookieExpirePeriod * 60 * 1000));
                  $.cookie("mintPrices", JSON.stringify(mintPricesFromAPI), { path: '/', expires: expDate })


                  setTimeout(() => {
                        if (isContractInit && ShowWarning) {
                              myContract.getMintPrices().then(function (res) {
                                    prs[0] = Number(parseInt(res[0]._hex)) / 10 ** 18;
                                    prs[1] = Number(parseInt(res[1]._hex)) / 10 ** 18;
                                    prs[2] = Number(parseInt(res[2]._hex)) / 10 ** 18;
                                    prs[3] = Number(parseInt(res[3]._hex)) / 10 ** 18;
                                    prs[4] = Date.now();

                                    var expDate = new Date();
                                    expDate.setTime(expDate.getTime() + (cookieExpirePeriod * 60 * 1000));
                                    $.cookie("mintPrices", JSON.stringify(prs), { path: '/', expires: expDate })

                                    db.setDataAsync('mintPrices', prs).then(function (res) {
                                          console.log('post res on wallet : ' + res)
                                    })
                                    afterPrice()
                              })
                        } else {
                              prs = mintPricesFromAPI;
                              afterPrice()
                        }
                  }, 1000);

            })

      }
      else {
            prs = JSON.parse(cookie);
            console.log('prs:  ' + prs)

            var now = Number(Date.now())
            if (now > prs[4] - (warningPeriod * 60 * 1000)) {
                  ShowWarning = true;
                  console.log(' its old data in cookie')


                  setTimeout(() => {
                        if (isContractInit && ShowWarning) {
                              myContract.getMintPrices().then(function (res) {
                                    prs[0] = Number(parseInt(res[0]._hex)) / 10 ** 18;
                                    prs[1] = Number(parseInt(res[1]._hex)) / 10 ** 18;
                                    prs[2] = Number(parseInt(res[2]._hex)) / 10 ** 18;
                                    prs[3] = Number(parseInt(res[3]._hex)) / 10 ** 18;
                                    prs[4] = Date.now();
                                    ShowWarning = false;

                                    var expDate = new Date();
                                    expDate.setTime(expDate.getTime() + (cookieExpirePeriod * 60 * 1000));
                                    $.cookie("mintPrices", JSON.stringify(prs), { path: '/', expires: expDate })

                                    db.setDataAsync('mintPrices', prs).then(function (res) {
                                          console.log('post res on wallet : ' + res)
                                    })
                                    afterPrice()
                              })
                        } else {
                              //prs = mintPricesFromAPI;
                              afterPrice()
                        }
                  }, 1000);
            } else {
                  afterPrice()
            }
      }
}


function afterPrice() {

      var cookie = $.cookie('mintedArray');
      console.log('cookie: ' + cookie)
      console.log('prs: ' + prs)

      if (cookie == undefined) {
            console.log('mintedArray cookie is undefined')
            db.getDataAsync('mintedArray').then(function (res) {
                  db.getDataAsync('mintedArrayUT').then(function (Tres) {
                        console.log('mintedArray : ' + res);
                        console.log('mintedArrayUT : ' + Tres);
                        ma = res;
                        maut = Tres;

                        setCookieFor('mintedArray', ma)


                        var now = Date.now()
                        if (now > Tres + (warningPeriod * 60 * 1000)) {
                              ShowWarning = true;
                              setTimeout(() => {
                                    if (isContractInit && ShowWarning) {
                                          myContract.getAllMinted().then(function (Mres) {
                                                ma = Mres
                                                setCookieFor('mintedArray', ma)
                                                db.setDataAsync('mintedArray', ma).then(function (res1) {
                                                      db.setDataAsync('mintedArrayUT', now).then(function (res2) {
                                                            ShowWarning = false;
                                                            setCollItems(1)
                                                      })
                                                })
                                          })
                                    } else {
                                          setCollItems(2);
                                    }
                              }, 1000);
                        }
                        else {
                              setCollItems(3);
                        }
                  })
            })
      }
      else {
            ma = JSON.parse(cookie)
            console.log(ma)
            setCollItems(4);
      }
}


function setCookieFor(name, val) {

      var expDate = new Date();
      expDate.setTime(expDate.getTime() + (cookieExpirePeriod * 60 * 1000));
      $.cookie(name, JSON.stringify(val), { path: '/', expires: expDate })

}




function setCollItems(n) {

      document.getElementById('coll-load').style.display = 'none';
      document.getElementById('coll-load-3').style.display = 'none';
      console.log('setCollItems Called from: ' + n)

      for (let j = 0; j < 21; j++) {
            var arr = [1, 9, 5, 19, 2, 10, 15, 20, 6, 11, 16, 3, 12, 17, 7, 21, 13, 4, 18, 8, 14]
            // var tr1 = [19, 20, 21];
            // var tr2 = [15, 16, 17, 18];
            // var tr3 = [9, 10, 11, 12, 13, 14];
            // var tr4 = [1, 2, 3, 4, 5, 6, 7, 8];



            var i = arr[j];
            var tr = getTier(i);
            var mintPrice = prs[tr - 1]



            var dis = '';
            if (ma[i]) {
                  dis = 'disabled'
                  mintPrice = '--'
            }


            var display = 'none'
            if (ma[i]) {
                  display = 'block'
            }
            //console.log('i: ' + i + '   trprice: ' + mintPrice)
            var collItem =
                  `<div class="swiper-slide carousel-item2  col-lg-25">
                                          <div class="item-img-frm d-flex  justify-content-center">
                                                <img class="item-img"
                                                      src="assets/img/Warrior-Collection/assets/${i}.png"
                                                      alt="loading">
                                          </div>
                                          <div class="item-detail">
                                                <div class="d-flex justify-content-between">
                                                      <div class="item-title">
                                                            #${i}
                                                      </div>
                                                      <div class="coll-item-price"> <span id="item-0-price">
                                                                  ${mintPrice}</span> BNB</div>
                                                </div>
                                                <div class="d-flex justify-content-between">
                                                      <div class="item-title">

                                                      </div>
                                                      <div class="coll-item-price-note"> Latest Price</div>
                                                </div>
                                                <br>
                                                <div class="item-des">
                                                      The BOREN. A competent warrior who is skilled to kill in silence. Also capable of commanding a battalion.
                                                </div>
                                                <br>

                                                <div class="item-action d-flex justify-content-between">
                                                      <div class="item-avatar-frm d-flex justify-content-between">
                                                      <div>
                                                      <div style="display:${display}">
                                                            <a href="https://opensea.io/assets/bsc/0x51d7fdf2a714139c9f402e708482a2e60078b677/${i}" target="_blank"
                                                                  title="Check NFT on the Opensea">
                                                                  <img src="assets/img/OS.svg" alt="user avatar"
                                                                        class="item-avatar">
                                                            </a>
                                                      </div>
                                                      </div>
                                                            <p class="item-username">
                                                            </p>
                                                      </div>
                                                      <div class="d-flex justify-content-end">
                                                            <button onclick="GoDetail(${i})" target="_blank"
                                                                  class="btn-sec  btn-sm">Details</button>
                                                            &nbsp;&nbsp;
                                                            <button class="btn-main btn-sm" ${dis} >Mint</button>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>`


            document.getElementById('car-frame').innerHTML += collItem

            //console.log('COLL ITEM added number: ' + i)

      }
      //tsc
      //document.getElementById('tsc').innerHTML += swiper
      startSwiper()

}
function startSwiper() {
      goFor = true;

      console.log('swiper start')
}


function getTier(i) {
      var trb = [8, 14, 18]
      if (i <= trb[0]) {
            return 4
      }
      if (i <= trb[1]) {
            return 3
      }
      if (i <= trb[2]) {
            return 2
      }
      return 1
}





// var intervalBI = setInterval(() => {
//       console.log('check')
//       if (isContractInit) {
//             setTimeout(() => {
//                   getPriceCookie();

//             }, 500);
//             clearInterval(intervalBI);
//       }
// }, 1000);



function minte(id) {
      var tier;
      myContract.getTokenTier(id).then(function (res) {
            tier = ethers.utils.formatEther(res._hex);
            //myContract.getMintPrice

            const options = { value: ethers.utils.parseEther("1.0") }

            console.log(options);
            myContract.testMint(walletAddress, id, options).then(function (res2) {
                  console.info(res2);

            });
      })
}
var tierPrice;

function getPrice(id) {
      myContract.getTokenTier(id).then(function (res) {
            tier = parseInt(res._hex);
            console.log('token-tier-' + id);
            document.getElementById('token-tier-' + id).innerHTML = tier;
            //myContract.getMintPrice
            var tiername;//token-tier-name
            switch (tier) {
                  case 1:
                        tiername = 'Legendary';
                        break;
                  case 2:
                        tiername = 'Epic';
                        break;
                  case 3:
                        tiername = 'Rare';
                        break;
                  case 4:
                        tiername = 'Common';
                        break;

                  default:
                        tiername = 'unknown'
                        break;
            }
            document.getElementById('token-tier-name-' + id).innerHTML = tiername;

            myContract.getMintPrices().then(function (res2) {
                  // db.setDataAsync('mintPrices', res).then(function (res) {
                  //       console.log('post res: ' + res)
                  // })
                  console.info(parseInt(res2[0]._hex));
                  tierPrice = Number(parseInt(res2[0]._hex) / 1000);

                  document.getElementById('mint-price-' + id).innerHTML = tierPrice;

            })

      })
}



function getTokenOwner(id) {
      myContract.ownerOf(id).then(function (ow) { return ow })
}




