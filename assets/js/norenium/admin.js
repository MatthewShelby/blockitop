// ADMINISTRATIVE INTERACTION

var interval = setInterval(() => {
      if (isContractInit) {
            setTimeout(() => {
                  getData();

            }, 500);
            clearInterval(interval);
      }
}, 1000);


function getData() {
      console.log('get admin data')
      myContract.getServiceFees().then(function (res) {
            console.info(res);
            document.getElementById('batch-fee').innerHTML = Number(parseInt(res[0]._hex)) / 10 ** 18
            document.getElementById('easy-fee').innerHTML = Number(parseInt(res[1]._hex)) / 10 ** 18
            document.getElementById('sell-com').innerHTML = Number(parseInt(res[2]._hex)) / 10 ** 18
            document.getElementById('forth-fee').innerHTML = Number(parseInt(res[3]._hex)) / 10 ** 18
      })
      myContract.getMintPrices().then(function (res) {
            console.info(res);
            document.getElementById('mint1').innerHTML = Number(parseInt(res[0]._hex)) / 1000
            document.getElementById('mint2').innerHTML = Number(parseInt(res[1]._hex)) / 1000
            document.getElementById('mint3').innerHTML = Number(parseInt(res[2]._hex)) / 1000
            document.getElementById('mint4').innerHTML = Number(parseInt(res[3]._hex)) / 1000
      })
      myContract.getSellLimits().then(function (res) {
            console.info(res);
            document.getElementById('sell-min').innerHTML = Number(parseInt(res[0]._hex)) / 10 ** 18
            document.getElementById('sell-max').innerHTML = Number(parseInt(res[1]._hex)) / 10 ** 18
      })
      myContract.getSellAllowance().then(function (res) {
            console.info(res);
            document.getElementById('sell-al').innerHTML = res
      })



}


// Set Service Fees
document.getElementById('btn-set-service').addEventListener('click', function () {
      var batchFee = Number(document.getElementById('batch-new-fee').value);
      var easyFee = Number(document.getElementById('easy-new-fee').value);
      var sellFee = Number(document.getElementById('sell-new-fee').value);
      var forthFee = Number(document.getElementById('forth-new-fee').value);
      myContract.setServiceFees([
            ethers.utils.parseEther(batchFee.toString()),
            ethers.utils.parseEther(easyFee.toString()),
            ethers.utils.parseEther(sellFee.toString()),
            ethers.utils.parseEther(forthFee.toString()),
      ])
})

// Set Mint Price
document.getElementById('btn-set-mint').addEventListener('click', function () {
      var leg = Number(document.getElementById('mint-new-fee-1').value);
      var epic = Number(document.getElementById('mint-new-fee-2').value);
      var rare = Number(document.getElementById('mint-new-fee-3').value);
      var com = Number(document.getElementById('mint-new-fee-4').value);
      myContract.setPrices([
            ethers.utils.parseEther(leg.toString()),
            ethers.utils.parseEther(epic.toString()),
            ethers.utils.parseEther(rare.toString()),
            ethers.utils.parseEther(com.toString()),
      ])
})

document.getElementById('btn-set-sell-allow').addEventListener('click', function () {
      var allow = document.getElementById('set-new-allow').checked;
      window.alert(allow);
      myContract.setSellAllowance(allow)
})

//setSellAllowance