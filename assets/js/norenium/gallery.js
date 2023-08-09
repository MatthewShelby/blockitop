// This js file operates on the detail.html page.
// It fetches all the token data and displays it to the user.



var maxSupply;
//StartContract();
// $("#btn-mint *").attr("disabled", "disabled").off('click');
var interval = setInterval(() => {
      console.log('check')
      if (isContractInit) {
            setTimeout(() => {
                  fetchAll();

            }, 500);
            clearInterval(interval);
      }
}, 1000);





function fetchAll() {



      myContract.maxSupply().then(function (res) {
            maxSupply = parseInt(res);
            writeAll(maxSupply)

      })
}

function writeAll() {
      for (let i = 1; i <= 21; i++) {
            var tr = getTierGallery(i);
            var trn = getTierNameGallery(tr);
            var ell =
                  `<div id="${i}" class="item-big-frame">
                        <div class="asset-frame row">
                              <div class="col-sm-4 col-xs-12 text-center">
                                    <div class="asset-img-2">
                                          <img class="asset-img-file" src="assets/img/Warrior-Collection/assets/${i}.png"
                                                alt="warrior#${i}"  >
                                    </div>
                              </div>
                              <div class="col-sm-8 col-xs-12">
                                    <div class="asset-detail">
                                          <div class="asset-name">Warrior #${i}</div>
                                          <br>
                                          <div class="col-sm-12">
                                                Token tier: ${tr} | <span class="${trn}">${trn}</span>
                                          </div>

                                          <div class="col-sm-12">
                                                IPFS: <a
                                                      href="https://ipfs.io/ipfs/QmQagekYwLq23wawBqD5Fq3Ndj483KsjLVuyvCENLK3UH1/${i}.png">https://ipfs.io/ipfs/QmQagekYwLq23wawBqD5Fq3Ndj483KsjLVuyvCENLK3UH1/${i}.png</a>
                                          </div>


                                          <br> <button class="btn-sec btn-sm" id="btn-sell" onclick="GoDetail(${i})">See
                                                token details </button>
                                    </div>
                              </div>
                        </div>
                  </div>`

            document.getElementById('rrs').innerHTML += ell

      }
}



function getTierGallery(i) {
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


function getTierNameGallery(i) {

      switch (i) {
            case 1:
                  return 'Legendary'
            case 2:
                  return 'Epic'
            case 3:
                  return 'Rare'
            case 4:
                  return 'Common'
      }
}