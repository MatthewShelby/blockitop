addHeaderFooter()
function addHeaderFooter() {
      fetch("../../header.txt" /*, options */)
            .then((response) => response.text())
            .then((html) => {
                  $('header')[0].innerHTML = html;
                  $('header')[0].classList.add('sticky-top')
                  document.getElementById('network-name').innerHTML = 'BSC';
                  document.getElementById('network-name').innerHTML = 'BSC';

            })
            .catch((error) => {
                  console.warn(error);
            });
      fetch("../../footer.txt" /*, options */)
            .then((response) => response.text())
            .then((html) => {
                  $('footer')[0].innerHTML = html;
                  //$('header')[0].classList.add('sticky-top')
            })
            .catch((error) => {
                  console.warn(error);
            });
}