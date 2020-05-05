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

            <div class="container">
              <p>GoogleSetting</p>
              <div class="google-setting-container">
                <div class="site-verification-container border">
                  <p class="text">Site verification by Google</p>
                  <input id="verification" type="text" .value="this.googleWebsiteVerificator" @input="${this.handleVerification}"
                   placeholder="${this.shop.googleWebsiteVerificator}" @blur="${this.saveVerification}">
                </div>
                <div class="analytic-container border">
                  <p>analytic</p>
                  <input id="analytics" type="text" .value="this.googleAnalyticsCode" @input="${this.handleAnalytics}"
                   placeholder="${this.shop.googleAnalyticsCode}"  @blur="${this.saveAnalytics}">
                </div>
                <div class="static-map-key-container border">
                  <p>Static Map API Key</p>
                  <input id="staticMap" type="text" .value="this.googleStaticMapsApiKey" @input="${this.handleStativMapKey}"
                   placeholder="${this.shop.googleStaticMapsApiKey}"  @blur="${this.saveStativMapKey}">
                </div>
                <div class="map-key-container border">
                  <p>Map API Key</p>
                  <input id="map" type="text" .value="this.googleMapsApiKey" @input="${this.handleMapKey}"
                   placeholder="${this.shop.googleMapsApiKey}"  @blur="${this.saveMapKey}">
                </div>
                <div class="facebook-key-container border">
                  <p>Facebook Pixel API Key</p>
                  <input id="faceBookPixelApiKey" type="text" .value="this.faceBookPixelApiKey" @input="${this.handleFaceBookApiKey}"
                   placeholder="${this.shop.faceBookPixelApiKey}"  @blur="${this.saveFaceBookApiKey}">
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
        console.log('google-analytics-page: ', this.shop);
    }

    handleVerification(event){
      this.googleWebsiteVerificator =  event.target.value;
    }

    saveVerification(event){
      console.log("googleWebsiteVerificator", this.googleWebsiteVerificator, this.shop);
      const params = `?googleWebsiteVerificator=${this.googleWebsiteVerificator}`;
      console.log("googleWebsiteVerificator", this.googleWebsiteVerificator, params);
      this.saveGoogleSetting(params);

    }

    handleAnalytics(event){
      this.googleAnalyticsCode =  event.target.value;
    }

    saveAnalytics(event){
      console.log("googleAnalyticsCode", this.googleAnalyticsCode);
    }

    handleStativMapKey(event){
      this.googleStaticMapsApiKey =  event.target.value;
    }

    saveStativMapKey(event){
      console.log("googleStaticMapsApiKey", this.googleStaticMapsApiKey);
    }

    handleMapKey(event){
      this.googleMapsApiKey =  event.target.value;
    }

    saveMapKey(event){
      console.log("googleMapsApiKey", this.googleMapsApiKey);
    }

    handleFaceBookApiKey(event){
      this.faceBookPixelApiKey =  event.target.value;
    }

    saveFaceBookApiKey(event){
      console.log("faceBookPixelApiKey", this.faceBookPixelApiKey);
    }

    saveGoogleSetting(params){
        fetch(`/api/dashboard/shop/setting${params}`, {
            method: 'PUT'
        }).then(response => {
            console.log("response response: ", response);
            return response.json();
        }).then(data => {
            this.shop = data);
        });
    }


}
// Register the new element with the browser.
customElements.define('google-setting', GoogleSetting);
