import { LitElement, html } from 'lit-element';

class GoogleSetting extends LitElement {

    render(){
        return html`
            <style>

                .container{
                    height: 100%;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .border{
                    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);
                    margin: 5px;
                }
                .google-setting-container{
                  display: flex;
                  flex-direction: row;
                  flex-wrap: wrap;
                }
                  .site-verification-container, .analytic-container,
                  .static-map-key-container, .static-map-key-container,
                  .map-key-container, .facebook-key-container, .save-setting-container{
                    width:48%;
                  }
                  .site-verification-container p, input, .analytic-container p, input,
                  .static-map-key-container p, input, .static-map-key-container p, input,
                  .map-key-container p, input, .facebook-key-container p, input{
                    margin: 5px 5px 5px 10px;
                    width:96%;
                  }
                  .site-verification-container input, .analytic-container input,
                  .static-map-key-container input, .static-map-key-container input,
                  .map-key-container input, .facebook-key-container input{
                    border-style: none;
                    border-width: 1px;
                    border-bottom-style: solid;
                  }

                .save-setting-container{
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }

                .save-setting-container button{
                  margin: 10px 0 15px 0;
                }

                @media screen and (max-width: 529px){
                  .site-verification-container, .analytic-container,
                  .static-map-key-container, .static-map-key-container,
                  .map-key-container, .facebook-key-container, .save-setting-container {
                    width:98%;

                  }
                }

            </style>

            <div class="container border">
            <p>Налаштування</p>
              <div class="google-setting-container">
                <div class="site-verification-container">
                  <p>Підтвердження сайту Google</p>
                  <input id="verification" type="text" .value="${this.shop.googleWebsiteVerificator}" @input="${this.handleVerification}"
                    @blur="${this.saveVerification}">
                </div>
                <div class="analytic-container">
                  <p>Google Аналітика</p>
                  <input id="analytic" type="text" .value="${this.shop.googleAnalyticsCode}" @input="${this.handleAnalytics}"
                    @blur="${this.saveAnalytics}">
                </div>
                <div class="static-map-key-container">
                  <p>Статичний ключ для Google карти</p>
                  <input id="staticMap" type="text" .value="${this.shop.googleStaticMapsApiKey}" @input="${this.handleStativMapKey}"
                   @blur="${this.saveStativMapKey}">
                </div>
                <div class="map-key-container">
                  <p>Ключ для Google карти</p>
                  <input id="map" type="text" .value="${this.shop.googleMapsApiKey}" @input="${this.handleMapKey}"
                   @blur="${this.saveMapKey}">
                </div>
                <div class="facebook-key-container">
                  <p>Facebook Pixel API Key</p>
                  <input id="faceBookPixelApiKey" type="text" .value="${this.shop.faceBookPixelApiKey}" @input="${this.handleFaceBookApiKey}"
                    @blur="${this.saveFaceBookApiKey}">
                </div>
                <div class="save-setting-container">
                  <button @click="${this.saveSettings}">Зберегти</button>
                </div>
              </div>
            </div>
      `;
    }

    static get properties() {
        return {
            shop: {
              type: Object,
            }
        };
    }

    constructor() {
        super();
        console.log('google-setting-page: ', this.shop);
    }

    handleVerification(event){
      this.googleWebsiteVerificator =  event.target.value;
    }

    handleAnalytics(event){
      this.googleAnalyticsCode =  event.target.value;
    }

    handleStativMapKey(event){
      this.googleStaticMapsApiKey =  event.target.value;
    }

    handleMapKey(event){
      this.googleMapsApiKey =  event.target.value;
    }

    handleFaceBookApiKey(event){
      this.faceBookPixelApiKey =  event.target.value;
    }

    saveSettings(){

      const params = `?googleWebsiteVerificator=${this.googleWebsiteVerificator}
                      &googleAnalyticsCode=${this.googleAnalyticsCode}
                      &googleStaticMapsApiKey=${this.googleStaticMapsApiKey}
                      &googleMapsApiKey=${this.googleMapsApiKey}
                      &faceBookPixelApiKey=${this.faceBookPixelApiKey}`;

      this.setSetting(params);
    }

    setSetting(params){
        fetch(`/api/dashboard/shop/setting${params}`, {
            method: 'PUT'
        }).then(response => return response.json())
        .then(data => this.updateShopObject(data));
    }

    updateShopObject(data){
      this.dispatchEvent(new CustomEvent('update-shop-list',
          {
              bubbles: true,
              composed: true,
              detail: data
          })
      );
    }


}
// Register the new element with the browser.
customElements.define('google-setting', GoogleSetting);
