import { LitElement, html } from 'lit-element';

class PricePlanTile extends LitElement {

    render(){
        return html`
            <style>
                .border{
                    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);
                }
                .create-shop-element{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin: 15px;
                    min-height: 200px;
                    width: 200px;
                }
                .create-shop-element:hover{
                    cursor: pointer;
                }
                    .shop-name{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: white;
                        height: 60%;
                        width: 90%;
                        border-radius: 5px;
                        background-color: #00BCD4;
                        text-decoration: none;
                    }
                        .shop-name p{
                            font-size: 2em;
                        }
                    .create-shop-text-container{
                        display: flex;                            
                        align-items: center;
                        padding-top: 10px;
                        height: 40px;
                    }
                                     
            </style>
              
                <div class="create-shop-element border"
                  @click="${this.showPricingPlanWidgetForShop}">
                  <div class="shop-name">
                    <p>${this.pricePlan.name}</p>
                  </div>
                  <div class="create-shop-text-container">
                    <p>${this.pricePlan.commissionFree} %</p>
                  </div>
                </div>

    `;}

    static get properties() {
        return {
            pricePlan: {
                type: Object,
            },

        };
    }

    constructor() {
        super();
    }

    _buildUrlForShop(item){
        const token = localStorage.getItem('JWT_TOKEN');
        return `${window.location.protocol}//${item.domain}:${window.location.port}/admin?JWT_TOKEN=${token}`;
    }

    showPricingPlanWidgetForShop(){
        this.dispatchEvent(new CustomEvent('open-pricing-plan',
            {
                bubbles: true,
                composed: true,
                detail: this.pricePlan
            })
        );
    }


}
// Register the new element with the browser.
customElements.define('price-plane-tile', PricePlanTile);