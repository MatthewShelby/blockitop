// Calling LGA database 

export default class DB {
      url = 'https://qweq.ir/';
      baseURL;
      constructor(table) {
            this.baseURL = this.url + table + '/';
      }
      getURL() {
            return this.baseURL;
      }
      setURL(url) {
            this.baseURL = url;
      }

      getDataAsync(key) {
            let adr = this.baseURL
            return new Promise(function (myResolve, myReject) {
                  console.log('adr: ' + adr + key)
                  $.get(adr + key, function (data, status) {
                        console.log('then is done in P. status: ' + status)
                        if (data.status == 'error') {
                              console.log('errorMessage:' + data.errorMessage)
                              myReject(data.errorMessage)
                        } else {
                              myResolve(JSON.parse(data.data));
                        }
                  })
            });
      }

      setDataAsync(key, value) {
            var model = {
                  key: key,
                  value: JSON.stringify(value),
                  referrerPageAddress: window.location.href,
                  idToken: 'placeHolder',
                  extraData: 'null',
                  referrerWalletAddress: 'string WalletAddress'
            }
            let adr = this.baseURL
            console.log('adr: ' + adr)

            return new Promise(function (myResolve, myReject) {
                  $.ajax({
                        type: 'post',
                        contentType: 'application/json; charset=utf-8',
                        url: adr,
                        data: JSON.stringify(model),
                        dataType: 'json',
                        error: function (res) {
                              myReject(res.responseJSON.errors[Object.keys(res.responseJSON.errors)[0]][0])
                        },
                        success: function (res) {
                              console.info(res)
                              myResolve(res.status);
                        }
                  })


            })
      }

      putDataAsync(key, value) {
            var model = {
                  key: key,
                  value: JSON.stringify(value),
                  referrerPageAddress: window.location.href,
                  idToken: 'placeHolder',
                  extraData: 'null',
                  referrerWalletAddress: 'string WalletAddress'
            }
            let adr = this.baseURL

            return new Promise(function (myResolve, myReject) {
                  $.ajax({
                        type: 'put',
                        contentType: 'application/json; charset=utf-8',
                        url: adr,
                        data: JSON.stringify(model),
                        dataType: 'json',
                        error: function (res) {
                              myReject(res.responseJSON.errors[Object.keys(res.responseJSON.errors)[0]][0])
                        },
                        success: function (res) {
                              console.info(res)
                              if (res.status == 'error') {
                                    myReject(res.errorMessage)
                              } else if (res.statu == 'success') {
                                    myResolve(res.status);
                              }
                        }
                  })
            });
      }
}




