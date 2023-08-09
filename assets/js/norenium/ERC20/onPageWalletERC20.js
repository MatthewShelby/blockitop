// window.alert('Blockitop Defi is still in development.')
AlertDefi()
function AlertDefi() {
      var cookie = $.cookie("closeAlert");
      if (cookie == undefined) {
            document.getElementById('alert-box').style.display = 'block';
      }

}
document.getElementById('close-alert').addEventListener('click', clAl)
function clAl() {
      // document.getElementById('alert-box').style.display = 'none';
      var expDate = new Date();
      expDate.setTime(expDate.getTime() + (120 * 60 * 1000));
      $.cookie("closeAlert", 'got it.', { path: '/', expires: expDate })

      console.log(' alert added')
      var elem = document.getElementById('alert-box');
      elem.parentNode.removeChild(elem);
      console.log('close alert')

}


//#region  WALLET FUNCTIONS CONTRACT INIT


function StartContract() {
      console.log('Connect wallet clicked')
      return new Promise(() => {
            console.log('Contract start. checking for metamask.')
            checkForMetamask().then(step1 => {
                  if (step1) {
                        tryInitContract().then(step2 => {
                              startPageManager();
                              return Promise.resolve(step2);
                        }).catch(() => { return Promise.resolve(false); });
                  }
            })
      })
}



var provider;
var signer;
var walletAddress;
var ensAddress;
var hasMetamask = false;
async function checkForMetamask() {
      if (window.ethereum === undefined) {
            sendAlert('You need to install MetaMask Extention.')
            console.log('ERROR: You need to install MetaMask Extention.')
            return Promise.resolve(false);
      } else {
            hasMetamask = true;
            provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            await provider.send("eth_requestAccounts", []).then(() => {
                  signer = provider.getSigner();
                  signer.getAddress().then(function (ret2) {
                        walletAddress = ret2
                  })

                  return Promise.resolve(true);

            });
            metamaskOK();
            return Promise.resolve(true);
      }
}




var myContract;
var isContractInit = false;

function tryInitContract() {
      //console.log('tryInitContract');
      /*
      return Promise.resolve(function () {
            myContract = new ethers.Contract(contractAddress, ABI, signer);
            isContractInit = true;
            console.log('tryInitContract done.');
            return true;
      });*/

      try {
            myContract = new ethers.Contract(contractAddressERC20, ABIERC20, signer);
            isContractInit = true;
            //console.log('step 2 - contract init done.');
            return Promise.resolve(true);
      } catch (error) {
            return Promise.resolve(false);
      }

}

//#endregion 






