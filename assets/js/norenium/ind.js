// Here, Individual commmands has been developed.
// The can work after the contract is reaady. 
// MUST be refrenced at the end of page


function MakeEasyTransfer(address, tokenId) {

      var fee;
      myContract.easyFee(getTier(tokenId) - 1).then(function (res) {
            fee = res;
            console.log('transfer fee is: ' + fee);
            fee = fee / 10 ** 18
            console.log('address: ' + address + '    tokenId is: ' + tokenId);
            const options = { value: ethers.utils.parseEther(fee.toString()) }
            console.log('send     nft--- call wal')
            myContract.easyTransferFrom(address, tokenId, options);

      })
}

function ListToSell(tokenId, Price, Days) {
      //console.log('***************')

      var prc = Price * 10 ** 18;
      myContract.getSellLimits().then(function (res) {
            // console.log('**********base      base' + prc)
            // console.log('**-' + Number(parseInt(res[0]._hex)))
            // console.log('**-' + Number(parseInt(res[1]._hex)))

            var min = Number(parseInt(res[0]._hex));
            var max = Number(parseInt(res[1]._hex));
            console.log('min is: ' + (min / 10 ** 18) + '   max is: ' + (max / 10 ** 18))
            //100000000000000000000
            //1000000000000000000
            //1000000000000000

            if (prc < min) {
                  window.alert('Price is too low.')
            }
            if (prc > max) {
                  window.alert('Price is too high.')
            }

            // place some valisation for days
            myContract.listToSell(tokenId, ethers.utils.parseEther(Price.toString()), Days).then(function (ret) {
                  console.info(ret)
                  window.alert('Listing request has been sent.')

            }).catch(function (rett) {
                  console.info(rett)
                  window.alert(rett.data.message)
            })

      })
}

function Buy(ticket, price) {

      const options = { value: ethers.utils.parseEther(price.toString()) }


      window.alert('Buy command.\\n' + 'ticket: ' + ticket + '\\n price: ' + price + '\\n value: ' + options.value)
      myContract.buyToken(ticket, options).then(function (res) {
            console.log('then after buy')
            console.info(res)
      })
}

//console.log('ind is loaded')

function GoDetail(id) {
      $.cookie('tokenDetail', Number(id));
      window.open('/detail.html');
}


function claim(id) {
      myContract.unfreeze(id).then(function (res) {
            window.alert('Token has been unfreezed');
            console.info(res)

      }).catch(function (ret) {
            window.alert(ret.data.message)
      })
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

