

addFooter()

function addFooter() {
      var st = `<div class="footer row">
                  <div class="social col-sm-3">
                        <a class="navbar-brand" href="index.html">

                              <img src="assets/img/nav-logo.png" alt="Bllockitop logo"  style="max-width: 110%;">
                        </a>
                        <br>
                        <br>


                        <div class="mail-input">
                              <p class="nav-link nav-white">Get informed of latest news:</p>
                              <div class="row">
                                    <div style="width: 70%;">
                                          <input type="text" id="email-input"
                                                style="background-color: #e4e4e4; width: 100%;">
                                    </div>
                                    <div style=" width: 30%;">
                                          <button class="btn-main btn-sm">Submit</button>
                                    </div>
                              </div>

                        </div>
                        <br>
                        <br>
                        <div class="social-title">
                              Follow us on socail media:
                        </div>

                        <dev class="">

                              <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAAXNSR0IArs4c6QAAAqZJREFUWEftV9Fx2zAMBbRA0w2cCZpMIGKCuhPE3SAbNJmg7QR1J6g9AagJ6g3qTlB3Ab4edLLPkiiK8jm5pGfd5ScGwccH8OGR6YV+/EJx0QXY1MpcGHs2xlT1SkR2qQ1zYobWZ5fSNimK4g6AI6IbIroCcJ0Cp6pLZr4jIs/MqxDCWkS2OeyNAlNV1yRfRBKumHkDoAa6/93+R0Q7AA+RNQZyWZbl9xTAJLAGlOaccGoMgK8icn9SKb33v4hoNnXT3PimFaKlHWRMVe+Z+XPuJifGeeecxNZGgVmjM7OxdeibEzceXQZARMR3A4eAPTDzp9Gs5wnYOOdus4A9dW91QQC4FRG7yYevx5iq3jDzz/OQkZcldkNjwPaimJf1PFFb59x1kjHv/Z9U0zPzOoSwspiiKOYAygFsfwF8MdUnIhNp06w3Q+cA8EFELG/9tRgbKyOARxFpqXlVVT4Grts3qjprbnoUWzd3F9icmX8kTvW2OxtVtbeGmauyLG2mtr6hQ9QMMa/LspwPMZaUCedcrCetTK2xNQTsaKj3zt5d09qoqqoVgPcJxsxNtEbIuRizPY8P3gUW7Zc90FiPee+NrV7ZIj02KkPHs3MSsAagWZ36VgIwK2SWJ/btzN4QkQnnDIDdyuSIA3Do4VOAnUe5IllOLuWTIWoSvz5gqpqSC7PQHxsVt956l8mgTQDrSZsCJi1DHu+3c+5gSod0yZLENt42fv3RlJyI6ndAURT1rQRgPm4XQjBJsb+NjZnGopuN6t3eZl1voqQcrLHXm29D4pliT1UXzPytG2O5QgiL2Mtp7DFi19tGjgGsGYx5p5ySeu9NNvY57IW0jDnX6EgaObXp1ezYAeQA2seYQWhKaYCSD+V6dk5J/pyxF2BT2b4w9t8w9g91pWk2MaF0nAAAAABJRU5ErkJggg==" />

                              <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAAXNSR0IArs4c6QAAAptJREFUWEftl91100AQhWfkAkgHMRVgKtBOBZgOQgWYCkgqIFRAUgFOBSNVAKmApAO7gR3OdSRjKyvtruUHH473JTnWaPbTnZ+dZTrRxSfKRWew3MicFTsZxVR1amaXk8nENVBP3vsHEVmlQAZDCaci8pTiIGSjqgtm/kpEF53nK2a+LcvyBr+r6kVRFJ+992sRud21fQUGY2b+Y2ZfROQuF66u66WZfYi8tySiKRHNiOjZOYf/91YIzDGzwsrMPuXANUp9y/iYZzObE9EmvLtRCoFdN2GA7aqBwxdGV1VV2OBN1PCfQdWEm51zUG+7QmBzZv7ZcV41gL15p6pbpTPAYPpoZq5bFCGwKXIs4HyTuN77+1BhHBBGYubaez8PVWqwKquqgjKXA1++ZOal975uIVV1NwWSRDOzGxG5Dhn3tYsZM/9K8v5i9Lux3cuT2Ptm9lFEgvkbrEoigmLImR8x52Oem5mICArg1QqBXTVAbYfuNskxLHvvmtl7EWnV3ns22MeORhB2tHbO9X70ock/mpmZH8qyRHMNrr7kD/Wy0TC7DmKnSu88pqqAw1mZ08lT4ddmhkGhd9IYHBRxoBMRAHHyHw3QzL6LyGLoK4YUw5SBtnE0oBbEzN7GxqqYYtndPBbLoW6/+2505q/rGgd4Gdsw8fljd4rIqspd4ybPMJEiJ8aEFQk/i4Ww3TuqWAcSxxQK4V2iQq0ZoDDaBLt80pHUt6Gq4qjCHP9qDI5AZkPB31BVbm85zfibNTlsnL/MW4scpYKhVFVsjr4FZcYsqASg7MvMYI6h6xdFcZVw2+nCY0wGzF3q/fGgqmw7P65ZRVHMzAwnwSbxESb89d4jodGIl6kVlxKKrKpMcXgsmzNYrpJnxf4bxf4CFyAqNluCEskAAAAASUVORK5CYII=" />
                              
                              <a href="https://www.youtube.com/@blockitop">
                                    <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAAXNSR0IArs4c6QAAAdFJREFUWEftWO1RwkAQ3XcNiBWIHWgFydKAdiAdgBVACXQgVqBUsEkHdCAl0ACss07ChJAodyGYH9mZ/Mnsx5t3j7cXQB0NdBQX9cB8T6ZnrGfMlwHf/FqNiUjsnItUdUhE9uTxQEQDz0EbIrInjw2AzW63W49Go1VVrxNgIjIA8EFEsefw0PSNqr4y82exQRWwJYCX0CmBdVtVvWfmbV5/BExEhgC+Aps3KstYW9QBGwN4azQhsBhAGkXRQT5lxuYAZoG9m5Zt4zi+rWPMW18AVqr61BSV1cdxfCDqiLE0TRNVjXyGWDOzFgBLIrrzqS3nXhxYPkBEpgDmRHQTAlBVH5l5bbUXYawIwnyQiEyrE19wqsrMnLQCrMDe0Dm39JHGVYAZQBF5zuznrBXWOrDMqM0PvdZaa8BMX865mapOffVl+a2IP03TiaraL/KsY6sCflG7MPozHRWvRiGE1RusiPznSuomsL+WuK0WCTqHhkWq+s7M48olbi+TJLErcKOdF4KxaBUnzl8wRbtaXy3KbFUCy8DZB4ctZDPI1tgzXe33+0X5vl8LrExVtpgNbDnMs6re53k/C7kc+aL+7Uj6vwh8Bdsz1jPmy4Bvfmc19g1OVO4n+37xaQAAAABJRU5ErkJggg==" />
                             </a>
                             
                             
                                    <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAAXNSR0IArs4c6QAAA4xJREFUWEftWLFSFEEQ7V6KS8HMMvEMjYAP4G4mM/P4AuEHlNhAITAWiw/w/ALPyHBmQyPhC8TIwECoMr1p6131UMvuzu7tsVYRMFVUUexs99s33a/fwHRHF99RXHQPrOvJrMSYc24oIo+XScbMV9bas2X2FvcsBcw5Z5j5BRFNiGiza5LCfs/MsxDCJ2vtZVOcRmDOuU1mfk9E+7cAU/fqhYgcWGt9Km4SmIL6UWDoipl9CCEeywUR4adtGd0wZGb8fl0CCm5aF6AJ2FSPj0TkAxEdtdHfhhDPnXNHzHxIRBtEdCkiT+ri1gLTmnIIBFDWWgRaeeV5/nQ+nz9aX1//u7u7+805N2HmzxpwZozZKwdPAYtsXYnI8LZMee+PiegNkmdZdjAajaZ5ns9E5Ll+/INyjlpg3nt0zIaIoHuWKnzUJOrRWlupO+/9VyJ6pqycGmNeOuf2mfmjArPlRkgBE33h2Fp7lDpD6Jl27TYRDYuyoCUww9+89++I6LU+f2mMOS2VSyVPBZgmQzeivtDStV3jnDtk5rctuobjOhgMBoP5fP6QiH6PRqNf8QO890kC6oBBTGPhVyjWzgIo6Ftc5yKyYAfMMTOEGF23IMwYY+tY7xWYMvpdmUJz7FtrI6hFfuzJsmwqIuOmkugVWKmb9sqgIjMq0BDjhaCKSKXzegXmvUfXIdm5MQZFn1xFvRKRSln0BkxZ+LNMx8YjZebYSJXO6xMYCjuZqExd24f0Bkw1KbZ4q/iWtKpSj70Cy/Pca7dhAO/UKX1krtQo2HvDMPYKrDSAARJMVExfceQwcz4ej6P9uT7xXoEhapEJeLIQAgT3XG3MVpZlcCMQWSxo3XZihvau/HC2cJ9bTXKhoA5TY60TY6UCbxviMH2Yl5WF4wshYCrUulzn3DYzY4JAfNuHeAlYq0lUuwOhjTWEAr9ouxmVOrZiFmptT6HzzowxOy3HtdJj59wJM79Sxiodm3Kw1+6hyfqshEiHvB4jzOVPY0zRyy3CpoChuOMAhl5BEpJXrS4A1Z3A7y/mrMa+4U6SwHTOXfsyTTwNIcwgC02iWgcSdSgiW2traxPYpGgumfnLeDyOsnLj1bYLL3z5ScH0dSGnca927SR10Wn9FwG+Vk3f4kbTw6o1l+W4rcDiCyoLoD0WKlxqpWjLCUIIxdqctclIfH9pYD0w1SnEPbBOdKV0rGuQ/7H/HySusUUPnFP5AAAAAElFTkSuQmCC" />
                        </dev>
                  </div>

                  <div class="social col-sm-3">
                        <div class="social-title">
                              Eplore More
                        </div>
                        <a class="nav-link nav-white" href="gallery.html">Gallery</a>
                        <a class="nav-link nav-white" href="marketplace.html">Marketplace</a>
                        <a class="nav-link nav-white" href="staking">Staking.html</a>
                        <a class="nav-link nav-white" href="whitepaper.html">Whitepaper</a>
                        <a class="nav-link nav-white" href="defi.html" title="Go to De-Fi panel">
                              <br>
                              <div>
                                    <img src="assets/img/TheCoin.svg" alt="Delta"
                                          style="max-height: 4rem;margin-right: 1rem;">
                              </div>
                        </a>

                  </div>
                  <div class="social col-sm-5">
                        <div class="info-panel main-description" id="tb">
                              <div class="social-title">
                                    User info:
                              </div>
                              <table>

                                    <tr>
                                          <td>Coin Name</td>
                                          <td id="coin-name"></td>
                                    </tr>
                                    <tr>
                                          <td>Coin Balance</td>
                                          <td id="coin-balance"></td>
                                    </tr>

                                    <tr>
                                          <td>Connected wallet &nbsp;&nbsp;&nbsp;&nbsp;
                                                <br> address
                                          </td>
                                          <td id="wallet-address" style="font-size: 0.75rem; text-overflow: ellipsis;">
                                          </td>
                                    </tr>
                              </table>
                        </div>

                  </div>

                  <div class="col-sm-12 justify-content-center">
                        <br>
                        <div class="CR">
                              ©Blockitop - 2022-2023 - All Rights Reserved.
                        </div>
                  </div>
            </div>`


      var nav = `   <br>
            <nav class="navbar navbar-expand-lg nav-bg sticky-top">
                  <div class="container-fluid">
                        <a class="navbar-brand" href="index.html">
                              <img src="assets/img/nav-logo.png" alt="Blockitop logo">
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                              aria-expanded="false" aria-label="Toggle navigation" style="color:#ffffff;">
                              <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAFFJREFUSEvtlEkKADAIA83/H52eu1APZQShnquTBaqAR/D9+IA04fqIbDuVdXkgaRK9OcABL+pPu/Ud4A7wDnAAHlF/AN4BDujfwXewJoD/pgNrVBgZX2h0sgAAAABJRU5ErkJggg==" />
                        </button>
                        <div class="collapse navbar-collapse d-flex justify-content-between"
                              id="navbarSupportedContent">

                              <div style="width: 15%;"></div>

                              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                    <div class="navbar-nav me-auto mb-2 mb-lg-0">

                                          <a class="nav-link nav-white" href="gallery">Gallery</a>
                                          <a class="nav-link nav-white" href="marketplace.html">Marketplace</a>
                                          <a class="nav-link nav-white" href="staking">Staking</a>
                                          <a class="nav-link nav-white" href="whitepaper">Whitepaper</a>


                                    </div>
                                    <a class="nav-link nav-white" href="defi" title="Go to De-Fi panel">
                                          <div>
                                                <img src="assets/img/TheCoin.svg" alt="Delta"
                                                      style="max-height: 4rem;margin-right: 1rem;">
                                          </div>
                                    </a>
                                    <div class="navbar-nav me-auto mb-2 mb-lg-0">

                                          <div class="btn-sec d-inline-flex" id="cw-btn">
                                                <img
                                                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAMpJREFUSEvtlVERwjAQRHcVIAGQgAMcYAEUIAEk4ACkIAEJrQMcLJMMMG0600tzk34w9DfNvrvsJkdU/lhZH/MCJF0A7ACsHJ01AA4k70Hj28Fb/OgQ7m5tSK5TwBPAAsCG5KMUJElRmIzFdzvoLfwuQNIWwNUKQvERSQopWVpH6AGMeuU2ORVIO/kDIOlzIUd99pgcYnqzklQMsOLpNtkDqP7YnQGcrAoz11uScab0JpqkANlbBhqQNmgMBk5mZZN/m3cmTy4vY8ML7YWYGRQromsAAAAASUVORK5CYII=" />
                                                &nbsp;&nbsp; Connect Wallet
                                          </div>
                                          <div id="mc-btn-frm" style="display: none;">
                                                <div class="btn-sec" id="mc-btn">
                                                      <img class="thumbnail-sm" src="assets/img/MetaMask.svg" />

                                                      <span style="margin-top: 16px;"> Network: <span
                                                                  id="network-name"></span></span>
                                                </div>
                                          </div>
                                    </div>

                              </div>

                        </div>
                  </div>
            </nav>`
      var bd = document.body.innerHTML;
      document.body.innerHTML = nav + bd + st
      //console.log('body added')
}



