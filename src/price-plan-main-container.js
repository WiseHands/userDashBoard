import { LitElement, html } from 'lit-element';

class PricePlanMain extends LitElement {

    render(){
        return html`
            <style>
                .border{
                    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);
                }
                .column{
                    flex-direction: column;
                }
                .row{
                    flex-direction: row;
                }
                .container{
                    display: flex;
                }
                .main-container{
                    display: flex;
                    margin: 15px;                   
                }
                .container p, input, button{
                    margin: 5px;
                }
                                     
            </style>
            
            <div class="main-container column">
              <p>Редагування тарифного плану</p>
              <div class="container row">
                <p>Тариф: </p>
                <input .value="${this.pricePlan.name}" @input="${this.handlePricePlanName}">
              </div>
              <div class="container row">
                <p>Відсоток: </p>
                <input .value="${this.pricePlan.commissionFee}" @input="${this.handlePricePlanCommissionFee}">
              </div>
              <div class="container row">
                <button @click="${this.savingPricePlan}">Зберегти</button>
                <button @click="${this.removingPricePlan}">Видалити</button>
              </div>  
            </div>

    `;}

    static get properties() {
        return {
            pricePlan: {
                type: Object,
            },
            isShowPricePlanContainer: {
                type: Boolean
            },
            isShowPricePlanMainContainer: {
                type: Boolean
            }
        };
    }

    constructor() {
        super();
    }

    handlePricePlanName(e){
        this.pricePlan.name = e.target.value;
    }

    handlePricePlanCommissionFee(e){
        this.pricePlan.commissionFee = e.target.value;
    }

    showPricingPlanWidgetForShop(){
        this.dispatchEvent(new CustomEvent('open-pricing-plan-list',
            {
                bubbles: true,
                composed: true,
                detail: this.pricePlan
            })
        );
    }

    savingPricePlan(){
        const _this = this;
        const url = `/api/pricing-plan/update?name=${this.pricePlan.name}&commissionFee=${this.pricePlan.commissionFee}&uuid=${this.pricePlan.uuid}`;
        fetch(url, {
            method: 'POST'
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('savingPricePlan', data);
            _this.showPricingPlanWidgetForShop();
        });
    }

    removingPricePlan(){
        const _this = this;
        const url = `/api/pricing-plan/delete?uuid=${this.pricePlan.uuid}`;
        fetch(url, {
            method: 'DELETE'
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('savingPricePlan', data);
            _this.showPricingPlanWidgetForShop();
        });
    }

}
// Register the new element with the browser.
customElements.define('price-plan-main-container', PricePlanMain);