// For Staking page
var a = 123, str = `---
   a is: ${a}
---`;
console.log(str);
var interval = setInterval(() => {
      if (isContractInit) {
            setTimeout(() => {
                  pageInit();

            }, 500);
            clearInterval(interval);
      }
}, 1000);

function pageInit() {
      if (window.location.pathname == '/finance.html') {
            setPrticipations()

      } else {
            document.getElementById('btn-st1').removeAttribute("disabled");
            document.getElementById('btn-st1').addEventListener('click', function () {
                  document.getElementById('div-tr').style.display = 'block';
            })

            document.getElementById('btn-st2').addEventListener('click', function () {
                  var tid = document.getElementById('tid').value;
                  var days = Number(document.getElementById('days').innerHTML) // * 30;
                  var planId = Number(document.getElementById('plan-id').innerHTML);
                  console.log('plan id: ' + planId)
                  var externaId = "333";
                  sendFreeze(tid, days, planId, externaId)


            })

            document.getElementById('readmore-btn').addEventListener('click', function () {
                  console.log('r m clock')
                  document.getElementById('readmore-btn').style.display = 'none';
                  document.getElementById('readmore-content').style.display = 'block';
            })

      }
}

function sendFreeze(tid, days, planId, externaId) {



      myContract.ownerOf(tid).then(function (res) {
            if (res == walletAddress) {
                  myContract.freeze(
                        tid,
                        days,
                        planId,
                        externaId,
                  ).then(function (res) {
                        console.log(res.data.message)
                        console.info(res);
                        //window.alert('Staking operation has been done.')
                  }).catch(function (err) {
                        if (err.data.message == 'execution reverted: Token is already freezed') {
                              window.alert('Token is already frozen. \n' +
                                    'Staking Operation FAILED!!')
                        }
                        else {
                              console.log('error part ##2')

                              window.alert(err.data.message +
                                    '\nStaking Operation FAILED!!')
                        }

                  });

            } else {
                  window.alert('You are not owner of the token.')
            }
      }).catch(function (err2) {
            window.alert(err2.data.message +
                  '\nStaking Operation FAILED!!')
      })

}
function setPrticipations() {
      console.log('setPrticipations()')
      myContract.getAllFreezeRecords().then(function (res) {
            console.info(res)
            //list-div
            var box = document.getElementById('list-div')
            res.forEach(s => {


                  var tid = parseInt(s.TokenId._hex)
                  var pid = parseInt(s.planId._hex)
                  var st = new Date(parseInt(s.startTime._hex) * 1000)
                  var et = new Date(parseInt(s.endTime._hex) * 1000)
                  var d2e = getLong(parseInt(s.endTime._hex) + 4000000)

                  console.log('token id: ' + tid + '   start: ' + st + '   end: ' + et + '   d2e: ' + d2e)

                  myContract.ownerOf(tid).then(function (tres) {
                        var tokenOwner = tres;
                        myContract.getTokenTier(tid).then(function (cres) {
                              var tokenTier = parseInt(cres);
                              box.innerHTML += addRow(tid, pid, d2e, tokenOwner, st, et, tokenTier)
                        })
                  })



                  // box.appendChild(addRow(tid, st, et, d2e))

            });
      })
}


function addRow(tid, pid, d2e, address, start, end, tier) {
      var tierName = 'Common';
      switch (tier) {
            case 1:
                  tierName = 'Legendary'
                  break;
            case 2:
                  tierName = 'Epic'
                  break;
            case 3:
                  tierName = 'Rare'
                  break;

            default:
                  tierName = 'Common'

                  break;
      }
      var el = '<div class="row col-12" style="padding-left:2rem; padding-right:2rem;">' +
            '<div class="list-item">' +
            '<div class="item-detail">' +
            '<div class="d-flex justify-content-between">' +
            '<div class="item-title">' +
            '<b> Game Staking</b>' +
            '</div > ' +
            '<div class="coll-item-price"> Plan ID: #' + pid + ' <br> Token ID: #' + tid + '</div>' +
            '</div ><div class="d-flex justify-content-between"><span></span>' +
            '<div class="coll-item-price-note"> ' + d2e + ' days to End</div></div>' +
            '<br><div class="item-des"  ><b class="item-b">Staker: </b>' + address + '</div>' +
            '<div class="item-action d-flexRR justify-content-between">' +
            '<div class="item-action d-flexRRR justify-content-between" style="width: 90%;">' +
            '<div class="item-des"><b class="item-b">Start date:  </b>' + start + '</div>' +
            '<div class="item-des" "><b class="item-b">End date:  </b>' + end + '</div></div>' +
            '<div><b class="item-b">Token tier:  </b><span class="' + tierName + '">' + tierName + '</span></div></div><br>' +
            '<div class="item-action d-flex justify-content-between">' +
            '<span> </span>' +
            '<div class="d-flex justify-content-end">' +
            '<button class="btn-sec  btn-sm">View on block scan</button>&nbsp;&nbsp;' +
            '<button class="btn-main btn-sm" onclick="claim(' + tid + ')">Claim reward</button>' +
            '</div></div></div></div></div>'

      return el;
}









function getLong(input) {

      // check part for later
      if ((input * 1000) < Date.now()) {
            return 0
      }
      var input2 = 1670893108550;
      input2 = input * 1000
      console.log('des date: ' + new Date(input2))

      var date1 = new Date();
      var date2 = new Date((input2) * 1);
      var diff = new Date(date2.getTime() - date1.getTime());

      var years = diff.getUTCFullYear() - 1970; // Gives difference as year
      var months = diff.getUTCMonth(); // Gives month count of difference
      var days = diff.getUTCDate() - 1; // Gives day count of difference

      var outPut;
      if (months > 1) {
            outPut = months + ' months and ' + days;
            return outPut;
      }
      if (months == 1) {
            outPut = months + ' month and ' + days;
            return outPut;
      }


      return days;

}