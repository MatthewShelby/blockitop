// The IndexManager.js is all the commands and functions that should be run on
// the index page of the website.
// It should be referenced at the bottom of the index.html and after referencing
// all other .js files.


// Get ETH balance api address
const BalURL = 'https://api.etherscan.io/api?module=account&action=balance&tag=latest&apikey=1NKT5UTNVDSZGCERW5J28E6A2A86J58RSK&address='

// BSC scan api key:
const bscKey = 'E5HBPC633PQYABW64DEH3ZFK6RPHCWUXGT';

document.getElementById('cw-btn').addEventListener('click', StartContract)



//StartContract();
// var n = provider.getBlockNumber().then(function (ret) {
//       console.info(ret)
//       var nn = provider.getNetwork();
//       console.info(nn);
// });

var balance;
function metamaskOK() {
      provider.getNetwork().then(function (res) {
            console.log('network Name: ' + res.name)
            console.info(res)
            if (res.name == 'bnbt' || res.name == 'bnb') {
                  provider.getBalance(walletAddress).then((balance) => {
                        // convert a currency unit from wei to ether
                        const balanceInEth = ethers.utils.formatEther(balance)
                        balance = balanceInEth;
                        //document.getElementById('bnb-bal').innerHTML = numberWithCommas(Math.round(balance * 100) / 100);
                        console.log(`balance: ${balanceInEth} ETH`)
                  })
                  document.getElementById('cw-btn').style.display = 'none';
                  var elem = document.getElementById('cw-btn');
                  elem.parentNode.removeChild(elem);
                  myContract.balanceOf(walletAddress).then(function (bal) {
                        document.getElementById('bal-frm').style.display = 'block';
                        var x = bal / 10 ** 18;
                        document.getElementById('bal1').innerHTML = numberWithCommas(x);
                  })
            }
      })
}



function setETHBalance(address) {
      if (window.jQuery) {

            jQuery.ajax({
                  url: BalURL + address,
                  type: 'GET',
                  dataType: 'json', // added data type
                  success: function (res) {
                        console.info(res)
                        var finBal;
                        if (res.status == '1') {
                              var ball = Number(res.result);
                              if (ball < 10 * 10 ** 16) {
                                    var ball2 = ball / 10 ** 18
                                    finBal = Math.round(ball2 * 100000) / 100000
                                    document.getElementById('eth-bal').innerHTML = numberWithCommas(finBal);
                              } else {
                                    ball = ball / 10 ** 18
                                    finBal = Math.round(ball * 100) / 100
                                    document.getElementById('eth-bal').innerHTML = numberWithCommas(finBal);
                                    document.getElementById('eth-bal').innerHTML = numberWithCommas(finBal);
                              }
                        }
                  },
                  error: () => {
                        document.getElementById('eth-bal').innerHTML = 'N/A'
                  }
            });
      }
}


function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

setTXPool()
function setTXPool() {
      console.log('setPool...')
      const urlBSCv = 'https://api-testnet.bscscan.com/api?module=account&action=txlist&address=0x3f6CF1c100210839EFB1B510B599C5AE4AFfFBD4&startblock=25151911&endblock=99999999&page=1&offset=20&sort=des&apikey=E5HBPC633PQYABW64DEH3ZFK6RPHCWUXGT'
      if (window.jQuery) {

            jQuery.ajax({
                  url: urlBSCv,
                  type: 'GET',
                  dataType: 'json', // added data type
                  success: function (res) {
                        console.info(res)

                  },
                  error: () => {
                        //document.getElementById('eth-bal').innerHTML = 'N/A'
                  }
            });
      } else {
            alert(' ajax is not avaliable')
      }
}

