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
                  .map-key-container, .facebook-key-container {
                    width:48%;

                  }
                  .site-verification-container p, input, .analytic-container p, input,
                  .static-map-key-container p, input, .static-map-key-container p, input,
                  .map-key-container p, input, .facebook-key-container p, input{
                    margin: 5px;
                    width:96%;
                  }
                  .site-verification-container input, .analytic-container input,
                  .static-map-key-container input, .static-map-key-container input,
                  .map-key-container input, .facebook-key-container input{
                    border-style: none;
                    border-width: 1px;
                    border-bottom-style: solid;
                  }

                @media screen and (max-width: 529px){
                  .site-verification-container, .analytic-container,
                  .static-map-key-container, .static-map-key-container,
                  .map-key-container, .facebook-key-container {
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

    saveVerification(event){
      const params = `?googleWebsiteVerificator=${this.googleWebsiteVerificator}`;
      this.saveGoogleSetting(params);
    }

    handleAnalytics(event){
      this.googleAnalyticsCode =  event.target.value;
    }

    saveAnalytics(event){
      console.log("googleAnalyticsCode", this.googleAnalyticsCode);
      const params = `?googleAnalyticsCode=${this.googleAnalyticsCode}`;
      this.saveGoogleSetting(params);
    }

    handleStativMapKey(event){
      this.googleStaticMapsApiKey =  event.target.value;
    }

    saveStativMapKey(event){
      console.log("googleStaticMapsApiKey", this.googleStaticMapsApiKey);
      const params = `?googleStaticMapsApiKey=${this.googleStaticMapsApiKey}`;
      this.saveGoogleSetting(params);
    }

    handleMapKey(event){
      this.googleMapsApiKey =  event.target.value;
    }

    saveMapKey(event){
      console.log("googleMapsApiKey", this.googleMapsApiKey);
      const params = `?googleMapsApiKey=${this.googleMapsApiKey}`;
      this.saveGoogleSetting(params);
    }

    handleFaceBookApiKey(event){
      this.faceBookPixelApiKey =  event.target.value;
    }

    saveFaceBookApiKey(event){
      console.log("faceBookPixelApiKey", this.faceBookPixelApiKey);
      const params = `?faceBookPixelApiKey=${this.faceBookPixelApiKey}`;
      this.saveGoogleSetting(params);
    }

    saveGoogleSetting(params){
        fetch(`/api/dashboard/shop/setting${params}`, {
            method: 'PUT'
        }).then(response => {
            console.log("response response: ", response);
            return response.json();
        }).then(data => {
          console.log("response saveGoogleSetting: ", data);
          this.dispatchEvent(new CustomEvent('update-shop-list',
              {
                  bubbles: true,
                  composed: true,
                  detail: data
              })
          );
        });
    }


}
// Register the new element with the browser.
customElements.define('google-setting', GoogleSetting);
