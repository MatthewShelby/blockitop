

if (window.innerWidth > 900) {




      var he = window.innerHeight;
      var h1 = document.getElementById('gli').offsetTop;
      var h2 = document.getElementById('deff').offsetTop;
      var h3 = document.getElementById('recc').offsetTop;
      var hasStarted = [false, false, false, false];
      window.onscroll = function () {
            if (
                  document.documentElement.scrollTop + 100 > h1) {
                  if (!hasStarted[1]) {
                        startSlide(1)
                        hasStarted[1] = true;
                  }
            }
            if (
                  document.documentElement.scrollTop + 150 > h2) {
                  if (!hasStarted[2]) {
                        startSlideL(2)
                        hasStarted[2] = true;
                  }
            }
            if (
                  document.documentElement.scrollTop + 300 > h3) {
                  if (!hasStarted[3]) {
                        startSlide(3)
                        hasStarted[3] = true;
                  }
            }
      }
      function startSlide(n) {
            d = parseInt(document.getElementById('an' + n).style.left)
            var step = 20;
            var animInt = setInterval(() => {
                  d = d - step;
                  document.getElementById('an' + n).style.left = d + 'px';
                  if (d <= 150) {
                        step = 16
                  }
                  if (d <= 70) {
                        step = 8
                  }
                  if (d <= 0) {
                        clearInterval(animInt)
                  }
                  console.log('interval --- d:' + d)

            }, 20);
      }
      function startSlideL(n) {
            d = parseInt(document.getElementById('an' + n).style.right)
            var step = 20;
            var animInt = setInterval(() => {
                  d = d - step;
                  document.getElementById('an' + n).style.right = d + 'px';
                  if (d <= 150) {
                        step = 8
                  }
                  if (d <= 70) {
                        step = 4
                  }
                  if (d <= 0) {
                        clearInterval(animInt)
                  }
                  console.log('interval --- d:' + d)

            }, 20);
      }
}