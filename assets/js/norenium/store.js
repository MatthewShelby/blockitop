
var interval = setInterval(() => {
      if (isContractInit) {
            setTimeout(() => {
                  getStore();

            }, 500);
            clearInterval(interval);
      }
}, 1000);

document.getElementById('fnd').addEventListener('click', function () {
      console.log('fnd click')
      var id = document.getElementById('tid-find').value;
      console.log('id is: ' + id)

      var ddiv = document.getElementById('r' + id)

      if (ddiv) {
            console.log('row found' + ddiv)
            $('html, body').animate({
                  scrollTop: $('#r' + id).offset().top,
                  duration: 3000
            }, {
                  duration: 200,
                  step: function () {
                        //console.log( "width: ", i++ );
                        console.log($(this).width());
                  },
                  complete: function () {
                        console.log("finished");
                  }
            });
      } else {
            console.log('row not found' + ddiv)
      }
})






function ss() {
      console.log('btn found clicked')
      /*
      */
}


function getStore() {
      var TimeStamp = '';
      myContract.getTimeStamp().then((tim) => {
            TimeStamp = tim;


            myContract.getAllSellRecords().then(function (res) {
                  //console.info(res)
                  document.getElementById('loading').style.display = 'none';
                  document.getElementById('no-sell').style.display = 'block';


                  res.forEach(s => {
                        var can = '';
                        //console.info(s)
                        var id = parseInt(s[1]._hex)

                        //console.log(s.sold)
                        //console.log(s.canceled)
                        if (!s.sold && !s.canceled) {


                              var period = parseInt(s[3]._hex) - TimeStamp




                              if (period <= 0) {
                                    timeTeller = expied
                              } else {

                                    timeTeller = `<p> Offer expires in:    ${CalcTimer(period)}  `
                              }
                              document.getElementById('no-sell').style.display = 'none';

                              if (s.Owner == walletAddress) {
                                    can = '&nbsp;&nbsp;&nbsp;&nbsp;     <button class="btn-sec"  onclick="cancelSell(' + id + ')" >Cancel sell </button >'
                              }
                              var pr = (Number(parseInt(s[2]._hex))) / 10 ** 18


                              document.getElementById('records').innerHTML += `
                              
                              <div class="sell-asset store-data row" id = "r${id}" >
                                    <br>                                          <br>
                                                <div class="col-sm-4 col-xs-12">
                                                      <div class="asset-img"> <img class="asset-img-file"
                                                            src="assets/img/Warrior-Collection/assets/${id}.png" alt="nft"></div>
                                                </div>
                                                <div class="col-sm-7 col-xs-12">
                                                      <h2>Warrior #${id} </h2>
                                                      <p><b>Current owner:</b> ${s.Owner}</p>
                                                      <p>Sell ticket id: ${parseInt(s[0]._hex)}</p>
                                                      <p> Price: ${pr}BNB</p>
                                                      ${timeTeller}
                                                      <div class="d-flex"> <button class="btn-main" id="btn-buy- " onclick="Buy(' + parseInt(s[0]._hex) + ',' + pr + ')">Buy it for
                                                            ${pr} BNB
                                                      </button>&nbsp;&nbsp;&nbsp;&nbsp;
                                                            <button class="btn-sec" id="btn-detail-' + id + '" onclick="GoDetail( )">Token
                                                                  details </button> ${can}
                                                      </div>
                                                </div>
                                          </div>`
                              document.getElementById('loading').style.display = 'none';

                        } else {
                              document.getElementById('loading').style.display = 'none';
                              document.getElementById('no-sell').style.display = 'block';
                        }
                  });

                  JSON.stringify(res, null, 3)
            })
      })
}



function cancelSell(id) {
      myContract.cancelSell(id).then(function (res) {
            console.log('After cancel send');
            console.info(res)
      })
}



function CalcTimer(duration) {
      var days, hours, minutes, seconds;
      days = Math.floor(duration / 86400);
      //console.log('days: ' + days)

      let left1 = duration - (days * 86400)
      //console.log('left1: ' + left1)

      hours = Math.floor(left1 / 3600, 10);
      //console.log('hours: ' + hours)

      let left2 = left1 - (hours * 3600)
      console.log('left2: ' + left2)
      minutes = Math.floor(left2 / 60, 10);
      //console.log('minutes: ' + minutes)

      let left3 = left2 - (minutes * 60)
      seconds = Math.floor(left3 % 60, 10);
      //console.log('seconds: ' + seconds)

      // days = days < 10 ? "0" + days : days;
      // hours = hours < 10 ? "0" + hours : hours;
      // minutes = minutes < 10 ? "0" + minutes : minutes;
      // seconds = seconds < 10 ? "0" + seconds : seconds;

      return days + 'days and ' + hours + ':' + minutes + ":" + seconds;

}

// function startTimer(duration, display) {
//       var timer = duration, days, hours, minutes, seconds;
//       setInterval(function () {
//             days = parseInt(timer / 60 * 60 * 24, 10);
//             hours = parseInt(timer / 60 * 60, 10);
//             minutes = parseInt(timer / 60, 10);
//             seconds = parseInt(timer % 60, 10);

//             days = days < 10 ? "0" + days : days;
//             hours = hours < 10 ? "0" + hours : hours;
//             minutes = minutes < 10 ? "0" + minutes : minutes;
//             seconds = seconds < 10 ? "0" + seconds : seconds;

//             display.textContent = days + 'days and ' + hours + ':' minutes + ":" + seconds;

//             if (--timer < 0) {
//                   timer = duration;
//             }
//             console.log('second')
//       }, 1000);
// }

// window.onload = function () {
//       var fiveMinutes = 60 * 5,
//             display = document.querySelector('#time');
//       startTimer(fiveMinutes, display);
// };


function convertUnixToTime(input) {
      //let unix_timestamp = 1549312452
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var date = new Date(input * 1000);

      console.log('date: ' + date + '    oinp: ' + input)

      // Days remained
      var days = date.getDay();

      // Hours part from the timestamp
      var hours = date.getHours();

      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();

      // Seconds part from the timestamp
      var seconds = "0" + date.getSeconds();

      // Will display time in 10:30:23 format
      var formattedTime = days + ' days and ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

      ///console.log(formattedTime);
      return formattedTime;
}

var expied = `<div class="expired">
                                          <div class="d-flex align-items-centers ">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="bi flex-shrink-0 me-2"
                                                      width="18" height="18" role="img" aria-label="Danger:"
                                                      fill="currentColor"
                                                      class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                                                      viewBox="0 0 16 16">
                                                      <path
                                                            d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                                </svg>
                                                <div style="margin-top: -4px;">
                                                      Expired!
                                                </div>
                                          </div>
                                    </div>`