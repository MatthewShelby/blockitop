



//#region  WALLET FUNCTIONS CONTRACT INIT

var firstTry = true;
function StartContract() {

      return new Promise(() => {
            //console.log('Contract start. checking for metamask.')
            checkForMetamask().then(step1 => {
                  if (step1) {
                        tryInitContract().then(step2 => {
                              startPageManager();
                              return Promise.resolve(step2);
                        }).catch(() => { return Promise.resolve(false); });
                  } else {
                        return Promise.reject(null)
                  }
                  firstTry = false;
            }).catch(err => {
                  console.log(err)
                  if (!firstTry) {
                        if (err.message == "Already processing eth_requestAccounts. Please wait." || err.message == "Request of type 'wallet_requestPermissions' already pending for origin https://blocki.top. Please wait.") {
                              window.alert("Wating for confirmaation on your wallet." +
                                    '\nPlease Open Your wallet and confirm the connection to the blocki.top.')
                        }
                  }
                  firstTry = false;

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
            //sendAlert('You need to install MetaMask Extention.')
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
            myContract = new ethers.Contract(contractAddress, ABI, signer);
            isContractInit = true;
            //console.log('step 2 - contract init done.');
            return Promise.resolve(true);
      } catch (error) {
            return Promise.resolve(false);
      }

}

//#endregion 






